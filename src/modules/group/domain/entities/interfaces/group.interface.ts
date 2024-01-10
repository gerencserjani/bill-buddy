import { IUser } from '../../../../user/domain/entities/interfaces/user.interface';

export interface IGroup {
    id: number;
    owner: IUser;
    members: IUser[];
}
