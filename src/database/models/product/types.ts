import {Document,ObjectId} from 'mongoose';
import { CategoryDocument } from '../category';

export interface IProduct {
    _id:ObjectId |string;
    product:string;
    price:string;
    amount?:number;
    image?:string;
    owner: ObjectId | string;
    category:CategoryDocument;
    description?:string;
}

export type ProductDocument = Document & IProduct;