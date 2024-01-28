import { ExtractJwt } from "passport-jwt";
import { getSeconds } from "../utils/getSeconds";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const JWTConfig = {
  TTL: getSeconds(process.env.ACCESS_TOKEN_SECRET), // 15min
  TTL2: getSeconds(process.env.REFRESH_TOKEN_SECRET), // 7days
  Options: {
    audience: "example.com",
    issuer: "api.example.com",
    secretOrKey: process.env.SECRET_KEY  || "123",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
} as const;

export default JWTConfig;

export function verify(token: string, ACCESS_TOKEN_SECRET: string | undefined) {
  throw new Error("Function not implemented.");
}


export async function checkAuthorized(req:Request, res: Response){
            //To get accessToken if user is authorized
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                // Handle case where no access token is present
                return res.status(401).json({ error: 'Unauthorized - Missing token' });}

            const token = authorizationHeader.split(' ')[1];
              //Get user._id from accessToken
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string };
            const authorizedUser = decodedToken.id;

            return authorizedUser;
}