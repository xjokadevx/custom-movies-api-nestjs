import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '../src/interface/controllers/auth.controller';
import { EncryptDecryptService } from '../src/infrastructure/encryption/encrypt-decrypt.service';
import { EnvConfig } from '../src/shared/config/env';
import { LoginUserUseCase } from '../src/application/use-cases/user/login-user.usecase';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
      ],
      controllers: [AuthController],
      providers: [EncryptDecryptService, LoginUserUseCase, EnvConfig],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authController.health()).toBe('Hello World!');
    });
  });
});
