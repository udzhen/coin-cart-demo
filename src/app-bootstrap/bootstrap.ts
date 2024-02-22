import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { useSwagger } from 'src/app-bootstrap/useSwagger';
import { useValidation } from 'src/app-bootstrap/useValidation';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useValidation(app);
  useSwagger(app);
  await app.listen(3000);
}