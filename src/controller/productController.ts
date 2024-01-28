import { NextFunction, Request, Response } from "express";
import { fileUpload } from "../middlewares/multer";
import { ProductModel } from "../database/models/product";
import { StatusCodes } from 'http-status-codes';
import { CategoryModel } from "../database/models/category";
import { UserModel } from "../database/models/user";
import { checkAuthorized } from "../config/auth"; 

import { Types } from 'mongoose';
import { ROLES } from "../types/common";

export class ProductController {
    // METHOD POST Create product
    public async create(req: Request, res: Response, user: any) {
        try {
             //Function to check if user is authorized
             checkAuthorized(req,res);
            
            const { product, price, amount,image, category, description } = req.body;

            const owner = await checkAuthorized(req, res);

            // Lookup the ObjectId for the category using the category name
            const categoryObj = await CategoryModel.findOne({ name: category }).select('_id');
            if (!categoryObj) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" });
            }
            // Check if the same product already exists for the owner
            const sameProduct = await ProductModel.findOne({ product, owner});

            if (sameProduct) {
                return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ message: "You cannot add the same product twice!" });
            }

            // Create a new product with the owner and category information
            const newProduct = new ProductModel({
                product, price, amount,image, category: categoryObj._id, description, owner
            });

            await newProduct.save();

            return res.status(StatusCodes.OK).json({ message: newProduct });
        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }
}
