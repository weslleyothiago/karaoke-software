import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUserDto) {
    return this.usuarioService.create(createUsuarioDto);
  }
}
