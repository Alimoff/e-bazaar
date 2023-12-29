import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { Category } from "../types/common";
import { CategoryModel } from "../database/models/category";

export class CatergoryController {
    //METHOD POST
    //Create product
    public async create (req:Request, res: Response, next: NextFunction){
        try{
        const { name,type } = req.body;

        const isTypeExist = await CategoryModel.find({type});

        if (!isTypeExist){
            res.status(StatusCodes.NOT_FOUND).json({message: "Category does not exist"}); 
        }


        const newCategory = new CategoryModel({
           name, type});

        newCategory.save();

        }catch(message){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message})
        }


    } 
}

