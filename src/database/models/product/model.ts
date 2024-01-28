import {model,Schema,SchemaTypes} from 'mongoose';
import { IProduct } from './types';

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
    amount:{
        type:Number,
    },
    image:{
        type:String
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    category : {
        type: SchemaTypes.ObjectId,
        ref: "Category",
        required: true,
    },
    description:{
        type:String
    },
    
});

export const ProductModel = model("Product",productSchema);
