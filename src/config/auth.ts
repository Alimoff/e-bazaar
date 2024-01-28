import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { UserModel } from '../database/models/user';
import dotenv from 'dotenv';
import * as jwt from "jsonwebtoken";
dotenv.config();

const secret_key: any = process.env.ACCESS_TOKEN_SECRET


export async function verifyToken(req:any, res:any, next:any) {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json({message : "Unauthoirized: No token provided" });
    }

    jwt.verify(token, secret_key, (err:any, decoded:any) => {
        if(err){
            return res.status(401).json({message: "Unauthorized: Invalid token"});
        }

        req.user = decoded;
        next();
    }) 
}




