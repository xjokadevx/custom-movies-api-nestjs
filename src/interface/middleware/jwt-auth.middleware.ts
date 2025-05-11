import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import { JwtCustomService } from 'src/infrastructure/auth/jwt.service';

export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtCustomService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] as string;
    const token = authHeader.split(' ')[1];
    if (!authHeader || !authHeader.startsWith('Bearer ') || !token) {
      throw new UnauthorizedException('Beare token missing');
    }

    try {
      const payload = await this.jwtService.verify(token);
      req['user'] = payload;
      next();
    } catch (err) {
      console.error('Error verifying token', err);
      throw new UnauthorizedException('Token invalid');
    }
  }
}
