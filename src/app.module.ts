import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AuthController } from './interface/controllers/auth.controller';
import { LoginUserUseCase } from './application/use-cases/user/login-user.usecase';
import { JwtCustomService } from './infrastructure/auth/jwt.service';
import constants from './shared/config/constants';
import { SharedModule } from './shared.module';
import { EncryptDecryptService } from './infrastructure/encryption/encrypt-decrypt.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthMiddleware } from './interface/middleware/jwt-auth.middleware';

@Module({
  imports: [
    SharedModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 0,
          limit: 0,
        },
      ],
    }),
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
  providers: [
    LoginUserUseCase,
    JwtCustomService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [JwtCustomService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes('api/users', 'api/movies');
  }
}
