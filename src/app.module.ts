import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptDecryptService } from './infrastructure/encryption/encrypt-decrypt.service';
import { AuthController } from './interface/controllers/auth.controller';
import { LoginUserUseCase } from './application/use-cases/user/login-user.usecase';
import { EnvConfig } from './shared/config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AuthController],
  providers: [EncryptDecryptService, LoginUserUseCase, EnvConfig],
})
export class AppModule {}
