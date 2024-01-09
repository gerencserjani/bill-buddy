import { IReceipt } from './receipt.interface';

export interface IProduct {
    name: string;
    price: number;
    receipt: IReceipt;
}