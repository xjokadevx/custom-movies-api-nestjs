import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './interface/controllers/auth.controller';
import { LoginUserUseCase } from './application/use-cases/user/login-user.usecase';
import { JwtCustomService } from './infrastructure/auth/jwt.service';
import constants from './shared/config/constants';
import { SharedModule } from './shared.module';
import { EncryptDecryptService } from './infrastructure/encryption/encrypt-decrypt.service';

@Module({
  imports: [
    SharedModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      inject: [ConfigService, EncryptDecryptService],
      useFactory: async (
        config: ConfigService,
        encryptDecryptService: EncryptDecryptService,
      ) => {
        const encryptedSecret = config.get<string>('JWT_SECRET');
        const decryptedSecret = await encryptDecryptService.decryptWithAES_RSA(
          encryptedSecret as string,
        );
        return {
          secret: decryptedSecret.data,
          signOptions: { expiresIn: constants.JWT_EXPIRES_IN },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUserUseCase, JwtCustomService],
  exports: [JwtCustomService],
})
export class AppModule {}
