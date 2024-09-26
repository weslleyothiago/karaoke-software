import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthenticatioEmailService } from 'src/services/authentication-email.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  regForm!: FormGroup;
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
    public authService:AuthenticatioEmailService,
    public loadingCtrl: LoadingController,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]],
      senha: ['', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"),Validators.minLength(8)]],
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
    this.updateDias();
  }

  get controlErros(){
    return this.regForm?.controls;
  }

  async registrarSe(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.regForm?.valid){
      
      const user = await this.authService.registrarUsuario(email, senha)
    }
  }

  fechaModal() {
    this.modalController.dismiss();
  }

  ativarTemplate(template: string) {
    this.templateAtivo = template;
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

  onDateChange() {
    this.updateDias();
  }

  updateDias() {
    const mes = this.regForm.get('mes')?.value;
    const ano = this.regForm.get('ano')?.value;

    if (mes && ano) {
      const diasNoMes = this.getDiasNoMes(mes, ano);
      this.dias = Array.from({ length: diasNoMes }, (v, k) => k + 1);
    }
  }

  getDiasNoMes(mes: number, ano: number): number {
    return new Date(ano, mes, 0).getDate();
  }

}
