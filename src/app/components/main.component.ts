import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Note } from '../models';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  quote = { msg: '', author: '' };
  notes: Note[] = [];
  photos = [];
  user = '';
  s3Endpoint = '';
  noteMode = true;

  constructor(
    private authSrvc: AuthService,
    private noteSrvc: NotesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authSrvc.getUser();

    this.s3Endpoint = this.noteSrvc.getS3Endpoint();

    this.noteSrvc.getRandomQuote()
      .then(result => this.quote = result)
      .catch(error => console.error(error));

    this.noteSrvc.getNoteList(this.user)
      .then(result => this.notes = result)
      .catch(error => console.error(error));
  }

  onNoteItem(id: string) {
    this.router.navigate(['/note/', id]);
  }

  filterList(type, order) {
    if(type === 'notes') {
      this.noteMode = true;
      this.noteSrvc.getNoteList(this.user, order)
        .then(result => this.notes = result)
        .catch(error => console.error(error));
    }

    if(type === 'photo') {
      this.noteMode = false;
      this.noteSrvc.getPhotoList(this.user, order)
        .then(result => this.photos = (result) ? result['photos'] : [])
        .catch(error => console.error(error));
    }
  }
}
