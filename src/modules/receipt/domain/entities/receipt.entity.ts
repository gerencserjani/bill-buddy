import { IProduct } from './interfaces/product.interface';
import { IReceipt } from './interfaces/receipt.interface';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { IGroup } from '../../../group/domain/entities/interfaces/group.interface';
import { Group } from '../../../group/domain/entities/group.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity()
export class Receipt implements IReceipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'string' })
    company: string;

    @OneToMany(() => Product, (product) => product.receipt, { cascade: ['remove'] })
    products: IProduct[];

    @Column({ type: 'number' })
    total: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'number' })
    user: number;

    @OneToOne(() => Group)
    @JoinColumn()
    group?: IGroup;
}
