import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // se adminte DTO
      forbidNonWhitelisted: true, // error si envia otra informacion
      transform: true, //transformar los datos siempre que pueda
    }),
  );

  const config = new DocumentBuilder()
  .setTitle('Cloudinary NestJS')
  .setDescription('The Cloudinary API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_SERVER') || 3001;
  await app.listen(port);

}
bootstrap();
