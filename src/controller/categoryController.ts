import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { Category } from "../types/common";
import { CategoryModel } from "../database/models/category";
import { checkAuthorized } from "../config/auth";

export class CategoryController {
    //METHOD POST
    //Create product
    public async create (req:Request, res: Response, next: NextFunction){
        try{
            //Function to check if user is authorized
            checkAuthorized(req,res);

        const { name, description} = req.body;

        const isExist = await CategoryModel.find({name});

        if (isExist || name in Category){
            res.status(StatusCodes.BAD_REQUEST).json({message: "Category already exists"}); 
        }else{

        const newCategory = new CategoryModel({
           name, description});

        newCategory.save();
        }
        return res.status(StatusCodes.OK).json({message: "Category successfully created!"});
        }catch(message){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message})
        }

    } 


    //METHOD PUT
    public async update (req: Request, res: Response, next: NextFunction) {
        try {
            //Function to check if user is authorized
            checkAuthorized(req,res);

            const id = req.params;
            const { name, description } = req.body;

            if(!name){
                res.status(StatusCodes.NOT_FOUND).json({message: "Category is not found!"});
            }

            const category = await CategoryModel.findOneAndUpdate({_id:id},
                {name,description}
                )
 
            category?.save();

            res.status(StatusCodes.OK).json({message: "Category deleted successfully!"});
        }
        catch(error){
            res.status(StatusCodes.BAD_REQUEST).json({message: "An error occured"});
        }
    }

       //METHOD DELETE
       public async delete (req: Request, res: Response, next: NextFunction) {
        try {
            //Function to check if user is authorized
             checkAuthorized(req,res);

            const id = req.params;
            const category = await CategoryModel.findOneAndDelete({_id:id})
 
            category?.save();

            res.status(StatusCodes.OK).json({message: "Category deleted successfully!"});
        }
        catch(error){
            res.status(StatusCodes.BAD_REQUEST).json({message: "An error occured"});
        }
    }

    public async getAll (req:Request, res: Response, next: NextFunction) {
        try{
            const categories = CategoryModel.find();

            if(categories === null){
                return res.status(StatusCodes.NOT_FOUND).json({message: "No categories in DB"});
            }

            return res.status(StatusCodes.OK).json({message: "Success"});
        }
        catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "An error occured"});
        }

    }

    public async get (req:Request, res: Response, next: NextFunction) {
        try{

            checkAuthorized(req,res);

            const id = req.body._id;

            const categories = CategoryModel.findOne({_id: id});

            if(categories === null){
                return res.status(StatusCodes.NOT_FOUND).json({message: "No such category in DB"});
            }

            return res.status(StatusCodes.OK).json({message: "Success"});
        }
        catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "An error occured"});
        }

    }
}

