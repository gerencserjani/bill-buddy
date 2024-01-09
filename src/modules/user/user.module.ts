import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { UserController } from './infrastructure/controllers/user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ User ])],
    controllers: [UserController],
})
export class UserModule {}