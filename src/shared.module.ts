import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Agent } from 'https';
import { EncryptDecryptService } from './infrastructure/encryption/encrypt-decrypt.service';
import { EnvConfig } from './shared/config/env';
import { LoggerModule } from './logger.module';
import { SwapiService } from './infrastructure/movies/swapi.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      httpsAgent: new Agent({
        rejectUnauthorized: false,
      }),
    }),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [
    EncryptDecryptService,
    EnvConfig,
    ConfigService,
    SwapiService,
    {
      provide: 'IMovieServices',
      useClass: SwapiService,
    },
  ],
  exports: [EncryptDecryptService, EnvConfig, ConfigService, SwapiService],
})
export class SharedModule {}
