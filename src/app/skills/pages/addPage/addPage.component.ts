import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../../../firestore/firebase.service';
import { Project } from '../../../interfaces';

@Component({
  selector: 'add-page',
  templateUrl: './addPage.component.html',
  styleUrl: './addPage.component.css',
})
export class AddPageComponent {

  private firestoreService: FirestoreService<Project>;

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.formulario = this.formBuilder.group({
      title: ['', Validators.required],
      client: ['', Validators.required],
      companyName: ['', Validators.required],
      descriptionProject: ['', Validators.required],
      position: ['', Validators.required],
      imageUrl: ['', Validators.required],
      views: this.formBuilder.array([], Validators.required),
      technoligies: this.formBuilder.array([], Validators.required),
      src: [''],
      description: [''],
      nuevoString: [''],
    });
    this.firestoreService = new FirestoreService<Project>(this.firestore);
    this.firestoreService.setCollection('projects');
  }


  // Función para agregar un objeto a la lista de objetos
  agregarObjeto() {
    const src = this.formulario.value.src;
    const description = this.formulario.value.description;
    if (src && description) {
      const objetoFormArray = this.formulario.get('views') as FormArray;
      objetoFormArray.push(
        this.formBuilder.group({
          src: src,
          description: description,
        })
      );
      this.formulario.patchValue({ src: '', description: '' });
    }
  }

  // Función para eliminar un objeto de la lista de objetos
  eliminarObjeto(index: number) {
    const objetoFormArray = this.formulario.get('views') as FormArray;
    objetoFormArray.removeAt(index);
  }

  // Función para agregar un string a la lista de strings
  agregarString() {
    const nuevoString = this.formulario.value.nuevoString;
    if (nuevoString) {
      const stringsFormArray = this.formulario.get('technoligies') as FormArray;
      stringsFormArray.push(this.formBuilder.control(nuevoString));
      this.formulario.patchValue({ nuevoString: '' });
    }
  }

  // Función para eliminar un string de la lista de strings
  eliminarString(index: number) {
    const stringsFormArray = this.formulario.get('technoligies') as FormArray;
    stringsFormArray.removeAt(index);
  }

  onSave() {
    if (this.formulario.valid) {
      // Si el formulario es válido, puedes enviarlo
      const data: Project = {
        title: this.formulario.value['title'],
        description: this.formulario.value['descriptionProject'],
        imageUrl: this.formulario.value['imageUrl'],
        companyName: this.formulario.value['companyName'],
        position: this.formulario.value['position'],
        client: this.formulario.value['client'],
        technologies: this.formulario.value['technoligies'],
        views: this.formulario.value['views']
      };

      //send data
      console.log(data);
      this.firestoreService.addDocument(data).subscribe({
        next: (projects) => {
          console.log('return service:', projects);
        },
        error: (error) => {
          console.error('Error loading projects:', error);
        }
      });


      // Reiniciar el formulario
      const viewsFormArray = this.formulario.get('views') as FormArray;
      viewsFormArray.clear();

      // Limpiar los elementos internos del array 'technologies'
      const technologiesFormArray = this.formulario.get('technoligies') as FormArray;
      technologiesFormArray.clear();

      // Reiniciar el formulario
      this.formulario.reset();

      // Realizar cualquier otra lógica de envío aquí
    } else {
      // Si el formulario no es válido, puedes mostrar un mensaje de error o realizar alguna otra acción
      console.log('El formulario no es válido. Por favor, completa todos los campos requeridos.');
    }
  }


}
