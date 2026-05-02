import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = response.message;
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.error.message;
      }
    });
  }
}
