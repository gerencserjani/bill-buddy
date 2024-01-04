import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    private static logger = new Logger(AppExceptionFilter.name);

    constructor(private readonly showUnknownErrors = true) {}

    public catch(exception: Error, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        const errorResponse = { statusCode: 500, message: undefined, error: undefined };
        switch (true) {
            case exception instanceof HttpException:
                Object.assign(errorResponse, (exception as HttpException).getResponse(), { error: exception.name });
                break;
            default:
                Object.assign(errorResponse, {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: this.showUnknownErrors ? exception.message : 'Internal server error',
                    error: exception.name,
                });
        }

        AppExceptionFilter.logger.debug(exception.stack ? exception.stack.split('/n') : exception?.message);
        response.status(errorResponse.statusCode).json(errorResponse);
    }
}
