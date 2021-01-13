import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  hasError = false;

  constructor(
    private fb: FormBuilder,
    private authSrvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(): FormGroup {
    return this.fb.group({
      email: this.fb.control('', [ Validators.required, Validators.email ]),
      password: this.fb.control('', [ Validators.required, Validators.minLength(8) ])
    });
  }

  async onSignUpBtn() {
    const username = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;

    const status = await this.authSrvc.signUp(username, password);

    if(status === 200) {
      console.info('[INFO] Successfully signed up.');
      this.authSrvc.authenticateUser(username, password);
      this.router.navigate(['/register/successful']);
    } else {
      this.registerForm.get('password').reset();
      this.hasError = true;
    }
  }

}
