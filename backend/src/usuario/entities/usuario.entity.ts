export class Usuario {
  id?: number;
  tipo: 'Administrador' | 'Cliente';
  email: string;
  senha: string;
  slug?: string;
}
