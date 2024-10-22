import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicService } from './music.service';
import { Music } from './music.model';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.page.html',
  styleUrls: ['./painel-admin.page.scss'],
})
export class PainelAdminPage implements OnInit {
  videoDuration: string | null = null;
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
    private youtubeService: YoutubeService,
    private musicService: MusicService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    // Inicializa o formulário
    this.musicForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern('https?://.+')]],
      genre: ['', Validators.required],
    });

    // Atualiza o slug quando o título ou o artista mudarem
    this.musicForm.get('title')?.valueChanges.subscribe(() => this.updateSlug());
    this.musicForm.get('artist')?.valueChanges.subscribe(() => this.updateSlug());

    // Quando o campo de link mudar, extraímos o ID do vídeo e obtemos a duração
    this.musicForm.get('link')?.valueChanges.subscribe((link: string) => {
      const videoId = this.youtubeService.extractVideoId(link);
      if (videoId) {
        this.youtubeService.getVideoDuration(videoId).subscribe((response: any) => {
          const duration = response.items[0].contentDetails.duration;
          this.videoDuration = this.formatDuration(duration);
        });
      } else {
        console.error('Video ID not found');
      }
    });
  }

  formatDuration(duration: string): string {
    const parts = duration.replace('PT', '').split(/H|M|S/);
    const hours = parts[0] ? parts[0].padStart(2, '0') : '00';
    const minutes = parts[1] ? parts[1].padStart(2, '0') : '00';
    const seconds = parts[2] ? parts[2].padStart(2, '0') : '00';
    return `${hours}:${minutes}:${seconds}`;
  }

  updateSlug() {
    const title = this.musicForm.get('title')?.value || '';
    const artist = this.musicForm.get('artist')?.value || '';
    this.music.slug = this.generateSlug(`${title}`);
  }

  onSubmit() {
    this.music.title = this.musicForm.get('title')?.value;
    this.music.artist = this.musicForm.get('artist')?.value;
    this.music.link = this.musicForm.get('link')?.value;
    this.music.genreId = this.musicForm.get('genre')?.value;
    this.music.duration = this.videoDuration || '';

    this.musicService.create(this.music).subscribe(response => {
      console.log('Music registered!', response);
    });
  }

  generateSlug(text: string): string {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
}
