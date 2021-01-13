import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hasError = false;

  constructor(
    private fb: FormBuilder,
    private authSrvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      email: this.fb.control('', [ Validators.required , Validators.email ]),
      password: this.fb.control('', [ Validators.required ])
    });
  }

  async onLoginBtn() {
    const username = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    const status = await this.authSrvc.authenticateUser(username, password);

    if(status === 200) {
      console.info('[INFO] Successfully authenticated.');
      this.router.navigate(['/main']);
    } else {
      this.loginForm.get('password').reset();
      this.hasError = true;
    }
  }
}
