import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Note } from '../models';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  user = '';
  noteForm: FormGroup
  editMode = false;
  
  retrievedNote: Note;

  selectedDate: Date;
  photoArr = [];
  photoPreviewArr = [];

  s3Endpoint = '';

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private authSrvc: AuthService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private noteSrvc: NotesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authSrvc.getUser();

    this.s3Endpoint = this.noteSrvc.getS3Endpoint();

    const id = this.activatedRoute.snapshot.params.id;

    // initialize form
    this.noteForm = this.createNoteForm();
    this.onValueChanges();

    if(id) {
      this.noteSrvc.getSingleNote(id)
        .then(result => {
          this.retrievedNote = result;
          this.selectedDate = this.retrievedNote.date;
          this.noteForm.patchValue({ content: this.retrievedNote.content });
          this.photoPreviewArr.push(this.s3Endpoint + this.retrievedNote.photo);
        })
        .catch(error => console.error(error));
    } else {
      this.editMode = true;
      this.selectedDate = new Date();
    }
  }

  createNoteForm(): FormGroup {
    return this.fb.group({
      date: this.fb.control('', [ Validators.required ]),
      time: this.fb.control('', [ Validators.required ]),
      content: this.fb.control(''),
      photo: this.fb.control('')
    });
  }

  onValueChanges() {
    // date
    this.noteForm.get('date').valueChanges.subscribe(value => {
      this.selectedDate.setDate(value.getDate());
      this.selectedDate.setMonth(value.getMonth());
      this.selectedDate.setFullYear(value.getFullYear());
      
      this.selectedDate = new Date(this.selectedDate);
      console.info('[INFO] New date: ', this.selectedDate);
    });

    // time
    this.noteForm.get('time').valueChanges.subscribe(value => {
      const period = value.split(' ')[1];
      const hour = (period === 'AM') 
          ? ( (value.split(':')[0] === '12') ? 0 : value.split(':')[0] )
          : ( (value.split(':')[0] === '12') ? 12 : parseInt(value.split(':')[0]) + 12 );
      const min = value.split(':')[1].split(' ')[0];

      this.selectedDate.setHours(parseInt(hour));
      this.selectedDate.setMinutes(parseInt(min));
      
      this.selectedDate = new Date(this.selectedDate);
      console.info('[INFO] New time: ', this.selectedDate);
    });

    // photos
    this.noteForm.get('photo').valueChanges.subscribe(value => {
      const img = this.fileInput.nativeElement.files[0];
      
      // photo array
      this.photoArr.push(img);
      console.info('[INFO] Photo selected.');

      // photo preview
      const unsafeImageUrl = URL.createObjectURL(this.fileInput.nativeElement.files[0]);
      const imageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
      this.photoPreviewArr.push(imageUrl);
    });
  }

  onSubmitBtn() {
    const formData = new FormData();
    formData.set('user', this.user);
		formData.set('date', this.selectedDate.toString());
		formData.set('content', this.noteForm.get('content').value);
    
    if(this.photoArr.length > 0)
      formData.set('photo', this.photoArr[0]);

    this.noteSrvc.createNote(formData)
      .then((result) => {
        console.info(`[Info] New note created successfully.`);
        this.router.navigate(['/main']);
      })
      .catch((error) => console.error(error));
  }

  onBackBtn() {
    this.router.navigate(['/main']);
  }
}
