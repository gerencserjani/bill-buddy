import { Module } from '@nestjs/common';
import { ChatGPTClient } from './domain/services/chat-gpt.client';
import { OPENAI_API, OPENAI_CONFIG_KEY } from './chat-gpt.constants';
import OpenAI from 'openai';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OPENAI_CONFIG from './configs/chat-gpt.options';

@Module({
    imports: [ConfigModule.forFeature(OPENAI_CONFIG)],
    providers: [
        ChatGPTClient,
        {
            provide: OPENAI_API,
            useFactory: (configs: ConfigService) => new OpenAI({ apiKey: configs.get(OPENAI_CONFIG_KEY).apiKey }),
            inject: [ConfigService],
        }
    ],
    exports: [ChatGPTClient],
})
export class ChatGPTModule {}