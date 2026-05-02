import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
  
      if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
        return;
      }
  
      this.isSubmitting = true;
  
      this.authService.register(this.registerForm.getRawValue()).subscribe({
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
