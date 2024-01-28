import { Router } from "express";
import { ProductController } from "../controller/productController";
import {verifyToken} from "../config/auth";
import authenticate from "../middlewares/authenticate"

export const productRouter = Router();
const controller = new ProductController();


productRouter.post("/product", controller.create);