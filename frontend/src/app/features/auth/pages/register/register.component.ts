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
    selector: 'app-register',

    standalone: true,

    imports: [
        CommonModule,
        ReactiveFormsModule
    ],

    templateUrl:
        './register.component.html',

    styleUrl:
        './register.component.css'
})

export class RegisterComponent {
  errorMessage = '';

  registerForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
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
      ],

      age: [
        18,
        Validators.required
      ]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService
      .register(
        this.registerForm.getRawValue() as {
          email: string;
          password: string;
          age: number;
        }
      )
      .subscribe({
        next: () => {
          this.router.navigate([
            '/login'
          ]);
        },

        error: error => {
          this.errorMessage =
            error.error.message;
        }
      });
  }
}