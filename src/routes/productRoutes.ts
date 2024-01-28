import { Router } from "express";
import { ProductController } from "../controller/productController";
import {verifyToken} from "../config/auth";
import authenticate from "../middlewares/authenticate"
import { RequireUserTypes,validate, validateIdParam } from "../middlewares/validate";
import { createProductValidation, updateProductValidation } from "../validations/schemas/product";

export const productRouter = Router();
const controller = new ProductController();
const userType = new RequireUserTypes();

productRouter.get("/product", controller.getAll);
productRouter.get("/produc/:id", validateIdParam,controller.get);
productRouter.post("/product",userType.requireSeller, validate(createProductValidation),controller.create);
productRouter.put("/product/:id",userType.requireSeller, validate(updateProductValidation),controller.update);
productRouter.delete("/product/:id",validateIdParam,userType.requireAdmin, userType.requireSeller, controller.delete);
