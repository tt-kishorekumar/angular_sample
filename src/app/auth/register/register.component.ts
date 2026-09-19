import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  errorMessage = '';

  loading = false;


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.registerForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

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
      ],

      confirmPassword: [
        '',
        Validators.required
      ]

    });

  }


  register(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }


    const {
      name,
      email,
      password,
      confirmPassword
    } = this.registerForm.value;


    if (password !== confirmPassword) {

      this.errorMessage =
        'Passwords do not match.';

      return;
    }


    this.loading = true;


    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );


    const existingUser =
      users.find(
        (user: any) =>
          user.email === email
      );


    if (existingUser) {

      this.errorMessage =
        'An account with this email already exists.';

      this.loading = false;

      return;
    }


    const newUser = {

      id: Date.now(),

      name,

      email,

      password

    };


    users.push(newUser);


    localStorage.setItem(
      'users',
      JSON.stringify(users)
    );


    localStorage.setItem(
      'currentUser',
      JSON.stringify(newUser)
    );


    this.router.navigate(['/']);

  }

}