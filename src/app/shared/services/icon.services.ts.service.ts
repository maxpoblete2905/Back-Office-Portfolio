import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconServicesTsService {

  constructor() { }

  getIconForTechnology(tech: string): string {
    switch (tech) {
    case 'Spring Boot':
      return 'fab fa-java';
    case 'Microservicios':
    case 'REST API':
    case 'Node.js':
    case 'Nest.js':
      return 'fab fa-node-js';
    case 'React':
    case 'Angular':
    case 'Vue.js':
      return 'fab fa-js';
    case 'MongoDB':
    case 'Firestore':
      return 'fas fa-database';
    case 'Bootstrap':
    case 'Tailwind CSS':
    case 'Material UI':
    case 'Ant Design':
      return 'fab fa-css3-alt';
    case 'Storybook':
    case 'Angular Material':
    case 'PrimeNG':
      return 'fas fa-book-open';
    case 'SQL MySQL':
    case 'SQLServer':
    case 'PostgreSQL':
      return 'fas fa-database';
    case 'Patrones de diseño':
      return 'fas fa-paint-brush';
    case 'Sistema de diseño':
      return 'fas fa-layer-group';
    case 'Docker':
      return 'fab fa-docker';
    case 'Git':
    case 'Github':
    case 'Gitlab':
      return 'fab fa-git-alt';
    case 'Git flow':
    case 'Trunk base':
      return 'fas fa-code-branch';
    case 'Google Cloud Platform (GCP)':
    case 'Azure':
      return 'fab fa-cloud';
    default:
      return 'fas fa-code';
    }
  }

}
