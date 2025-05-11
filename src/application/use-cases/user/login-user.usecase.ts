import { Inject } from '@nestjs/common';
import { LoginUserDto } from 'src/application/dto/login-user.dto';
import { IJwtServiceInterface } from 'src/domain/services/jwtcustom.service.interface';
import { JwtCustomService } from '../../../infrastructure/auth/jwt.service';

export class LoginUserUseCase {
  constructor(
    @Inject(JwtCustomService)
    private readonly jwtService: IJwtServiceInterface,
  ) {}

  async execute(body: LoginUserDto): Promise<string> {
    const tokenResult = await this.jwtService.sign(body);
    if (!tokenResult.result) {
      throw new Error(tokenResult.data);
    }
    return tokenResult.data;
  }
}
