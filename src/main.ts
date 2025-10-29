import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      /** Remove extra properties from the request body */
      whitelist: true,
      /** Throw an error if extra properties are sent */
      forbidNonWhitelisted: true,
      /** Transform the request body to the DTO type */
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3009);
}
void bootstrap();
