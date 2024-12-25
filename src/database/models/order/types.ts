import {Document,ObjectId} from 'mongoose';

export interface IOrder {
    _id:ObjectId | string;
    customerId:ObjectId | string;
    amount:number;
    status:string;
    items: [];
    txnId: string;
}

export type OrderDocument = Document & IOrder;