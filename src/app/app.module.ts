import { Module } from '@nestjs/common';
import { AppController } from './infrastructure/controllers/app.controller';
import { AppService } from './domain/services/app.service';
import { readFileSync } from 'fs';
import { APP_VERSION } from './app.constants';

const version = JSON.parse(readFileSync('package.json').toString()).version;

@Module({
  imports: [],
  controllers: [AppController],
  providers: [{ provide: APP_VERSION, useValue: version }, AppService],
})
export class AppModule {}
