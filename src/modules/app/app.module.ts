import { Global, Module } from '@nestjs/common';
import { AppController } from './infrastructure/controllers/app.controller';
import { readFileSync } from 'fs';
import { APP_VERSION } from './app.constants';
import { ChatGPTModule } from '../chat-gpt/chat-gpt.module';
import { ConfigModule } from '@nestjs/config';
import { ReceiptModule } from '../receipt/receipt.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const version = JSON.parse(readFileSync('package.json').toString()).version;

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot({
    type: 'postgres',
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
  }), ChatGPTModule, ReceiptModule],
  controllers: [AppController],
  providers: [{ provide: APP_VERSION, useValue: version }],
  exports: [ChatGPTModule],
})
export class AppModule {}
