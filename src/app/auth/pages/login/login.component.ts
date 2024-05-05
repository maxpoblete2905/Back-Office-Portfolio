import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formLogin: FormGroup;
  public errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    if (this.formLogin.valid) {
      const username = this.formLogin.value.username;
      const password = this.formLogin.value.password;

      this.authService.signIn(username, password).subscribe({
        next: (success: boolean) => {
          if (success) {
            console.log('Login successful');
            // Redirigir al usuario al área protegida
            this.router.navigate(['/mantainer']);
          } else {
            console.log('Login failed');
            this.errorMessage = 'Usuario o contraseña incorrectos';
          }
        },
        error: (error: any) => {
          this.authService.handleLoginError(error); // Manejar el error de inicio de sesión utilizando el método del servicio
          this.errorMessage =
            'Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
        },
      });
    }
  }

  isValidfield(field: string): boolean | null {
    return (
      this.formLogin.controls[field].errors &&
      this.formLogin.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.formLogin.controls[field]) return null;

    const errors = this.formLogin.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      // console.log(key);

      switch (key) {
        case 'required':
          return 'This field is required.';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} characters.`;
        case 'min':
          return 'the minimum value is 0.';
        case 'email':
          return 'this field must be an email.';
      }
    }
    return null;
  }
}
