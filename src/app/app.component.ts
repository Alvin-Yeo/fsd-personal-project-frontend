import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  event$: Subscription;

  hasLoggedIn = false;
  imgPath = 'assets/img/user-placeholder.png';
  
  constructor(
    private authSvrc: AuthService,
    private noteSvrc: NotesService
  ) {}

  ngOnInit(): void {
    console.info(`[INFO] App initialized.`);

    // get s3 endpoint from server
    this.noteSvrc.getS3EndpointOverServer();

    // subsribe to incoming message
    this.event$ = this.authSvrc.event.subscribe((token) => {
      if(token)
        this.hasLoggedIn = true;
      else
        this.hasLoggedIn = false;
    });
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
    console.info(`[INFO] App destroyed.`);
  }

}
