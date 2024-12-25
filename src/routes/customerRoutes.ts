import { Router } from "express";
import { RequireUserTypes,validate, validateIdParam } from "../middlewares/validate";
import {CustomerService} from "../services/customerService";
import { checkAuthorized } from "../config/auth";
import { ICustomer } from "../database/models/customer";

const authenticatedUser = new RequireUserTypes();
export const customerRouter = Router();
const service = new CustomerService();
const checkAuth = authenticatedUser.requireUser;

customerRouter.post("/customer/signup", async(req, res, next) =>{
    try{
        const { email, password, name, surname} = req.body;
        const data = await service.SingUp({email, password, name, surname});

        return res.status(200).json({data});
    
    }catch(error){
        next(error);
    }
});

customerRouter.post("/customer/login", async(req, res, next)=>{
    try{
        const {email, password} = req.body;

        const data = await service.SignIn({email, password});
        return res.status(200).json(data);
    }catch(error){
        next(error);
    }
})

customerRouter.post("/customer/address",checkAuth, async(req, res, next)=>{
    try{
        const _id = await checkAuthorized(req, res);

        const {street, postalCode, city, country} = req.body;

        const data: any = await service.newAddress(_id,{street, postalCode, city, country}) 
        return res.json(data);

    }catch(error){
        next(error);
    }
})

customerRouter.get("/customer/profile",checkAuth, async(req, res, next)=>{
    try{
        const _id = await checkAuthorized(req, res);

        const data = await service.getProfile(_id);
        return res.json(data);
    }catch(error){
        next(error);
    }
})

customerRouter.get("/customer/shopping-details",checkAuth, async(req, res, next)=>{
    try{
        const _id = await checkAuthorized(req, res);
        const data = await service.getShoppingDetails(_id);

        return res.json(data);
    }catch(error){
        next(error);
    }
})



customerRouter.get("/customer/wishlist",checkAuth, async(req, res, next)=>{
    try{
        const _id = await checkAuthorized(req, res);
        const data = await service.getWishlist({_id});

        return res.json(data);
    }catch(error){
        next(error)
    }
})