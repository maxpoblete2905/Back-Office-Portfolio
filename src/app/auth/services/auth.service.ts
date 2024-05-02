import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export interface UserData {
  email: string | null;
  displayName: string | null;
  uid: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDataSubject: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);

  constructor(private afAuth: AngularFireAuth) {}

  signIn(email: string, password: string): Observable<boolean> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password))
      .pipe(
        map(userCredential => {
          const user = userCredential.user;
          if (user) {
            const userData: UserData = {
              email: user.email,
              displayName: user.displayName,
              uid: user.uid
            };
            this.userDataSubject.next(userData); // Actualizamos el BehaviorSubject con los nuevos datos del usuario
            return true; // Retorna true si el inicio de sesión es exitoso
          }
          return false; // En teoría no debería llegar aquí, pero es para cubrir todos los casos
        }),
        catchError(error => {
          console.error('Error in signIn:', error);
          this.userDataSubject.next(null); // Emitimos null en caso de error
          return [false]; // Retorna false si hubo un error en el inicio de sesión
        })
      );
  }

  signOut(): Observable<boolean> {
    // Convertimos la promesa a un Observable utilizando `from`.
    return from(this.afAuth.signOut()).pipe(
      tap(() => {
        // Limpia cualquier dato del usuario al cerrar sesión.
        this.userDataSubject.next(null);
      }),
      map(() => true), // Retorna `true` al completar exitosamente el cierre de sesión.
      catchError(error => {
        console.error('Error in signOut:', error);
        throw error;
      })
    );
  }

  getUserData(): BehaviorSubject<UserData | null> {
    return this.userDataSubject;
  }
}
