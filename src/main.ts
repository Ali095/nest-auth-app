import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log("App is running at http://localhost:%d in %s mode", 3000, "development");
}
bootstrap();
