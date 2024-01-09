import { Controller, Get, Inject } from '@nestjs/common';
import { APP_VERSION } from '../../app.constants';

@Controller()
export class AppController {
    constructor(@Inject(APP_VERSION) private readonly version: string) {}

    @Get('version')
    getVersion(): { version: string } {
        return { version: this.version };
    }
}
