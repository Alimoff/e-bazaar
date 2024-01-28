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

    //METHOD PUT
    //Update specific product by their ID
    public async update(req: Request, res: Response, next: NextFunction){
        try{
            //Function to check if user is authorized
            checkAuthorized(req,res);
            
            const id = req.params;
            const { product, price, amount,image, category, description } = req.body;

            const owner = checkAuthorized(req, res);

            const sameUser = await ProductModel.findOne({owner});
            const isProductExist = await ProductModel.findById({_id: id});

            if(isProductExist && sameUser){
            const updatedProduct = await ProductModel.findOneAndUpdate({_id: id}, {
                product, price, amount, image, category, description
            });

            await updatedProduct?.save();

            return res.status(StatusCodes.OK).json({message: updatedProduct});
            }else{
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Product ${product} did not found or only owner ${owner} can update the product!` });
            }
        }
        catch(error){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }

    //METHOD DELETE
    //To delete specific product by their ID
    public async delete(req: Request, res: Response, next: NextFunction){
        try{
              //Function to check if user is authorized
              checkAuthorized(req,res);

              const id = req.params;
              const user = checkAuthorized(req, res);

              const findProduct= await ProductModel.findById({_id: id})
              const checkUser:any =  findProduct?.owner;

              if( checkUser == user ){
                const deletedProduct = await ProductModel.findByIdAndDelete({_id: id});
                await deletedProduct?.save();

                return res.status(StatusCodes.OK).json({message: `Product ${findProduct?.product} dfeleted successfully!`});
              }else{
                return res.status(StatusCodes.NOT_FOUND).json({message: `Product ${findProduct?.product} not found!`});
              }

        }catch(error){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }

    //METHOD GET - To get all products exist!
    public async getAll(req:Request, res: Response, next: NextFunction){
        try{
            //Function to check if user is authorized
            checkAuthorized(req,res);

            const products = await ProductModel.find();

            return res.status(StatusCodes.OK).json({mdssage: products});

        }catch(error){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }

    //METHOD GET - To get a product by their ID
    public async get(req:Request, res: Response, next: NextFunction){
        try{
            //Function to check if user is authorized
            checkAuthorized(req,res);

            const id = req.params._id;
            const product = await ProductModel.findById({_id: id});

            return res.status(StatusCodes.OK).json({mdssage: product});

        }catch(error){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }
}
