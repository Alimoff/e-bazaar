import {model,Schema,SchemaTypes} from 'mongoose';
import { IProduct } from './types';
import { Category } from '../../../types/common';

const productSchema = new Schema<Partial<IProduct>>(
    {
    product:{
        type:String,
        required:true
            },
    price: {
        type:String,
        required:true,
            },
    quantity:{
        type:Number,
        default: 1
    },
    image:{
        type:String,
        required: true
    },
    description:{
        type:String
    },
    available: Boolean,
    category: {
        type:String,
        default: Category.OTHER
    }
    
});

export const ProductModel = model("Product",productSchema);
