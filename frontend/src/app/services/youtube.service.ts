import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiKey = 'AIzaSyBFAAVPJ5njH2pzOpIKMmg7-MNn4gBGIb8';

  constructor(private http: HttpClient) {}

  extractVideoId(url: string): string | null {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  }

  getVideoDuration(videoId: string) {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${this.apiKey}`;
    return this.http.get(url);
  }
  
}
