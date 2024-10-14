import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Usuario> {
    const data: Prisma.UsuarioCreateInput = {
      ...createUserDto,
      senha: await bcrypt.hash(createUserDto.senha, 10),
    };

    const createdUser = await this.prisma.usuario.create({ data });

    return {
      ...createdUser,
      senha: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }
}