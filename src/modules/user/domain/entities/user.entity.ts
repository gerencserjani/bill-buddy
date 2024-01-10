import { IGroup } from 'src/modules/group/domain/entities/interfaces/group.interface';
import { IUser } from './interfaces/user.interface';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Group } from '../../../group/domain/entities/group.entity';
import { IReceipt } from '../../../receipt/domain/entities/interfaces/receipt.interface';
import { Receipt } from '../../../receipt/domain/entities/receipt.entity';

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    firstName: string;

    @Column({ type: 'text' })
    lastName: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'text', unique: true, update: false })
    username: string;

    @Column({ type: 'text' })
    password: string;

    @OneToMany(() => Receipt, (receipt) => receipt.owner, { cascade: ['remove'] })
    receipts: IReceipt[];

    @ManyToMany(() => Group, (group) => group.members)
    @JoinColumn()
    memberOf: IGroup[];

    @OneToMany(() => Group, group => group.owner, { cascade: ['remove'] })
    @JoinColumn()
    ownerOf: IGroup[];
}
