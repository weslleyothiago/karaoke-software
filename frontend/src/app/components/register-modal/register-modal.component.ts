import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder as FormBuilder,
  FormGroup,
  Validators as Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';
import { AuthenticationEmailService } from 'src/services/authentication-email.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})

export class RegisterModalComponent implements OnInit {
  
  formularioRegistro!: FormGroup;
  templateAtivo: string = 'telaDeEmail';

  @ViewChild('telaDeEmail') telaDeEmail!: TemplateRef<any>;
  @ViewChild('telaDeSenha') telaDeSenha!: TemplateRef<any>;
  @ViewChild('telaDeNomeENasc') telaDeNomeENasc!: TemplateRef<any>;

  dias: number[] = [];
  meses = [
    { name: 'Janeiro', value: 1 },
    { name: 'Fevereiro', value: 2 },
    { name: 'Março', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Maio', value: 5 },
    { name: 'Junho', value: 6 },
    { name: 'Julho', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Setembro', value: 9 },
    { name: 'Outubro', value: 10 },
    { name: 'Novembro', value: 11 },
    { name: 'Dezembro', value: 12 },
  ];
  anos: number[] = [];

  constructor(
    private authServiceGoogle: AuthService,
    public router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    public authService: AuthenticationEmailService,
    public loadingCtrl: LoadingController,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.formularioRegistro = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.(com|net|org|edu|gov|mil)$')]],
      senha: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d).{8,}$")]],
      nome: ['', Validators.required],
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      ano: ['', Validators.required],
    });

    // Popula a lista de anos (por exemplo, de 1900 até o ano atual)
    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual; i >= 1900; i--) {
      this.anos.push(i);
    }

    // Inicializa os dias com base no mês e no ano
    this.atualizarDias();
  }

  get controlErros() {
    return this.formularioRegistro?.controls;
  }

  get senhaValida() {
    const senha = this.formularioRegistro.controls['senha'].value || '';
    
    const temLetra = /[A-Za-z]/.test(senha);
    const temNumero = /\d/.test(senha);
    const tamanhoMinimo = senha.length >= 8;
  
    return {
      temLetra,
      temNumero,
      tamanhoMinimo
    };
  }

  async registrarSe() {
    const loading = await this.loadingCtrl.create({
      message: 'Registrando...',
      spinner: 'crescent',
    });
    await loading.present();
  
    if (this.formularioRegistro?.valid) {
      const email = this.formularioRegistro.get('email')?.value;
      const senha = this.formularioRegistro.get('senha')?.value;
      
      try {
        // Chamando o serviço de autenticação para registrar o usuário
        const usuario = await this.authService.registrarUsuario(email, senha);
        console.log('Usuário registrado com sucesso: ', usuario);
  
        // Redireciona para a página inicial após o registro bem-sucedido
        this.router.navigate(['/home']);
        this.modalController.dismiss();  // Fecha o modal de registro (se aplicável)
  
      } catch (error) {
        console.error('Erro ao registrar usuário: ', error);
  
      } finally {
        await loading.dismiss(); // Sempre fecha o loading, independente de sucesso ou erro
      }
  
    } else {
      // Se o formulário for inválido, fecha o loading e exibe erro
      await loading.dismiss();
    }
  }

    // Método para registrar com Google
    async registrarComGoogle() {
      try {
        await this.authServiceGoogle.cadastrarUsuarioComGoogle();
        // Aqui você pode redirecionar o usuário ou mostrar uma mensagem de sucesso
      } catch (error) {
        console.log('Erro ao registrar com Google: ' + error);
      }
    }
  

  fecharModal() {
    this.modalController.dismiss();
  }

  ativarTemplate(template: string) {
    this.templateAtivo = template;
    this.changeDetectorRef.detectChanges();
  }

  getTemplate() {
    switch (this.templateAtivo) {
      case 'telaDeEmail':
        return this.telaDeEmail;
      case 'telaDeSenha':
        return this.telaDeSenha;
      case 'telaDeNomeENasc':
        return this.telaDeNomeENasc;
      default:
        return this.telaDeEmail;
    }
  }

  mudarData() {
    this.atualizarDias();
  }

  atualizarDias() {
    const mes = this.formularioRegistro.get('mes')?.value;
    const ano = this.formularioRegistro.get('ano')?.value;

    if (mes && ano) {
      const diasNoMes = this.getDiasNoMes(mes, ano);
      this.dias = Array.from({ length: diasNoMes }, (v, k) => k + 1);
    }
  }

  getDiasNoMes(mes: number, ano: number): number {
    return new Date(ano, mes, 0).getDate();
  }
}
