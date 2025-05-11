import { IGenericResult } from '../../shared/interfaces/genericResult.interface';

export interface IEncryptServiceInterface {
  encryptWithAES_RSA(to_encrypt: string): Promise<IGenericResult>;
  decryptWithAES_RSA(to_decrypt: string): Promise<IGenericResult>;
}
