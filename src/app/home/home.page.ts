import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user$: Observable<User | null>; // Observable para monitorar o estado do usuário

  constructor(private authService: AuthService) {
    // Se inscreve ao observable user$ para obter o estado atual do usuário
    this.user$ = this.authService.user$;
  }

  // Método para realizar o login
  handleGoogleSignIn() {
    this.authService.signInWithGoogle()
      .then(() => console.log('Login bem-sucedido'))
      .catch(error => console.error('Erro no login:', error));
  }

  // Método para realizar o logout
  handleSignOut() {
    this.authService.signOut()
      .then(() => console.log('Logout bem-sucedido'))
      .catch(error => console.error('Erro no logout:', error));
  }
}
