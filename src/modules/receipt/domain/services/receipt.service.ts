import { Injectable } from '@nestjs/common';
import { ChatGPTClient } from '../../../chat-gpt/domain/services/chat-gpt.client';
import { Readable } from 'stream';

@Injectable()
export class ReceiptService {
    constructor(private readonly client: ChatGPTClient) {
    }

    parseReceipt(image: Readable): Promise<unknown> {
        return this.client.processImage(
            `Get the data from the receipt according to the following interface.
            {   
                company: string;
                products: { name: string, price: number}[];
                total: number;
                date: Date; 
            }
            Provide only the object and nothing else!
            `,
            image);
    }
}