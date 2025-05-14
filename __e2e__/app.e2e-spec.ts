import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { SharedModule } from '../src/shared.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [SharedModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/auth/health')
      .expect(200)
      .expect('Hello World!');
  });
  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ phone: 'test', password: 'test' })
      .expect(400);
  });
  it('/auth/login (POST) with valid credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ phone: '8330000000', password: 'Hello1234*.' })
      .expect(200);
  });
  it('/auth/login (POST) with missing fields', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ password: 'Hello1234*.' })
      .expect(400);
  });
  afterEach(async () => {
    await app.close();
  });
});
