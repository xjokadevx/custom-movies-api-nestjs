import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/models/user.entity';
import { UserServiceImpl } from '../../../infrastructure/database/user.service';
import { SignUpUserDto } from 'src/interface/dtos/requests/signup-request.dto';
import { CustomLogger } from '../../../shared/logger/logger.service';
import { JwtCustomService } from '../../../infrastructure/auth/jwt.service';
import { EncryptDecryptService } from 'src/infrastructure/encryption/encrypt-decrypt.service';

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject(UserServiceImpl)
    private readonly userRepository: IUserRepository,
    private readonly logger: CustomLogger,
    private readonly jwtService: JwtCustomService,
    private readonly encryptService: EncryptDecryptService,
  ) {}

  async execute(data: SignUpUserDto): Promise<string> {
    const user = new UserEntity(
      data.roleId,
      data.phone,
      data.name,
      data.password,
    );

    if (await this.userRepository.findByPhone(data.phone)) {
      throw new BadRequestException('Phone already exists. Please validate.');
    }

    this.logger.log(`User signed up: ${data.phone}`, SignUpUseCase.name);
    const pwdEncrypted = this.encryptService.encryptWithAES_RSA(data.password);
    if (!pwdEncrypted.result) {
      throw new InternalServerErrorException(pwdEncrypted.data);
    }
    user.pwd = pwdEncrypted.data;
    const result = await this.userRepository.save(user);
    if (!result.result) {
      throw new BadRequestException(result.data);
    }
    const tmpTkn = this.jwtService.sign({ id: result.data });
    if (!tmpTkn.result) {
      throw new BadRequestException(tmpTkn.data);
    }
    return tmpTkn.data;
  }
}
