import {model,Schema,SchemaTypes} from 'mongoose';
import { ROLES } from '../../../types/common';
import { IUser } from './types';

const userSchema = new Schema<Partial<IUser>>(
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
        required:true,
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
    role:{
        type:String,
        enum:[ROLES.SUPERADMIN,ROLES.ADMIN,ROLES.SELLER,ROLES.USER],
        default:ROLES.USER,
    },
});

export const UserModel = model("User",userSchema);
