import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music } from './music.model';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private baseUrl = 'http://localhost:3333/music';

  constructor(private http: HttpClient) {}

  create(music: Music): Observable<Music> {
    return this.http.post<Music>(this.baseUrl, music);
  }
}
