import {  Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  public images: string[] = ['assets/perfil.jpeg', 'assets/perfil.jpeg', 'assets/perfil.jpeg'];

  public sections = [
    { route: 'projects', name: 'Proyectos', icon: 'fas fa-code' },
    { route: 'skills', name: 'Habilidades', icon: 'fas fa-pencil-alt' },
    { route: 'experience', name: 'Experiencia', icon: 'fas fa-briefcase' },
    { route: 'education', name: 'Educación', icon: 'fas fa-graduation-cap' },
    { route: 'contact', name: 'Contactos', icon: 'fas fa-envelope' },
  ];

}
