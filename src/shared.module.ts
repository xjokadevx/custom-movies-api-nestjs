import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { EncryptDecryptService } from './infrastructure/encryption/encrypt-decrypt.service';
import { EnvConfig } from './shared/config/env';
import { LoggerModule } from './logger.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [EncryptDecryptService, EnvConfig, ConfigService],
  exports: [EncryptDecryptService, EnvConfig, ConfigService],
})
export class SharedModule {}
