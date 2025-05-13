import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard } from '@nestjs/throttler';

import { JwtCustomService } from './infrastructure/auth/jwt.service';
import constants from './shared/config/constants';
import { SharedModule } from './shared.module';
import { EncryptDecryptService } from './infrastructure/encryption/encrypt-decrypt.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthMiddleware } from './interface/middleware/jwt-auth.middleware';

@Module({
  imports: [
    SharedModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      inject: [ConfigService, EncryptDecryptService],
      useFactory: (
        config: ConfigService,
        encryptDecryptService: EncryptDecryptService,
      ) => {
        const encryptedSecret = config.get<string>('JWT_SECRET');
        const decryptedSecret = encryptDecryptService.decryptWithAES_RSA(
          encryptedSecret as string,
        );
        return {
          secret: decryptedSecret.data,
          signOptions: { expiresIn: constants.JWT_EXPIRES_IN },
        };
      },
    }),
  ],
  providers: [
    JwtCustomService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      useClass: JwtCustomService,
      provide: 'IJwtServiceInterface',
    },
  ],
  exports: [JwtCustomService],
})
export class JWTCustomModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes('api/movies');
  }
}
