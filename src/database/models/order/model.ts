import {model,Schema,SchemaTypes} from 'mongoose';
import { IOrder } from './types';

const orderSchema = new Schema<Partial<IOrder>>(
    {
        customerId: {
            type: String,
            required: true,
        },
        amount: {
            type:Number,
            required:true,
        },
        status: {
            type: String,
            required: true
        },
        items: [
            {
                product: {
                    type: SchemaTypes.ObjectId,
                    ref:'Product',
                    required:true,
                },
                unit: {
                    type: Number,
                    required: true,
                }
            }
        ],
        txnId: String
});

export const OrderModel = model("Order", orderSchema);
