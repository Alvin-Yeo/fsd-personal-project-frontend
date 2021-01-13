import { Component, OnInit } from '@angular/core';
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
  user = '';
  s3Endpoint = '';

  constructor(
    private authSrvc: AuthService,
    private noteSrvc: NotesService
  ) { }

  ngOnInit(): void {
    this.user = this.authSrvc.getUser();
    console.info(`[INFO] User: `, this.user);

    this.noteSrvc.getS3Endpoint()
      .then(result => this.s3Endpoint = result)
      .catch(error => console.error(error));

    this.noteSrvc.getRandomQuote()
      .then(result => this.quote = result)
      .catch(error => console.error(error));

    this.noteSrvc.getNoteList(this.user)
      .then(result => this.notes = result)
      .catch(error => console.error(error));
  }

  onNoteItem(id: string) {
    console.log('ID: ', id);
  }
}
