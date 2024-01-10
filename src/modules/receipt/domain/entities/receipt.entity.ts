import { IProduct } from './interfaces/product.interface';
import { IReceipt } from './interfaces/receipt.interface';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { IGroup } from '../../../group/domain/entities/interfaces/group.interface';
import { Group } from '../../../group/domain/entities/group.entity';
import { IUser } from '../../../user/domain/entities/interfaces/user.interface';
import { User } from '../../../user/domain/entities/user.entity';

@Entity()
export class Receipt implements IReceipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    company: string;

    @Column({ type: 'jsonb' })
    products: IProduct[];

    @Column({ type: 'float' })
    total: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @ManyToOne(() => User, user => user.receipts)
    owner: IUser;

    @OneToOne(() => Group)
    @JoinColumn()
    group?: IGroup;
}
