import { Global, Module } from '@nestjs/common';
import { AppController } from './infrastructure/controllers/app.controller';
import { readFileSync } from 'fs';
import { APP_VERSION } from './app.constants';
import { ChatGPTModule } from '../chat-gpt/chat-gpt.module';
import { ConfigModule } from '@nestjs/config';
import { ReceiptModule } from '../receipt/receipt.module';

const version = JSON.parse(readFileSync('package.json').toString()).version;

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ChatGPTModule, ReceiptModule],
  controllers: [AppController],
  providers: [{ provide: APP_VERSION, useValue: version }],
  exports: [ChatGPTModule],
})
export class AppModule {}
