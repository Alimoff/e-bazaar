import { Router } from "express";
import { ProductController } from "../controller/productController";

export const productRouter = Router();
const controller = new ProductController();


productRouter.post("/product", controller.create);