import { Global, Module } from '@nestjs/common';
import { AppController } from './infrastructure/controllers/app.controller';
import { readFileSync } from 'fs';
import { APP_VERSION, DATABASE_CONFIG_KEY } from './app.constants';
import { ChatGPTModule } from '../chat-gpt/chat-gpt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReceiptModule } from '../receipt/receipt.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from './configs/database.config';

const version = JSON.parse(readFileSync('package.json').toString()).version;

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
        TypeOrmModule.forRootAsync({
            useFactory: (configs: ConfigService) => configs.get<TypeOrmModuleOptions>(DATABASE_CONFIG_KEY),
            inject: [ConfigService],
        }),
        ChatGPTModule,
        ReceiptModule,
    ],
    controllers: [AppController],
    providers: [{ provide: APP_VERSION, useValue: version }],
    exports: [ChatGPTModule],
})
export class AppModule {}
