import { NestFactory } from '@nestjs/core';
import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppExceptionFilter } from './modules/app/infrastructure/filters/app.exception.filter';
import { AppModule } from './modules/app/app.module';
import { APP_VERSION } from './modules/app/app.constants';

const logger = new Logger('Main', { timestamp: true });
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.LOG_LEVEL as unknown as  LogLevel[] || ['log'],
  });

  const port = process.env.APPLICATION_PORT || 3000;

  const version = app.get<string>(APP_VERSION);
  const openApiConfig = new DocumentBuilder()
      .setTitle('Bill-Buddy application')
      .setDescription(`OpenAPI for Bill-Buddy`)
      .setVersion(`${version}`)
      .addBearerAuth()
      .build();

  app.setGlobalPrefix('api')
      .useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
      .useGlobalFilters(new AppExceptionFilter(true))

  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('swagger-ui', app, document, { jsonDocumentUrl: `api-docs` });

  await app.listen(port, () => logger.log(`Application ${version} is listening on port ${port}`));
}
bootstrap();
