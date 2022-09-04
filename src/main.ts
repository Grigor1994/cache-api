import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Common } from './utils/constants';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { GlobalErrorHandler } from './middlewares/global.error.handler';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(Common.GLOBAL_PREFIX);
  app.useGlobalFilters(new GlobalErrorHandler());
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  setupSwagger(app);
  await app.listen(PORT);
  Logger.log(`🚀 Application is running on: ${PORT} PORT`);
}

bootstrap();
