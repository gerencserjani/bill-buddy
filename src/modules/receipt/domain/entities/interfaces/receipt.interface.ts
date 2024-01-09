import { IProduct } from './product.interface';
import { IGroup } from '../../../../group/domain/entities/interfaces/group.interface';

export interface IReceipt {
    id: number;
    company: string;
    products: IProduct[];
    total: number;
    date: Date;
    user: number;
    group?: IGroup;
}