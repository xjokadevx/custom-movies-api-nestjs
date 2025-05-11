import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfig {
  constructor(private readonly config: ConfigService) {}

  get swapiUrl() {
    return this.config.get<string>('SWAPI_URL');
  }

  get jwtSecret() {
    return this.config.get<string>('JWT_SECRET');
  }

  get aesSecret() {
    return this.config.get<string>('AES_SECRET_KEY');
  }

  get redisHost() {
    return this.config.get<string>('REDIS_HOST');
  }

  get redisTkn() {
    return this.config.get<number>('REDIS_TKN');
  }

  get port() {
    return this.config.get<number>('PORT') || 3000;
  }

  get rsaPublicKey() {
    return this.config.get<string>('RSA_PUBLIC_KEY');
  }

  get rsaPrivateKey() {
    return this.config.get<string>('RSA_PRIVATE_KEY');
  }
}
