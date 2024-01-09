import { IUser } from './interfaces/user.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'string' })
    firstName: string;

    @Column({ type: 'string' })
    lastName: string;

    @Column({ type: 'string', unique: true  })
    email: string;

    @Column({ type: 'string', unique: true, update: false })
    username: string;

    @Column({ type: 'string' })
    password: string;
}