import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthenticationEmailService } from 'src/app/services/authentication-email.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss'],
})
export class EsqueciSenhaComponent implements OnInit {
  templateAtivo: string = 'telaEsqueciSenha';
  formularioEsqueciSenha!: FormGroup;
  mensagemErro: string = '';  // Para armazenar mensagens de erro
  mensagemSucesso: string = '';  // Para armazenar mensagem de sucesso

  @ViewChild ('telaEsqueciSenha') telaEsqueciSenha !: TemplateRef<any>;
  @ViewChild ('telaSucessoEsqueciSenha') telaSucessoEsqueciSenha !: TemplateRef<any>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
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

  ativarTemplate(template: string) {
    this.templateAtivo = template;
    this.changeDetectorRef.detectChanges();
  }

  getTemplate(){
    switch(this.templateAtivo){
      case 'telaEsqueciSenha':
        return this.telaEsqueciSenha;
      case 'telaSucessoEsqueciSenha':
        return this.telaSucessoEsqueciSenha;
      default:
        return this.telaEsqueciSenha;
    }
  }

  fecharModal() {
    this.modalController.dismiss();
  }
}
