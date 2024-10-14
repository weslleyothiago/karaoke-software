import { Module } from '@nestjs/common';
import { UserService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsuarioController],
  providers: [UserService],
  exports: [UserService],
})
export class UsuarioModule {}
