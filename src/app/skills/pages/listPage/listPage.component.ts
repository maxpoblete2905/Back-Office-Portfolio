import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../../../firestore/firebase.service';
import { Skill } from '../../../interfaces';


@Component({
  selector: 'app-list-page',
  templateUrl: './listPage.component.html',
  styleUrl: './listPage.component.css',
})
export class ListPageComponent {

  private firestoreService: FirestoreService<Skill>;
  skills: Skill[] = [];

  skilleleccionado: Skill | null = null;

  mostrarDetalle(skill: Skill) {
    this.skilleleccionado = skill;
  }

  cerrarDetalle() {
    this.skilleleccionado = null;
  }

  constructor(private firestore: AngularFirestore) {
    this.firestoreService = new FirestoreService<Skill>(this.firestore);
    this.firestoreService.setCollection('skills');
  }

  ngOnInit(): void {
    this.firestoreService.getDocuments().subscribe({
      next: (skill) => {
        console.log(skill)
        this.skills = skill;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  eliminarProyecto(id: string): void {
    const data = this.firestoreService.deleteDocument(id);
    this.skilleleccionado = null;
    console.log('response service delete', data);

  }


  solicitarEliminar(skillId: string | undefined) {
    const idIngresado = prompt(`Por favor, ingrese el ID del proyecto que desea eliminar: ${skillId} `);

    if (idIngresado === skillId) {
      const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este proyecto definitivamente? Esta acción no se puede deshacer.');

      if (confirmacion) {
        this.eliminarProyecto(skillId);
      }
    } else {
      alert('El ID ingresado no coincide con el ID del proyecto. La eliminación ha sido cancelada.');
    }
  }


}
