import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable shutdown hooks explicitly.
  app.enableShutdownHooks();

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Tyba API')
    .setDescription('Prueba con invoices')
    .setVersion(require(`${process.cwd()}/package.json`).version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  app.enableCors();
  //app.useLogger();
  await app.listen(3000);
}
bootstrap();
