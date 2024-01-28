import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { ROLES } from "../types/common";

import dotenv from 'dotenv';
dotenv.config();

const secretKey: any = process.env.ACCESS_TOKEN_SECRET;


function authenticateAndAuthorize(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
  
    console.log("token: ", token);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    jwt.verify(token, secretKey, (err:any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      req.user = decoded;
 
      // Check if the user has admin privileges
    //   if (req.user !== ROLES.ADMIN ) {
    //     return res.status(403).json({ message: 'Forbidden: Admin access required' });
    //   }
  
      next();
    });

  };

  export default authenticateAndAuthorize;