import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  quote = { msg: '', author: '' };

  constructor(
    private noteSrvc: NotesService
  ) { }

  ngOnInit(): void {
    this.noteSrvc.getRandomQuote()
      .then(result => this.quote = result)
      .catch(error => console.error(error));
  }

}
