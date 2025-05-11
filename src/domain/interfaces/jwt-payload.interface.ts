export interface IJwtPayload {
  id: string;
  phone: string;
  iat?: number;
  exp?: number;
}
