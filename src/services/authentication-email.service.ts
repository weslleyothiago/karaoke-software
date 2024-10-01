// src/services/authentication-email.service.ts
import { Injectable } from '@angular/core';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationEmailService {
  constructor() {}

  async registrarUsuario(email: string, senha: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(auth, email, senha);
  }

  async logarUsuario(email: string, senha: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(auth, email, senha);
  }

  async resetarSenha(email: string): Promise<void> {
    return await sendPasswordResetEmail(auth, email);
  }

  async deslogarUsuario(): Promise<void> {
    return await signOut(auth);
  }

  async obterPerfil(): Promise<User | null> {
    return auth.currentUser; // Retorna o usuário atual
  }
}
