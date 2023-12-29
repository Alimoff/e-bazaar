import {Document,ObjectId} from 'mongoose';
import { ROLES } from '../../../types/common'; 

export interface IUser {
    _id:ObjectId |string;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    password:string;
    role: ROLES;
}

export type UserDocument = Document & IUser;