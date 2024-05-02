import { Component } from '@angular/core';

@Component({
  selector: 'shared-error404page',
  template: `
  <div class="error-404-container">
    <h1>Error 404</h1>
    <p>Oops! La página que estás buscando no pudo ser encontrada.</p>
    <p>Pero no te preocupes, aquí hay algunas cosas que puedes hacer:</p>
    <ul>
      <li>Revisa la URL e inténtalo de nuevo.</li>
      <li>Regresa a la página anterior.</li>
      <li>Visita nuestra <a href="/">página de inicio</a> para explorar más.</li>
    </ul>
  </div>`,
  styleUrl: './error404page.component.css',
})
export class Error404pageComponent { }
