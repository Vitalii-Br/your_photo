import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Преобразует данные в типы DTO
      whitelist: true, // Удаляет лишние поля
      forbidNonWhitelisted: true, // Ошибка при наличии лишних полей
    }),
  );

  app.get(PrismaService)
  app.setGlobalPrefix('/API-photo')
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', // Порт вашего Next.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
