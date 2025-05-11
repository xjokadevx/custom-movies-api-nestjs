import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { JwtCustomService } from '../src/infrastructure/auth/jwt.service';
import { SharedModule } from '../src/shared.module';
import { EncryptDecryptService } from '../src/infrastructure/encryption/encrypt-decrypt.service';
import constants from '../src/shared/config/constants';

describe('JwtService', () => {
  let service: JwtCustomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
            const decryptedSecret =
              await encryptDecryptService.decryptWithAES_RSA(
                encryptedSecret as string,
              );
            return {
              secret: decryptedSecret.data,
              signOptions: { expiresIn: constants.JWT_EXPIRES_IN },
            };
          },
        }),
      ],
      providers: [JwtCustomService],
    }).compile();

    service = module.get<JwtCustomService>(JwtCustomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
