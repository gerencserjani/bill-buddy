import { Inject, Injectable } from '@nestjs/common';
import { OPENAI_API } from '../../chat-gpt.constants';
import OpenAI from 'openai';
import { Readable } from 'stream';
import { StreamUtil } from '../../../../utils/stream.util';
import { APIPromise } from 'openai/core';
import { ChatCompletion } from 'openai/src/resources/chat/completions';

@Injectable()
export class ChatGPTClient {
    constructor(@Inject(OPENAI_API) private readonly client: OpenAI) {}

    async processImage(message: string, image: Readable): Promise<APIPromise<ChatCompletion>> {
        const base64 = await StreamUtil.toString(image, 'base64');
        return this.client.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: message,
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: `data:image/jpeg;base64, ${base64}`,
                            },
                        },
                    ],
                },
            ],
            model: 'gpt-4-vision-preview',
            max_tokens: 600,
        });
    }
}
