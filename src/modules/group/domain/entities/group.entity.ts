import { IGroup } from './interfaces/group.interface';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Receipt } from '../../../receipt/domain/entities/receipt.entity';

@Entity()
export class Group implements IGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'string' })
    owner: string;

    @Column({ type: 'string', array: true })
    members: string[];

    @OneToMany(() => Receipt, (receipt) => receipt.group, { cascade: ['remove'] })
    receipts: Receipt[];
}
