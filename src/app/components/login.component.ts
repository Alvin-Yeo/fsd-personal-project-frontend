import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';

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
    private router: Router,
    private googleAuthServ: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();

    this.googleAuthServ.authState.subscribe(user => {
      this.authSrvc.socialUser = user;
    });
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

  signInWithGoogle() {
    this.googleAuthServ.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        this.authSrvc.signInWithGoogle();
      });
  }
}
