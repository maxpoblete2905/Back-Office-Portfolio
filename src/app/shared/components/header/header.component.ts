import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'shared-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {


  constructor(private authService: AuthService){}

  logout(): void {
    this.authService.signOut().subscribe({
      next: () => console.log('Closed session successful'),
      error: (error: unknown) => console.error('Closed session error', error)
    });
  }

}
