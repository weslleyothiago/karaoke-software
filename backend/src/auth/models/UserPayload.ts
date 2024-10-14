export interface UserPayload {
  sub: number;
  email: string;
  tipo: string;
  slug: string;
  iat?: number;
  exp?: number;
}