import {model,Schema,SchemaTypes} from 'mongoose';
import { IShop } from './types';

const shopSchema = new Schema<Partial<IShop>>(
    {
        name:{
            type: String,
            required: true,
        },
        logo:{
            type: Buffer,
            contentType: String,
            enum: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
        },
        description:{
            type: String,
        },
        shop_website:{
            type: String,
            unique: true,
        },
        owner: {
            type: SchemaTypes.ObjectId,
            ref: "User",
        },
        category : {
            type: SchemaTypes.ObjectId,
            ref: "Category",
            required: true,
        },
    });

export const ShopModel = model("Shop",shopSchema);
