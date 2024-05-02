import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T> {
  private collection!: AngularFirestoreCollection<T>;

  constructor(private firestore: AngularFirestore) { }

  setCollection(path: string) {
    this.collection = this.firestore.collection<T>(path);
  }

  getDocuments(): Observable<T[]> {
    if (!this.collection) {
      throw new Error('Collection path not set.');
    }
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as T;
        const id = a.payload.doc.id;
        return { ...data, id };
      })),
      catchError(error => {
        console.error('Error obtaining data from Firestore:', error);
        throw error;
      })
    );
  }

  addDocument(doc: T): Observable<T | undefined> {
    return from(this.collection.add(doc)).pipe(
      switchMap(ref => this.collection.doc(ref.id).valueChanges())
    );
  }

  updateDocument(id: string, doc: T): Observable<void> {
    return from(this.collection.doc(id).update(doc)).pipe(
      catchError(error => {
        console.error('Error updating document in Firestore:', error);
        throw error;
      })
    );
  }

  deleteDocument(id: string): Observable<void> {
    return from(this.collection.doc(id).delete()).pipe(
      catchError(error => {
        console.error('Error deleting document from Firestore:', error);
        throw error;
      })
    );
  }

  getDocumentById(id: string): Observable<T | undefined> {
    return this.collection.doc(id).get().pipe(
      switchMap((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data() as T;
          return of(data);
        } else {
          console.error('Document with provided ID does not exist:', id);
          return of(undefined);
        }
      }),
      catchError(error => {
        console.error('Error getting document by ID:', error);
        throw error;
      })
    );
  }
}
