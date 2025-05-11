import { Inject } from '@nestjs/common';
import { LoginUserDto } from 'src/application/dto/login-user.dto';
import { IEncryptServiceInterface } from 'src/domain/services/encrypt.service.interface';
import { EncryptDecryptService } from '../../../infrastructure/encryption/encrypt-decrypt.service';

export class LoginUserUseCase {
  constructor(
    @Inject(EncryptDecryptService)
    private readonly encryptDecryptService: IEncryptServiceInterface,
  ) {}

  async execute(body: LoginUserDto): Promise<string> {
    const result_encrypt = await this.encryptDecryptService.encryptWithAES_RSA(
      body.password,
    );
    if (!result_encrypt.result) {
      return result_encrypt.data;
    }
    return result_encrypt.data;
  }
}
