import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from 'src/services/firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Observable que mantém o estado do usuário logado
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {}

  // Método para realizar o login com o Google
  signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        this.userSubject.next(result.user); // Atualiza o estado com o usuário autenticado
      })
      .catch((error) => {
        console.error('Erro ao realizar login com o Google:', error);
        throw error;
      });
  }

  // Método para realizar o logout
  signOut(): Promise<void> {
    return signOut(auth)
      .then(() => {
        this.userSubject.next(null); // Limpa o estado ao realizar logout
      })
      .catch((error) => {
        console.error('Erro ao realizar logout:', error);
        throw error;
      });
  }
}
