import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login(): void {
    this.authService.signIn(this.username, this.password).subscribe({
      next: (success: boolean) => {
        if (success) {
          console.log('Login successful');

          this.router.navigate(['/backoffice']); // Reemplaza '/dashboard' con la ruta a la que quieras redirigir
          // Aquí puedes redireccionar al usuario o hacer otras acciones post-login
        } else {
          console.log('Login failed');
          // Manejar fallo de login
        }
      },
      error: (error: unknown) => console.error('Login error', error)
    });
  }

}
