import { Inject } from '@nestjs/common';

import { IJwtServiceInterface } from 'src/domain/services/jwtcustom.service.interface';
import { JwtCustomService } from '../../../infrastructure/auth/jwt.service';
import { CustomLogger } from '../../../shared/logger/logger.service';
import { LoginUserDto } from '../../../interface/dtos/requests/login-request.dto';

export class LoginUserUseCase {
  constructor(
    @Inject(JwtCustomService)
    private readonly jwtService: IJwtServiceInterface,
    private readonly logger: CustomLogger,
  ) {}

  async execute(body: LoginUserDto): Promise<string> {
    this.logger.log(`User logged in: ${body.username}`, LoginUserUseCase.name);
    const tokenResult = await this.jwtService.sign(body);
    if (!tokenResult.result) {
      throw new Error(tokenResult.data);
    }
    this.logger.log(`Token: ${tokenResult.data}`, LoginUserUseCase.name);
    return tokenResult.data;
  }
}
