import { Router } from "express";
import { CategoryController } from "../controller/categoryController";
import authenticateAuthorize from "../config/passport"

export const categoryRouter = Router();
const controller = new CategoryController();


categoryRouter.post("/category",authenticateAuthorize, controller.create);