import {model,Schema,SchemaTypes} from 'mongoose';
import { ICustomer } from './types';

const customerSchema = new Schema<Partial<ICustomer>>(
    {
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    phoneNumber: {
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    address: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Address',
            required: true 
        }],
    cart:[
        {
            product:{
                type:SchemaTypes.ObjectId,
                ref:"Product",
                required:true,
            },
            unit: {
                type:Number,
                required:true
            }
        }
    ],
    wishlist:[
        {
            type:SchemaTypes.ObjectId,
            ref: 'Product',
            required: true,
        }
    ],
    orders: [
        {
            type: SchemaTypes.ObjectId,
            ref:"Order",
            require: true
        }
    ]

});

export const CustomerModel = model("Customer",customerSchema);
