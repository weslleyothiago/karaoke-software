import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatioEmailService {

  constructor(
    public ngFireAuth: AngularFireAuth,
  ) { }

  async registrarUsuario(email:string, senha:string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, senha)
  }

  async logarUsuario(email:string, senha:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email, senha)
  }

  async resetarSenha(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  async deslogarUsuario(){
    return await this.ngFireAuth.signOut()
  }

  async obterPerfil(){
    return await this.ngFireAuth.currentUser
  }
}
