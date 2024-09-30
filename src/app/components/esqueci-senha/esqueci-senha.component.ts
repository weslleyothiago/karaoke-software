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

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public authService:AuthenticationEmailService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.formularioEsqueciSenha = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.(com|net|org|edu|gov|mil)$')]],
    });
  }


  async resetarSenha(){
    const email = this.formularioEsqueciSenha.get('email')?.value;

    try{
      this.authService.resetarSenha(email)
      console.log('Link de reset de senha enviado.')
      this.router.navigate(['/login']);
      this.modalController.dismiss()
    }catch(error){
      console.error(error);
    }
  }

  fechaModal() {
    this.modalController.dismiss();
  }
}