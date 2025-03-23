import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../../../firestore/firebase.service';
import { Skill } from '../../../interfaces';

@Component({
  selector: 'add-page',
  templateUrl: './addPage.component.html',
  styleUrl: './addPage.component.css',
})
export class AddSkillComponent {

  formulario: FormGroup;
  private firestoreService: FirestoreService<Skill>;

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.formulario = this.formBuilder.group({
      id: ['', Validators.required],
      icon: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      technologies: this.formBuilder.array([], Validators.required),
      nuevoTechnology: ['']
    });

    this.firestoreService = new FirestoreService<any>(this.firestore);
    this.firestoreService.setCollection('skills');
  }

  // Agregar nueva tecnología
  agregarTechnology() {
    const nuevoTechnology = this.formulario.value.nuevoTechnology;
    if (nuevoTechnology) {
      const technologiesFormArray = this.formulario.get('technologies') as FormArray;
      technologiesFormArray.push(this.formBuilder.control(nuevoTechnology));
      this.formulario.patchValue({ nuevoTechnology: '' });
    }
  }

  // Eliminar tecnología
  eliminarTechnology(index: number) {
    const technologiesFormArray = this.formulario.get('technologies') as FormArray;
    technologiesFormArray.removeAt(index);
  }

  onSave() {
    if (this.formulario.valid) {
      const data = {
        id: this.formulario.value.id,
        icon: this.formulario.value.icon,
        title: this.formulario.value.title,
        description: this.formulario.value.description,
        technologies: this.formulario.value.technologies
      };

      console.log(data);
      this.firestoreService.addDocument(data).subscribe({
        next: (skill) => console.log('Skill added:', skill),
        error: (error) => console.error('Error adding skill:', error)
      });

      // Limpiar el formulario
      const technologiesFormArray = this.formulario.get('technologies') as FormArray;
      technologiesFormArray.clear();
      this.formulario.reset();
    } else {
      console.log('Formulario inválido. Completa todos los campos.');
    }
  }
}