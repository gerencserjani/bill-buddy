import { registerAs } from '@nestjs/config';
import { DATABASE_CONFIG_KEY } from '../app.constants';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
    DATABASE_CONFIG_KEY,
    (): TypeOrmModuleOptions => ({
        type: 'postgres',
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        autoLoadEntities: true,
        synchronize: true,
    }),
);
