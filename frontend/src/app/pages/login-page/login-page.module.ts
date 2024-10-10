import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPagePageRoutingModule } from './login-page-routing.module';
import { LoginPagePage } from './login-page.page';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';
import { EsqueciSenhaComponent } from 'src/app/components/esqueci-senha/esqueci-senha.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPagePageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [LoginPagePage, RegisterModalComponent, EsqueciSenhaComponent],
})
export class LoginPagePageModule {}
