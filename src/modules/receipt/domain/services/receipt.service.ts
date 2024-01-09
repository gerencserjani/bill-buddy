import { Injectable } from '@nestjs/common';
import { ChatGPTClient } from '../../../chat-gpt/domain/services/chat-gpt.client';
import { Readable } from 'stream';

@Injectable()
export class ReceiptService {
    constructor(private readonly client: ChatGPTClient) {
    }

    async parseReceipt(image: Readable): Promise<unknown> {
        const response = await this.client.processImage(
            `Get the data from the receipt according to the following interface.
            {   
                company: string;
                products: { name: string, price: number}[];
                total: number;
                date: Date; 
            }
            Rules:
                - Do not process empty or rows that do not contain money symbol like "Ft"
                - Do not process rows with name starting as a number
                - Response must be a json object! 
            `,
            image);
        return JSON.parse(response.choices[0].message.content.split("```json")[1].split("```")[0])
    }
}