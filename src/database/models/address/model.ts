import {model,Schema,SchemaTypes} from 'mongoose';
import { IAddress } from './types';

const addressSchema = new Schema<Partial<IAddress>>(
    {
        street: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        }
    });

export const AddressModel = model("Address", addressSchema);
