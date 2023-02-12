import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS configuration
  app.enableCors({
    origin: [],
  });
  // Versioning
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Tiny Store REST API')
    .setDescription('RAVN Challenge v2')
    .setVersion('1.0')
    .setContact(
      'Marco Manrique A.',
      'https://github.com/MarcoMnrq',
      'manriqueacham@gmail.com',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // Start app
  await app.listen(3000);
  Logger.log(
    'App running on port 3000. Documentation at http://localhost:3000/api-docs',
    'Bootstrap',
  );
}
bootstrap();
