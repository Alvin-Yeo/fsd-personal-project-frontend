import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  noteForm: FormGroup

  editMode = false;
  selectedDate: Date;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    if(!id) {
      this.editMode = true;
      this.selectedDate = new Date();
    }
      
    // initialize form
    this.noteForm = this.createNoteForm();
    this.onValueChanges();
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
    this.noteForm.get('date').valueChanges.subscribe(value => {
      console.log('Date changed, ', value);
      this.selectedDate = value;
    });

    this.noteForm.get('time').valueChanges.subscribe(value => {
      console.log('Time changed, ', value);
    });

    this.noteForm.get('photo').valueChanges.subscribe(value => {
      console.log('File changed, ', value);
    });
  }
}
