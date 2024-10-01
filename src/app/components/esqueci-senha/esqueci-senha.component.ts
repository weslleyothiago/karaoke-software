import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthenticationEmailService } from 'src/services/authentication-email.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss'],
})
export class EsqueciSenhaComponent implements OnInit {
  formularioEsqueciSenha!: FormGroup;
  mensagemErro: string = '';  // Para armazenar mensagens de erro
  mensagemSucesso: string = '';  // Para armazenar mensagem de sucesso

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public authService: AuthenticationEmailService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.formularioEsqueciSenha = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.(com|net|org|edu|gov|mil)$')]],
    });
  }

  async resetarSenha(){
    const email = this.formularioEsqueciSenha.get('email')?.value;

    if (!email) {
      this.mensagemErro = 'Por favor, insira um e-mail válido.';
      return;
    }

    try {
      // Espera o envio do e-mail de reset
      await this.authService.resetarSenha(email);
      this.mensagemSucesso = 'Link de redefinição de senha enviado com sucesso.';
      console.log('Link de reset de senha enviado.');

      // Redireciona para a página de login
      this.router.navigate(['/login']);
      this.modalController.dismiss();  // Fecha o modal
    } catch (error) {
      console.error('Erro ao enviar o link de redefinição de senha: ', error);
      this.mensagemErro = 'Ocorreu um erro ao enviar o link de redefinição de senha. Tente novamente.';
    }
  }

  fechaModal() {
    this.modalController.dismiss();
  }
}
