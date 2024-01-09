import { Column, Entity, ManyToOne } from 'typeorm';
import { IProduct } from './interfaces/product.interface';
import { IReceipt } from './interfaces/receipt.interface';
import { Receipt } from './receipt.entity';

@Entity()
export class Product implements IProduct {
    @Column({ type: 'string' })
    name: string;

    @Column({ type: 'number' })
    price: number;

    @ManyToOne(() => Receipt, receipt => receipt.products)
    receipt: IReceipt;
}