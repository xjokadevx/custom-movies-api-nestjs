import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IGenericResult } from 'src/shared/interfaces/genericResult.interface';
import { EncryptDecryptService } from '../encryption/encrypt-decrypt.service';
import { IJwtServiceInterface } from 'src/domain/services/jwtcustom.service.interface';

@Injectable()
export class JwtCustomService implements IJwtServiceInterface {
  JWT_SECRET = '';
  constructor(
    private readonly jwtService: JwtService,
    private readonly encryptDecryptService: EncryptDecryptService,
  ) {}
  async sign(payload: any): Promise<IGenericResult> {
    try {
      const token = this.jwtService.sign(payload);
      const tokenEncrypted =
        await this.encryptDecryptService.encryptWithAES_RSA(token);
      if (!tokenEncrypted.result) {
        throw new Error(tokenEncrypted.data);
      }
      return {
        result: true,
        data: tokenEncrypted.data,
      };
    } catch (error) {
      console.error('Error signing token', error);
      return {
        result: false,
        data: 'Error generating token',
      };
    }
  }
  async verify(token: string): Promise<IGenericResult> {
    try {
      const tokenDecrypted =
        await this.encryptDecryptService.decryptWithAES_RSA(token);
      if (!tokenDecrypted.result) {
        throw new Error(tokenDecrypted.data);
      }
      this.jwtService.verify(tokenDecrypted.data);
      return {
        result: true,
        data: 'ok',
      };
    } catch (error) {
      console.error('Error verifying token', error);
      return {
        result: false,
        data: 'Error verifying token',
      };
    }
  }
}
