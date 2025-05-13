import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IGenericResult } from 'src/domain/interfaces/genericResult.interface';
import { EncryptDecryptService } from '../encryption/encrypt-decrypt.service';
import { IJwtServiceInterface } from 'src/domain/services/jwtcustom.service.interface';
import { IJwtPayload } from 'src/domain/interfaces/jwt-payload.interface';
import constants from 'src/shared/config/constants';

@Injectable()
export class JwtCustomService implements IJwtServiceInterface {
  JWT_SECRET = '';
  constructor(
    private readonly jwtService: JwtService,
    private readonly encryptDecryptService: EncryptDecryptService,
  ) {}
  compare(token: string, hash: string): IGenericResult {
    try {
      const resultDecrypted =
        this.encryptDecryptService.decryptWithAES_RSA(token);
      if (!resultDecrypted.result) {
        throw new BadRequestException(
          'token encrypted wrong.',
          resultDecrypted.data,
        );
      }
      if (resultDecrypted.data === hash) {
        return {
          result: true,
          data: 'ok',
        };
      }
      return {
        result: false,
        data: 'Incorrect ',
      };
    } catch (error) {
      console.error('Error comparing token', error);
      return {
        result: false,
        data: 'Error comparing token',
      };
    }
  }
  sign(payload: any): IGenericResult {
    try {
      const token = this.jwtService.sign(payload, {
        expiresIn: constants.JWT_EXPIRES_IN,
      });
      const tokenEncrypted =
        this.encryptDecryptService.encryptWithAES_RSA(token);
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
  verify(token: string): IGenericResult {
    const tokenDecrypted = this.encryptDecryptService.decryptWithAES_RSA(token);
    if (!tokenDecrypted.result) {
      throw new BadRequestException(
        'token encrypted wrong.',
        tokenDecrypted.data,
      );
    }
    const result = this.jwtService.verify<IJwtPayload>(tokenDecrypted.data);
    return {
      result: true,
      data: result.phone as string,
    };
  }
}
