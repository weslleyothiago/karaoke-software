import { Body, Controller, Post } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './music.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @IsPublic()
  @Post('')
  async create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.create(createMusicDto);
  }
}
