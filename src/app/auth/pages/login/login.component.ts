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
      password: ['', Validators.required]
    });
  }

  login(): void {
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
          this.errorMessage = 'Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
        }
      });
    }
  }

}
