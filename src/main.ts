import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { ExceptionsInterceptor } from './interface/interceptors/exception.interceptor';
import { CustomLogger } from './shared/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('CONEXA SWAPI CHALLENGE API')
    .setDescription('CONEXA BACKEND CHALLENGE')
    .setVersion('1.0')
    .addTag('movies')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });
  const logger = app.get(CustomLogger);

  app.useGlobalFilters(new ExceptionsInterceptor());
  app.useLogger(logger);
  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,DELETE',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => {
    console.log('Server running on port', process.env.PORT ?? 3000);
  })
  .catch((err) => console.error('Error starting server', err));
