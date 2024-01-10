import { IGroup } from './interfaces/group.interface';
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Receipt } from '../../../receipt/domain/entities/receipt.entity';
import { IUser } from '../../../user/domain/entities/interfaces/user.interface';
import { User } from '../../../user/domain/entities/user.entity';

@Entity()
export class Group implements IGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.ownerOf)
    @JoinColumn()
    owner: IUser;

    @ManyToMany(() => User, user => user.memberOf)
    @JoinTable()
    members: IUser[];

    @OneToMany(() => Receipt, (receipt) => receipt.group, { cascade: ['remove'] })
    receipts: Receipt[];
}
