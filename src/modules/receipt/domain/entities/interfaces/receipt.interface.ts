import { IProduct } from './product.interface';
import { IGroup } from '../../../../group/domain/entities/interfaces/group.interface';
import { IUser } from '../../../../user/domain/entities/interfaces/user.interface';

export interface IReceipt {
    id: number;
    company: string;
    products: IProduct[];
    total: number;
    date: Date;
    owner: IUser;
    group?: IGroup;
}
