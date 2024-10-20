import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MusicService {

  constructor(private prisma: PrismaService) { }

  async createMusic(data: Prisma.MusicaCreateInput) {
    return this.prisma.musica.create({ data });
  }

  async getAllMusics() {
    return this.prisma.musica.findMany();
  }

  async getMusicById(id: number) {
    return this.prisma.musica.findUnique({ where: { id } });
  }

  async updateMusic(id: number, data: Prisma.MusicaUpdateInput) {
    return this.prisma.musica.update({ where: { id }, data });
  }

  async deleteMusic(id: number) {
    return this.prisma.musica.delete({ where: { id } });
  }
  
}