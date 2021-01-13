import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-successful',
  templateUrl: './register-successful.component.html',
  styleUrls: ['./register-successful.component.css']
})
export class RegisterSuccessfulComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/main']);
    }, 5000);
  }

}
