import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    allowedHeaders: '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Rede Social')
    .setDescription(
      'A aplicação possue Back End2 CRUDs relacionais, um de usuario e um de memorias, o usuario pode ser autenticado.',
    )
    .setVersion('Alpha')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3333)  .then(() => {
    console.log('🚀 HTTP server running on port http://localhost:3333/api#')
  })
}
bootstrap();
