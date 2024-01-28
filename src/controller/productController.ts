import { NextFunction, Request, Response } from "express";
import { fileUpload } from "../middlewares/multer";
import { ProductModel } from "../database/models/product";
import { StatusCodes } from 'http-status-codes';
import { CategoryModel } from "../database/models/category";
import { UserModel } from "../database/models/user";

import { Types } from 'mongoose';
import { ROLES } from "../types/common";

export class ProductController {
    // METHOD POST Create product
    public async create(req: Request, res: Response, user: any) {
        try {
            const { product, price, amount, category, description } = req.body;

            const owner = req.user;
        
            // Lookup the ObjectId for the owner using the username
            const isOwner = await UserModel.findOne({ owner}).select('_id');
            if (!isOwner) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Owner not found" });
            }

            // Lookup the ObjectId for the category using the category name
            const categoryObj = await CategoryModel.findOne({ name: category }).select('_id');
            if (!categoryObj) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" });
            }

            // Check if the same product already exists for the owner
            const sameProduct = await ProductModel.findOne({ product, isOwner });

            if (sameProduct) {
                return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ message: "You cannot add the same product twice!" });
            }

            // Create a new product with the owner and category information
            const newProduct = new ProductModel({
                product, price, amount, category: categoryObj._id, description, owner: isOwner._id
            });

            await newProduct.save();

            return res.status(StatusCodes.OK).json({ message: newProduct });
        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }
}
