import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.get(PrismaService)
  app.setGlobalPrefix('/API-photo')
  app.enableCors({
    origin: 'http://localhost:3000', // Порт вашего Next.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
