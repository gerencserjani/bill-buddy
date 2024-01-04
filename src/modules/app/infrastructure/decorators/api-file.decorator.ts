import { ApiBody } from '@nestjs/swagger';

export const ApiFile = (name: string = 'file'): MethodDecorator => (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
) => {
    ApiBody({
        schema: {
            type: 'object',
            properties: {
                [name]: {
                    type: 'string',
                    format: 'binary',
                    required: [name],
                },
            },
        },
    })(target, propertyKey, descriptor);
};