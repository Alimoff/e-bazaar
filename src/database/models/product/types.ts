import {Document,ObjectId} from 'mongoose';
import { Category  } from '../../../types/common';

export interface IProduct {
    _id:ObjectId |string;
    product:string;
    price:string;
    quantity:number;
    image:string;
    description?:string;
    available: Boolean;
    category: Category;
}

export type ProductDocument = Document & IProduct;