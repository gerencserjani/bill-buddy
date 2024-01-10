import { IGroup } from '../../../../group/domain/entities/interfaces/group.interface';
import { IReceipt } from '../../../../receipt/domain/entities/interfaces/receipt.interface';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    receipts: IReceipt[];
    memberOf: IGroup[];
    ownerOf: IGroup[];
}
