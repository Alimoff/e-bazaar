import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../database/models/user';
import nodemailer from 'nodemailer'
import { StatusCodes } from 'http-status-codes';
import {decode} from "jsonwebtoken";
import CreateHttpError from "http-errors"
import { changeResponse } from '../utils/changeResponse';
import { ROLES } from '../types/common';


var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ebazaaralimov@gmail.com",
    pass: "Alimoff1234",
  },
});

transport.verify(function (error, success){
  if(error){
    console.log(error);
  }else{
    console.log("Server is ready to take our messages");
  }
})


export const sendOtp = (otpText: string, phone: string) =>{
  var mailOptions = {
    from: '"e-bazaar team" <sobiriddin@gmail.com>',
    to: phone,
    subject: "e-bazaar authorization",
    html: `<b>Добрый день! </b><br> Вот ваш OTP-код для аутентификации в приложении FITME:<br><b>${otpText}</b><br>С уважением, команда e-bazaar`,
  };

  transport.sendMail(mailOptions);
}

export class AuthController {
  //METHOD POST
  // Create user
  public async signup(req: Request, res: Response, next: NextFunction) {
    try{
      const {name, surname, phoneNumber, email, password,role} = req.body
    
      if ([ROLES.ADMIN, ROLES.SUPERADMIN].includes(role)){
        return res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid role for signup"});
      }

      let findUser:any = await UserModel.findOne({phoneNumber:phoneNumber})

      if (!findUser) {
        findUser = await UserModel.findOne({phoneNumber:email});
      }

      if(findUser) {
        throw CreateHttpError(
          StatusCodes.BAD_REQUEST,
          `User with ${phoneNumber} already signed up`
        );
      }


      const hashPassword = bcrypt.hashSync(password, 12);
      const newUser = new UserModel({
        name,surname,phoneNumber,email,password:hashPassword,role});

        await newUser.save();

        const accessToken = createAccessToken({ id: newUser._id});
        const refreshToken = createRefreshToken({id:newUser._id});

        res.cookie('refreshtoken', refreshToken, {
          httpOnly: true,
          path: 'user/refresh_token',
          maxAge: 7*24*60*60*1000,
        })

      res.status(StatusCodes.OK).json({name, surname, email, phoneNumber,role, accessToken});
    }catch (message){
      return res.status(StatusCodes.BAD_REQUEST).json({msg: message})
    }
  } 

  //METHOD POST
  //Sign in 
  public async signin(req:Request, res: Response, next: NextFunction){
    try{
      const {email, password} = req.body;
      console.log(req.body);
      let findUser: any = await UserModel.findOne({email});

      if(!findUser){
        throw CreateHttpError(
          StatusCodes.NOT_FOUND,
          `${email} has not signed up!`
        );
      }

      const isMatch = bcrypt.compare(password, findUser.password);

      if(!isMatch) return res.status(StatusCodes.NOT_FOUND).json({msg: "Incorrect password"});

    const accessToken = createAccessToken({ id: findUser._id })
    const refreshtoken = createRefreshToken({ id: findUser._id })

    res.cookie('refreshtoken', refreshtoken, {
      httpOnly: true,
      path: '/user/refresh_token',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    findUser.refreshtoken = refreshtoken;
    await findUser.save();

    res.json({ accessToken, findUser });
    //@ts-ignore
    }catch(message){
      res.status(StatusCodes.BAD_REQUEST).json({accessToken: null})
    }
  }

public async signout (req:Request, res: Response, next: NextFunction){
  try{
  const {email} = req.body;

  let user: any = await UserModel.findOne({email});


  if (!user){
    user = await UserModel.findOne({email});
  }

  if(!user){
    res.status(StatusCodes.NOT_FOUND).json({msg:"User not found"});
  }else{
    res.clearCookie('refreshtoken',{path: '/user/refresh_token'});  
  }

  user.refreshtoken = null;
  await user.save();

  return res.status(StatusCodes.OK).json({msg: "Logged out"});
}catch(message){
  return res.status(StatusCodes.BAD_REQUEST).json({msg: "Internal server error"});
}

}

public async createAdmin (req:Request, res:Response){
    try{
      const {name, surname, phoneNumber, email, password,role} = req.body
    
      if (![ROLES.ADMIN, ROLES.SUPERADMIN].includes(role)){
        return res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid role for signup admin or superadmin"});
      }

      let findUser:any = await UserModel.findOne({phoneNumber:phoneNumber})

      if (!findUser) {
        findUser = await UserModel.findOne({phoneNumber:email});
      }

      if(findUser) {
        throw CreateHttpError(
          StatusCodes.BAD_REQUEST,
          `User with ${phoneNumber} already signed up`
        );
      }

      const hashPassword = bcrypt.hashSync(password, 12);
      const newUser = new UserModel({
        name,surname,phoneNumber,email,password:hashPassword,role});

        await newUser.save();

        const accessToken = createAccessToken({ id: newUser._id});
        const refreshToken = createRefreshToken({id:newUser._id});

        res.cookie('refreshtoken', refreshToken, {
          httpOnly: true,
          path: 'user/refresh_token',
          maxAge: 7*24*60*60*1000,
        })

      res.status(StatusCodes.OK).json({name, surname, email, phoneNumber,role, accessToken});
    }catch (message){
      return res.status(StatusCodes.BAD_REQUEST).json({msg: message})
    }
  }

  public async getAllUsers (req: Request, res: Response){
    try{
    const allUsers = await UserModel.find();

    res.status(StatusCodes.OK).json({allUsers});

    }catch(message){
      res.status(StatusCodes.BAD_REQUEST).json({message:"Internal server error"})
    }

  }
}



const createAccessToken = (user: any): string => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '10m' })
}
const createRefreshToken = (user: any): string => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' })
} 