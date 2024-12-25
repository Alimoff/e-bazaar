import {Document,ObjectId} from 'mongoose';

export interface IAddress {
    street: string,
    postalCode: string,
    city: string,
    country: string, 
}

export type AddressDocument = Document & IAddress;