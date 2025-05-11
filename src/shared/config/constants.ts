import * as fs from 'fs';

export default {
  JWT_EXPIRES_IN: '1h',
  AES_LENGTH: 16,
  REDIS_PORT: 6379,
  RSA_PRIVATE_KEY: fs.readFileSync(
    `${process.cwd()}/.secrets/private_key.pem`,
    'utf8',
  ),
  RSA_PUBLIC_KEY: fs.readFileSync(
    `${process.cwd()}/.secrets/public_key.pem`,
    'utf8',
  ),
};
