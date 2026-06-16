import { Component } from '@angular/core';

import {
    FormBuilder,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',

    standalone: true,

    imports: [
        CommonModule,
        ReactiveFormsModule
    ],

    templateUrl:
        './login.component.html',

    styleUrl:
        './login.component.css'
})

export class LoginComponent {
  errorMessage = '';

  loginForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
        Validators.required
      ]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(
        this.loginForm.getRawValue() as {
          email: string;
          password: string;
        }
      )
      .subscribe({
        next: response => {
          this.authService.saveToken(
            response.token
          );

          this.router.navigate([
            '/shows'
          ]);
        },

        error: error => {
          this.errorMessage =
            error.error.message;
        }
      });
  }
}