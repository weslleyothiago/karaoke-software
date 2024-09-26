import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss'],
})
export class EsqueciSenhaComponent  implements OnInit {

  constructor(private modalController: ModalController,
  ) { }

  ngOnInit() {}

  fechaModal() {
    this.modalController.dismiss();
  }
}
