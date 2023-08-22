import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(json({ limit: '60mb' }));

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  })

  const config = new DocumentBuilder()
    .setTitle('Documentacion Api')
    .setDescription('Api de cursos')
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3001);
}
bootstrap();
