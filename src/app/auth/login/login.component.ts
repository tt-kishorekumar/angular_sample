import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }


  login(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }


    this.loading = true;

    this.errorMessage = '';


    const email =
      this.loginForm.value.email;

    const password =
      this.loginForm.value.password;


    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );


    const user = users.find(
      (item: any) =>
        item.email === email &&
        item.password === password
    );


    if (!user) {

      this.errorMessage =
        'Incorrect email or password.';

      this.loading = false;

      return;
    }


    localStorage.setItem(
      'currentUser',
      JSON.stringify(user)
    );


    this.router.navigate(['/']);

  }

}