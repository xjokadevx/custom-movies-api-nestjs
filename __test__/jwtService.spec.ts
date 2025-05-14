import { Test, TestingModule } from '@nestjs/testing';
import { JwtCustomService } from '../src/infrastructure/auth/jwt.service';
import { JWTCustomModule } from '../src/jwt.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtService } from '@nestjs/jwt';
import { EncryptDecryptService } from '../src/infrastructure/encryption/encrypt-decrypt.service';

describe('JwtCustomService', () => {
  let app: TestingModule;
  let jwtCustomService: JwtCustomService;
  let jwtService: JwtService;
  let encryptService: EncryptDecryptService;

  const VALID_TKN =
    '4QLc0sJ5xel9wrgVwj+T7LjE89lVOjRlmMhjkqH8OTZuQP3E9nzKAxY/sn923PTvwRjw2WXB1zCngv4ZJNUiFviUbBRYzepDFUd5qh/zy7Gr0HLRY1mVdCPVKdMeE3QmrPHeeBsKy6Hu6IUCUzSmqFR1JS5be1aDArbsUkGSNzNOga1aU6k7d8Wrsn81JuvvgjXKLcWS1+6k0DCMgQQ/7w22wnViSSd6/uk9BgwaofFqaMJmMtV1dvhBrs3LGSsauZ2d2mI46szFoLDRk4lhHEhIi4ZNZyPrhxUbXZeKQUQ=';

  const EXPIRED_TKN =
    'D3lZ4NVkDRRMK/4Unx0vABxdS3Z78scuCz0mcdr+Pkq8ez9BxWeHqDCdHEey2SbSzgoGsdxTZO9RbmpFpqbifjJLYdLTbUa/SGEZY3AL61E0HFlQerHu0365uJjaAaY75n4UN+y2aCIR1YCSTxmwkHSvq2WU0zNkovpog12Ll/D1MYFJ0g+OQd6iQOg/Qv9g8WQeQFjd41CYhbaJOrcKaFSO5NjzoVUUuTqEi3amoaV46MIJ2YfQjG9Cs8lF02YUNVOBtqfa0vFinIngIkHr81mkIIbLA2Tp/DAw3174tkI=';

  const VALID_HASH_ENCRYPTED = 'Mvcj5gaukUnT3iP0IY0xzP2HatgNSZe/tN21KFLQxZ0=';
  const VALID_HASH = 'Hello1234*.';
  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mocked-token'),
      verify: jest.fn().mockReturnValue({ id: '123', phone: '8330000000' }),
    };
    app = await Test.createTestingModule({
      imports: [
        JWTCustomModule,
        ThrottlerModule.forRoot({
          throttlers: [
            {
              ttl: 0,
              limit: 0,
            },
          ],
        }),
      ],
      providers: [
        JwtCustomService,
        EncryptDecryptService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();
    jwtCustomService = app.get<JwtCustomService>(JwtCustomService);
    jwtService = app.get<JwtService>(JwtService);
    encryptService = app.get<EncryptDecryptService>(EncryptDecryptService);
  });

  it('should be defined', () => {
    const service: JwtCustomService =
      app.get<JwtCustomService>(JwtCustomService);
    expect(service).toBeDefined();
  });

  it('Sign payload success', () => {
    const payload = { id: '123', phone: '8330000000' };
    const spySign = jest.spyOn(jwtService, 'sign');
    const result = jwtCustomService.sign(payload);
    expect(spySign).toHaveBeenCalled();
    expect(spySign).toHaveBeenCalledTimes(1);
    expect(result.result).toEqual(true);
    expect(result.data).not.toBeNull();
    expect(typeof result.data).toBe('string');
  });

  it('Signing correct payload but encryption fail', () => {
    const payload = { id: '123', phone: '8330000000' };
    const spyEncrypt = jest
      .spyOn(encryptService, 'encryptWithAES_RSA')
      .mockReturnValue({
        result: false,
        data: 'Error encrypting token',
      });
    const spySign = jest.spyOn(jwtService, 'sign');
    const result = jwtCustomService.sign(payload);
    expect(spySign).toHaveBeenCalled();
    expect(spySign).toHaveBeenCalledTimes(1);
    expect(spyEncrypt).toHaveBeenCalled();
    expect(spyEncrypt).toHaveBeenCalledTimes(1);
    expect(result.result).toEqual(false);
    expect(result.data).not.toBeNull();
    expect(typeof result.data).toBe('string');
    expect(result.data).toEqual('Error generating token');
  });

  it('Sign empty payload fail', () => {
    const payload = {};
    const spySign = jest.spyOn(jwtService, 'sign');
    const result = jwtCustomService.sign(payload);
    expect(spySign).not.toHaveBeenCalled();
    expect(result.result).toEqual(false);
    expect(result.data).not.toBeNull();
    expect(typeof result.data).toBe('string');
  });

  it('Verify valid token success', () => {
    const spyVerify = jest.spyOn(jwtService, 'verify');
    const result = jwtCustomService.verify(VALID_TKN);
    expect(spyVerify).toHaveBeenCalled();
    expect(spyVerify).toHaveBeenCalledTimes(1);
    expect('result' in result).toBe(true);
    expect('data' in result).toBe(true);
    expect(result.result).toEqual(true);
    expect(result.data).not.toBeNull();
    expect(typeof result.data).toBe('string');
  });

  it('Verify expired token fail', () => {
    const spyVerify = jest.spyOn(jwtService, 'verify');
    const spyEncrypt = jest.spyOn(encryptService, 'decryptWithAES_RSA');
    try {
      jwtCustomService.verify(EXPIRED_TKN);
    } catch (error) {
      const err = error as Error;
      expect(err.message).toEqual('jwt expired');
      expect(spyVerify).toHaveBeenCalled();
      expect(spyVerify).toHaveBeenCalledTimes(1);
      expect(spyEncrypt).toHaveBeenCalled();
      expect(spyEncrypt).toHaveBeenCalledTimes(1);
    }
  });

  it('Verify empty token fail', () => {
    const spyEncrypt = jest.spyOn(encryptService, 'decryptWithAES_RSA');
    try {
      jwtCustomService.verify('');
    } catch (error) {
      console.error(error);
      const err = error as Error;
      expect(err.message).toEqual('Invalid token. Please log in again.');
      expect(spyEncrypt).toHaveBeenCalled();
      expect(spyEncrypt).toHaveBeenCalledTimes(1);
    }
  });

  it('Compare token success', () => {
    const sypyEncrypt = jest.spyOn(encryptService, 'decryptWithAES_RSA');
    const result = jwtCustomService.compare(VALID_HASH_ENCRYPTED, VALID_HASH);
    expect(result.result).toEqual(true);
    expect(result.data).not.toBeNull();
    expect(typeof result.data).toBe('string');
    expect(sypyEncrypt).toHaveBeenCalled();
    expect(sypyEncrypt).toHaveBeenCalledTimes(1);
  });

  it('Compare token fail', () => {
    const sypyEncrypt = jest.spyOn(encryptService, 'decryptWithAES_RSA');
    const result = jwtCustomService.compare(VALID_HASH_ENCRYPTED, 'test');
    expect(result.result).toEqual(false);
    expect(result.data).not.toBeNull();
    expect(typeof result.data).toBe('string');
    expect(sypyEncrypt).toHaveBeenCalled();
    expect(sypyEncrypt).toHaveBeenCalledTimes(1);
  });

  it('Compare empty token fail', () => {
    const sypyEncrypt = jest.spyOn(encryptService, 'decryptWithAES_RSA');
    const result = jwtCustomService.compare('', 'test');
    expect(result.result).toEqual(false);
    expect(result.data).not.toBeNull();
    expect(typeof result.data).toBe('string');
    expect(sypyEncrypt).toHaveBeenCalled();
    expect(sypyEncrypt).toHaveBeenCalledTimes(1);
  });

  it('Compare executed but encryptation fail', () => {
    const sypyEncrypt = jest.spyOn(encryptService, 'decryptWithAES_RSA');
    try {
      jwtCustomService.compare('test', 'test');
    } catch (error) {
      expect(sypyEncrypt).toHaveBeenCalled();
      expect(sypyEncrypt).toHaveBeenCalledTimes(1);
      const err = error as Error;
      expect(err.message).toEqual('token encrypted wrong.');
    }
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await app.close();
  });
});
