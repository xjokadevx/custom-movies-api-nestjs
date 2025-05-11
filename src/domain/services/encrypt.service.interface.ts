import { IEncryptResult } from './../../shared/interfaces/generic';

export interface IEncryptServiceInterface {
  encryptWithAES_RSA(to_encrypt: string): Promise<IEncryptResult>;
  decryptWithAES_RSA(to_decrypt: string): Promise<IEncryptResult>;
}
