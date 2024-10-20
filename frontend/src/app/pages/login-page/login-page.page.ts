import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { EsqueciSenhaComponent } from 'src/app/components/esqueci-senha/esqueci-senha.component';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { AuthenticationEmailService } from 'src/app/services/authentication-email.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  formularioLogar!: FormGroup;
  mensagemErro: string = '';  // Variável para armazenar a mensagem de erro
  
  constructor(
    public router: Router,
    public authServiceGoogle: AuthService,
    public authService: AuthenticationEmailService,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.formularioLogar = this.formBuilder.group({
      email: [
        '', 
        [
          Validators.required, 
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.(com|net|org|edu|gov|mil)$')
        ]
      ],
      senha: [
        '',
        [
          Validators.required,
          Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d).{8,}$")
        ]
      ],
    });
  }

  get controlErros() {
    return this.formularioLogar?.controls;
  }

  async logarSe() {
    const loading = await this.loadingCtrl.create({
      message: 'Logando...',
      spinner: 'crescent',
    });
    await loading.present();
  
    this.formularioLogar.markAllAsTouched();
    if (this.formularioLogar?.valid) {
      const email = this.formularioLogar.get('email')?.value;
      const senha = this.formularioLogar.get('senha')?.value;
      
      try {
        // Chamando o serviço de autenticação para logar o usuário
        const usuario = await this.authService.logarUsuario(email, senha);
        console.log('Usuário logado com sucesso: ', usuario);
  
        // Redireciona para a página inicial após o login bem-sucedido
        this.router.navigate(['/home']);
        this.modalController.dismiss();  // Fecha o modal de registro (se aplicável)
  
      } catch (error) {
        console.error('Erro ao logar usuário: ', error);
        
        // Exibir mensagem de erro
        this.mensagemErro = 'E-mail de usuário ou senha incorretos.';
  
      } finally {
        await loading.dismiss(); // Sempre fecha o loading, independente de sucesso ou erro
      }
  
    } else {
      // Se o formulário for inválido, fecha o loading e exibe uma mensagem de erro
      await loading.dismiss();
    }
  }

  // Função para abrir o modal de registro
  async abreModalRegistrar() {
    const modal = await this.modalController.create({
      component: RegisterModalComponent,
      cssClass: 'backdrop-blur-3xl',
    });
    return await modal.present();
  }

  // Função para abrir o modal de esqueci a senha
  async abreModalEsqueciSenha() {
    const modal = await this.modalController.create({
      component: EsqueciSenhaComponent,
      cssClass: 'backdrop-blur-3xl',
    });
    return await modal.present();
  }

  // Método para logar com Google
  async logarComGoogle() {
    try {
      await this.authServiceGoogle.fazerLoginComGoogle();
      this.router.navigate(['/home']);
    } catch (error) {
      this.mensagemErro = 'Erro ao tentar logar com o';
    }
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:3333/auth/google';
  }
  
}

