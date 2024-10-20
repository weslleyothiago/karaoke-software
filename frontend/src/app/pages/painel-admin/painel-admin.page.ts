import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Music } from '../../../../../backend/src/music/models/music.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.page.html',
  styleUrls: ['./painel-admin.page.scss'],
})
export class PainelAdminPage implements OnInit {
  musicForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.musicForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      link: ['', Validators.required],
      genero: ['', Validators.required],
      duracao: [{ value: '', disabled: true }],
      slug: [{ value: '', disabled: true}],
    });
  }

  generosMusicais = [
    { genero: 'K-pop', value: 15 },
    { genero: 'Pop', value: 2 },
    { genero: 'Rock', value: 1 },
    { genero: 'Sertanejo', value: 3 },
    { genero: 'Funk', value: 4 },
    { genero: 'Eletrônica', value: 5 },
    { genero: 'Samba', value: 6 },
    { genero: 'Forró', value: 7 },
    { genero: 'Gospel', value: 8 },
    { genero: 'Rap', value: 9 },
    { genero: 'Reggae', value: 10 },
    { genero: 'MPB', value: 11 },
    { genero: 'Metal', value: 12 },
    { genero: 'Indie', value: 13 },
    { genero: 'Alternativo', value: 14 },
  ]

  cadastrarMusica() {
    if (this.musicForm.valid) {
      const musicaData: Music = this.musicForm.value;
      this.http.post('http://localhost:3333/musics', musicaData)
        .subscribe(response => {
          console.log('Música cadastrada:', response);
        });
    } else {
      console.log('Formulário inválido');
    }
  }

}
