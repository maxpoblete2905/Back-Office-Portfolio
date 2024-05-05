import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

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
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private token: string | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private storage: StorageService
  ) {
    // Verificar si hay un token en el localStorage al inicializar el servicio
    const storedToken = this.storage.getItem('token')
    if (storedToken) {
      // Si hay un token almacenado, establecer isLoggedIn como true
      this.isLoggedInSubject.next(true);
      this.token = storedToken;
      // Inicializar la información del usuario
      this.initUserData();
    } else {
      // Si no hay un token almacenado, isLoggedIn es false
      this.isLoggedInSubject.next(false);
    }

    // Verificar el estado de la autenticación en tiempo real
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Si hay un usuario autenticado, establecer isLoggedIn como true
        this.isLoggedInSubject.next(true);
        // Obtener el token del usuario autenticado
        user.getIdToken().then(token => {
          this.token = token;
          // Guardar el token en el localStorage
          this.storage.setItem('token', this.token)
          // Inicializar la información del usuario
          this.initUserData();
        }).catch(error => {
          console.error('Error al obtener el token:', error);
        });
      } else {
        // Si no hay un usuario autenticado, isLoggedIn es false
        this.isLoggedInSubject.next(false);
      }
    });
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

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
            this.userDataSubject.next(userData);
            this.router.navigate(['/mantainer']); // Redireccionar al usuario al área protegida
            return true;
          }
          return false;
        }),
        catchError(error => {
          console.error('Error in signIn:', error);
          return throwError(error);
        })
      );
  }

  signOut(): Observable<boolean> {
    return from(this.afAuth.signOut()).pipe(
      tap(() => {
        this.userDataSubject.next(null);
        this.isLoggedInSubject.next(false);
        // Limpiar el token del localStorage al cerrar sesión
        this.storage.removeItem('token')
        this.router.navigate(['/auth']); // Redireccionar al usuario al área de autenticación
      }),
      map(() => true),
      catchError(error => {
        console.error('Error in signOut:', error);
        throw error;
      })
    );
  }

  getUserData(): BehaviorSubject<UserData | null> {
    return this.userDataSubject;
  }

  getAuthToken(): string | null {
    // Retornar el token guardado en la propiedad del servicio
    // No usar localStorage directamente para evitar problemas de sincronización
    return this.token;
  }

  handleLoginError(error: any): void {
    console.error('Login error', error);
  }

  private initUserData(): void {
    // Implementar lógica para inicializar la información del usuario aquí
    // Por ejemplo, puedes cargar los datos del usuario desde Firebase o cualquier otra fuente de datos
  }
}
