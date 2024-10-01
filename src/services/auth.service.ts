import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from 'src/services/firebase'; // Ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Observable que mantém o estado do usuário logado
  private usuarioSubject = new BehaviorSubject<User | null>(null);
  public usuario$ = this.usuarioSubject.asObservable();

  constructor() {}

  // Método para verificar se o e-mail está cadastrado
  private async verificarEmailCadastrado(email: string): Promise<boolean> {
    try {
      const metodos = await fetchSignInMethodsForEmail(auth, email);
      return metodos.length > 0; // Retorna true se houver métodos de login para o e-mail
    } catch (error) {
      console.error('Erro ao verificar e-mail:', error);
      return false;
    }
  }

  // Método para realizar o login com o Google
  async fazerLoginComGoogle(): Promise<void> {
    const provedor = new GoogleAuthProvider();
    try {
      const resultado = await signInWithPopup(auth, provedor);
      const usuario = resultado.user;

      // Verifica se o e-mail do usuário está registrado
      const estaCadastrado = await this.verificarEmailCadastrado(usuario.email!);
      if (estaCadastrado) {
        this.usuarioSubject.next(usuario); // Atualiza o estado com o usuário autenticado
      } else {
        // Se o e-mail não estiver registrado, faça logout e lance um erro
        await this.fazerLogout();
        throw new Error('Usuário não cadastrado.'); // Mensagem que pode ser exibida ao usuário
      }
    } catch (error) {
      console.error('Erro ao realizar login com o Google:', error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  }

  // Método para cadastrar um novo usuário com Google  
  async cadastrarUsuarioComGoogle(): Promise<void> {    
    const provedor = new GoogleAuthProvider();    
    try {      
      const resultado = await signInWithPopup(auth, provedor);
            const usuario = resultado.user;      // Cria um novo usuário no Firebase com o e-mail e senha gerados      
            const email = usuario.email!;      const senha = 'senhaGeradaAleatoria'; // Aqui você pode gerar uma senha aleatória ou usar um padrão      
            await createUserWithEmailAndPassword(auth, email, senha);      
            this.usuarioSubject.next(usuario); // Atualiza o estado com o usuário autenticado    
            } catch (error) {      
              console.error('Erro ao cadastrar usuário com o Google:', error);      
              throw error;    
            }  
            }

  // Método para realizar o logout
  fazerLogout(): Promise<void> {
    return signOut(auth)
      .then(() => {
        this.usuarioSubject.next(null); // Limpa o estado ao realizar logout
      })
      .catch((error) => {
        console.error('Erro ao realizar logout:', error);
        throw error;
      });
  }
}
