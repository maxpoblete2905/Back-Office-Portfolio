import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'auth-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

  constructor(private authService: AuthService){}

  logout(): void {
    this.authService.signOut().subscribe({
      next: () => console.log('Closed session successful'),
      error: (error: unknown) => console.error('Closed session error', error)
    });
  }
}
