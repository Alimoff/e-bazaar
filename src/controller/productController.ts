import { NextFunction, Request, Response } from "express";
import { fileUpload } from "../middlewares/multer";
import { ProductModel } from "../database/models/product";
import { StatusCodes } from 'http-status-codes';
import { Category } from "../types/common";
import { CategoryModel } from "../database/models/category";

export class ProductController {
    //METHOD POST
    //Create product
    public async create (req:Request, res: Response, next: NextFunction){
        try{
        const {product, price, amount, category, description} = req.body;
        const owner = req.user;

        const isCategory = await CategoryModel.findOne({category});

        if (!isCategory){
            res.status(StatusCodes.NOT_FOUND).json({message: "Category not found"}); 
        }

        if (owner == "" || owner == undefined){
            res.status(StatusCodes.NOT_FOUND).json({message: "You have to register first to add product"});
        }

        const sameProduct = await ProductModel.findOne({product});
        const sameOwner = await ProductModel.findOne({owner});
        if(sameProduct && sameOwner){
            return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({message: "You can not add the same product twice!"});
        }

        const newProduct = new ProductModel({
            product, price, amount, category, description});

        newProduct.save();

        }catch(message){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message})
        }


    } 
}


