import { BadRequestException, Inject } from '@nestjs/common';

import { IJwtServiceInterface } from 'src/domain/services/jwtcustom.service.interface';
import { JwtCustomService } from '../../../infrastructure/auth/jwt.service';
import { CustomLogger } from '../../../shared/logger/logger.service';
import { LoginUserDto } from '../../../interface/dtos/requests/login-request.dto';
import { UserServiceImpl } from 'src/infrastructure/database/user.service';
import { IUserRepository } from 'src/domain/repositories/user.repository';

export class LoginUserUseCase {
  constructor(
    @Inject(JwtCustomService)
    private readonly jwtService: IJwtServiceInterface,
    private readonly logger: CustomLogger,
    @Inject(UserServiceImpl)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(body: LoginUserDto): Promise<string> {
    const user = await this.userRepository.findByPhone(body.phone);
    if (!user) {
      throw new BadRequestException('Phone not found. Please sign up first.');
    }
    this.logger.log(`User logged in: ${body.phone}`, LoginUserUseCase.name);
    const tokenResult = this.jwtService.sign({
      id: user?._id as string,
      phone: user.phone,
    });
    if (!tokenResult.result) {
      throw new Error(tokenResult.data);
    }
    this.logger.log(`Token: ${tokenResult.data}`, LoginUserUseCase.name);
    return tokenResult.data;
  }
}
