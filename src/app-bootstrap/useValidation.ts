import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

export function useValidation(app: INestApplication<any>): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}