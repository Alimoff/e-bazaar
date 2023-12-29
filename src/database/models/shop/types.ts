import {Document,ObjectId} from 'mongoose';
import { CategoryDocument } from '../category';

export interface IShop {
    _id:ObjectId |string;
    name:string;
    logo?:string;
    description?:string;
    shop_website?:string;
    owner:ObjectId;
    category:CategoryDocument;
}

export type ProductDocument = Document & IShop;