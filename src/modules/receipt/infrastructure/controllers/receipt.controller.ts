import { BadRequestException, Controller, Post, Req } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ReceiptService } from '../../domain/services/receipt.service';
import { ApiFile } from '../../../app/infrastructure/decorators/api-file.decorator';
import { Readable } from 'stream';

@ApiTags('receipts')
@Controller('receipts')
export class ReceiptController {
    constructor(private readonly service: ReceiptService) {}

    @Post()
    @ApiFile()
    @ApiConsumes('multipart/form-data')
    parseReceipt(@Req() req): Promise<unknown> {
        const file = req.files.file;
        if (file === undefined) {
            throw new BadRequestException('File is missing from the request!');
        }

        return this.service.parseReceipt(Readable.from(file.data));
    }
}
