import { registerAs } from '@nestjs/config';
import { OPENAI_CONFIG_KEY } from '../chat-gpt.constants';
import { ClientOptions as OpenAIApiOptions } from 'openai/src';

export default registerAs(
    OPENAI_CONFIG_KEY,
    (): OpenAIApiOptions => ({
        apiKey: process.env.OPENAI_API_KEY,
    }),
);