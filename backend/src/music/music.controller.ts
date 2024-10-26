import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './music.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('musics')
export class MusicController {
  constructor(
    private readonly musicService: MusicService
  ) {}

  @IsPublic()
  @Post('')
  async create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.create(createMusicDto);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return this.musicService.findAll();
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.musicService.findOne(id);
  }
}
