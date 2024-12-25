import { ShoppingService } from "../services/shoppingService";
import { CustomerService } from "../services/customerService";
import { checkAuthorized } from "../config/auth";
import { Router } from "express";
import { RequireUserTypes } from "../middlewares/validate";

const userType = new RequireUserTypes();
const checkAuth = userType.requireUser;
export const shoppingRouter = Router();
const service = new ShoppingService();
const customerService = new CustomerService();


shoppingRouter.post("/shopping/order", checkAuth, async(req, res, next) => {
    const _id = await checkAuthorized(req, res);

    try{
        const data = await service.placeOrder({_id});
        return res.status(200).json(data);

    }catch(error){
        next(error);
    }
})

shoppingRouter.get("/shopping/orders", checkAuth, async(req, res, next) => {
    const _id = await checkAuthorized(req, res);

    try{
        const data = await customerService.getShoppingDetails(_id);
        return res.status(200).json(data);
    }catch(error){
        next(error);
    }
})

shoppingRouter.get("/shopping/cart", checkAuth, async(req, res, next) => {
    const _id = await checkAuthorized(req, res);
    
    try{
        const data = await customerService.getShoppingDetails(_id);
        return res.status(200).json(data);
    }catch(error){
        next(error);
    }
})