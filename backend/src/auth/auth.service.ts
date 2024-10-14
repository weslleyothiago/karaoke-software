import { Injectable } from '@nestjs/common';
import { UserService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: Usuario): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      slug: user.slug,
      tipo: user.tipo,
    };
    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.senha);

      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined,
        }
      }
    }
    throw new UnauthorizedError('Email e/ou senha inválidos');
  }
}