import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-usuario.dto';
import { UserService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UserService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUserDto) {
    return this.usuarioService.create(createUsuarioDto);
  }
}
