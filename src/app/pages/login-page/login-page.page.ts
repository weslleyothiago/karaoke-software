import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EsqueciSenhaComponent } from 'src/app/components/esqueci-senha/esqueci-senha.component';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async abreModalRegistrar(){
   const modal = await this.modalController.create({
    component: RegisterModalComponent,
    cssClass: 'backdrop-blur-3xl'
   });
   return await modal.present();
  }

  async abreModalEsqueciSenha(){
    const modal = await this.modalController.create({
     component: EsqueciSenhaComponent,
     cssClass: 'backdrop-blur-3xl'
    });
    return await modal.present();
   }
}
