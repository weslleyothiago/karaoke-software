import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MusicService } from './music.service';
import { Prisma } from '@prisma/client';

@Controller('musicas')
export class MusicaController {
  constructor(private readonly musicaService: MusicService) {}

  @Post()
  async createMusica(@Body() data: Prisma.MusicaCreateInput) {
    return this.musicaService.createMusic(data);
  }

  @Get()
  async getAllMusicas() {
    return this.musicaService.getAllMusics();
  }

  @Get(':id')
  async getMusicaById(@Param('id') id: string) {
    return this.musicaService.getMusicById(Number(id));
  }

  @Put(':id')
  async updateMusica(@Param('id') id: string, @Body() data: Prisma.MusicaUpdateInput) {
    return this.musicaService.updateMusic(Number(id), data);
  }

  @Delete(':id')
  async deleteMusica(@Param('id') id: string) {
    return this.musicaService.deleteMusic(Number(id));
  }
}
