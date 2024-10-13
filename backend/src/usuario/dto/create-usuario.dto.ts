import { Usuario } from '../entities/usuario.entity';
import { IsEmail, IsEnum, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto extends Usuario {
  @IsEnum(['Administrador', 'Cliente'], {
    message: 'O tipo de usuário deve ser "Administrador" ou "Cliente".',
  })
  tipo: 'Administrador' | 'Cliente';

  @IsEmail()
  @Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|net|org|edu|gov|mil)$/, {
    message: 'O e-mail deve ser um e-mail válido.',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, {
    message:
      'A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra e um número.',
  })
  senha: string;

  @IsString()
  slug: string;
}
