import { Component } from '@angular/core';
@Component({
  selector: 'shared-image-perfil',
  templateUrl: './imagePerfil.component.html',
  styleUrl: './imagePerfil.component.css',
})
export class ImagePerfilComponent {

  imageLoaded(): void {
    console.log('La imagen ha sido cargada.');

  }

}
