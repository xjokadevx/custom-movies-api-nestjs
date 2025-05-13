import { Inject, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import { IJwtServiceInterface } from 'src/domain/services/jwtcustom.service.interface';
import { JwtCustomService } from 'src/infrastructure/auth/jwt.service';

export class JwtAuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(JwtCustomService)
    private readonly jwtService: IJwtServiceInterface,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) {
      throw new UnauthorizedException('Bearer token missing');
    }
    const token = authHeader.split(' ')[1];
    if (!authHeader || !authHeader.startsWith('Bearer ') || !token) {
      throw new UnauthorizedException('Bearer token missing');
    }

    try {
      const payload = await this.jwtService.verify(token);
      console.info(payload);
      req['user'] = payload;
      next();
    } catch (err: unknown) {
      console.error('Error verifying token', err);
      const error = err as Error;
      throw new UnauthorizedException(error.message);
    }
  }
}
