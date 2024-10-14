import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { Usuario } from './usuario/entities/usuario.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@CurrentUser() user: Usuario){
    return user;
  }
}
