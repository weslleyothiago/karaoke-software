import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicService } from './music.service';
import { Music } from './music.model';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.page.html',
  styleUrls: ['./painel-admin.page.scss'],
})
export class PainelAdminPage implements OnInit {
  musicForm!: FormGroup;
  music: Music = {
    title: '',
    link: '',
    artist: '',
    duration: '',
    slug: '',
    genreId: 0,
  };

  generosMusicais = [
    { genero: 'K-pop', value: 1 },
    { genero: 'Pop', value: 2 },
    { genero: 'Rock', value: 3 },
    { genero: 'Sertanejo', value: 4 },
    { genero: 'Funk', value: 5 },
    { genero: 'Eletrônica', value: 6 },
    { genero: 'Samba', value: 7 },
    { genero: 'Forró', value: 8 },
    { genero: 'Gospel', value: 9 },
    { genero: 'Rap', value: 10 },
    { genero: 'Reggae', value: 11 },
    { genero: 'MPB', value: 12 },
    { genero: 'Metal', value: 13 },
    { genero: 'Indie', value: 14 },
    { genero: 'Alternativo', value: 15 },
  ];

  constructor(
    private musicService: MusicService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.musicForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern('https?://.+')]],
      genre: ['', Validators.required],
    });

    this.musicForm.get('title')?.valueChanges.subscribe(() => this.updateSlug());
    this.musicForm.get('artist')?.valueChanges.subscribe(() => this.updateSlug());
  }

  updateSlug() {
    const title = this.musicForm.get('title')?.value || '';
    this.music.slug = this.generateSlug(title);

  }

  onSubmit() {
    // Atualiza o objeto `music` com os valores do formulário antes de enviar
    this.music.title = this.musicForm.get('title')?.value;
    this.music.artist = this.musicForm.get('artist')?.value;
    this.music.link = this.musicForm.get('link')?.value;
    this.music.genreId = this.musicForm.get('genre')?.value;
    
    // Envia os dados para o serviço de criação de música
    this.musicService.create(this.music).subscribe(response => {
      console.log('Music registered!', response);
    });
  }

  generateSlug(text: string): string {
    return text
      .toString()
      .normalize("NFD") // Normaliza caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Substitui espaços por hifens
      .replace(/[^\w\-]+/g, '') // Remove caracteres especiais
      .replace(/\-\-+/g, '-'); // Substitui múltiplos hifens por um único
  }
}