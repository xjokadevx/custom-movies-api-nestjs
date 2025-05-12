import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/models/user.entity';
import { UserImplementation } from '../../../infrastructure/database/user.implementation';
import { SignUpUserDto } from 'src/interface/dtos/requests/signup-request.dto';
import { CustomLogger } from '../../../shared/logger/logger.service';
import { JwtCustomService } from '../../../infrastructure/auth/jwt.service';

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject(UserImplementation)
    private readonly userRepository: IUserRepository,
    private readonly logger: CustomLogger,
    private readonly jwtService: JwtCustomService,
  ) {}

  async execute(data: SignUpUserDto): Promise<string> {
    const user = new UserEntity(
      data.roleId,
      data.phone,
      data.name,
      data.password,
    );

    const result = await this.userRepository.save(user);
    if (!result.result) {
      throw new BadRequestException(result.data);
    }
    const tmpTkn = await this.jwtService.sign({ id: result.data });
    if (!tmpTkn.result) {
      throw new BadRequestException(tmpTkn.data);
    }
    return tmpTkn.data;
  }
}
