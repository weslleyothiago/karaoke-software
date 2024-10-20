import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ModuleService } from './music/module/module.service';
import { MusicService } from './music/music.service';
import { MusicController } from './music/music.controller';

@Module({
  imports: [PrismaModule, UsuarioModule, AuthModule],
  controllers: [AppController, MusicController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ModuleService,
    MusicService,
  ],
})
export class AppModule {}
