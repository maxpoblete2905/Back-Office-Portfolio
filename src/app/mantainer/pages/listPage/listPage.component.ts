import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../../../firestore/firebase.service';
import { Project } from '../../../interfaces';


@Component({
  selector: 'app-list-page',
  templateUrl: './listPage.component.html',
  styleUrl: './listPage.component.css',
})
export class ListPageComponent {

  private firestoreService: FirestoreService<Project>;
  projects: Project[] = [];

  projectSeleccionado: Project | null = null;

  mostrarDetalle(project: Project) {
    this.projectSeleccionado = project;
  }

  cerrarDetalle() {
    this.projectSeleccionado = null;
  }

  constructor(private firestore: AngularFirestore) {
    this.firestoreService = new FirestoreService<Project>(this.firestore);
    this.firestoreService.setCollection('projects');
  }

  ngOnInit(): void {
    this.firestoreService.getDocuments().subscribe({
      next: (projects) => {
        console.log(projects)
        this.projects = projects;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  eliminarProyecto(id: string): void {
    const data = this.firestoreService.deleteDocument(id);
    this.projectSeleccionado = null;
    console.log('response service delete', data);

  }


  solicitarEliminar(projectId: string | undefined) {
    const idIngresado = prompt(`Por favor, ingrese el ID del proyecto que desea eliminar: ${projectId} `);

    if (idIngresado === projectId) {
      const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este proyecto definitivamente? Esta acción no se puede deshacer.');

      if (confirmacion) {
        this.eliminarProyecto(projectId);
      }
    } else {
      alert('El ID ingresado no coincide con el ID del proyecto. La eliminación ha sido cancelada.');
    }
  }

  saveData() {
    console.log('Guardando datos...');
  }

}
