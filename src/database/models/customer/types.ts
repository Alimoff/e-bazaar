import {Document,ObjectId, Schema} from 'mongoose';
import { IAddress } from '../address/types';
import { IProduct } from '../product';
import { IOrder } from '../order';

export interface ICustomer {
    _id:ObjectId;
    name: string;
    surname: string;
    phoneNumber?: string;
    email: string;
    password:string;
    address?: Partial<IAddress>[];
    wishlist?:Partial<IProduct>[];
    cart?: Partial<IProduct>[];
    orders?: Partial<IOrder>[];
}

export type CustomerDocument = Document & ICustomer;