import { Router } from "express";
import { RequireUserTypes,validate, validateIdParam } from "../middlewares/validate";
import { createProductValidation, updateProductValidation } from "../validations/schemas/product";
import { ProductService } from "../services/productService";
import { CustomerService } from "../services/customerService";
import { checkAuthorized } from "../config/auth";
import { Category } from "../types/common";
import { fileUpload} from "../middlewares/multer";

export const productRouter = Router();
const userType = new RequireUserTypes();
const checkAuth = userType.requireUser;
const service = new ProductService();
const wishlistService = new CustomerService();

productRouter.post("/product/create", fileUpload('static'), async(req, res, next) => {
    try{
        let imagee = ""
        if (req.file) imagee = `${req.file.filename}`; 
        const {product, price, quantity, image=imagee, description} = req.body;
        const data = await service.CreateProduct({product, price, quantity, image, description, available:true});
        
        return res.status(201).json(data);
    }catch(error){
        next(error);
    }
})

productRouter.get('/category/:type', async(req, res, next)=> {
    const type = req.params.type;
    console.log("type: ",type)

    try{
        const data = await service.getProductByCategory(type);
        console.log("data: ", data)
        return res.status(200).json(data);
    }catch(error){
        next(error);
    }
});

productRouter.get("/product/:id", async(req, res,next)=>{
    const productId = req.params.id;


    try{
        const data = await service.getProductById(productId);
        return res.status(200).json(data);
    }catch(error){
        next(error);
    }
})
productRouter.post("/ids", async(req ,res, next) => {
    try{
        const {ids} = req.body.ids;
        const products = await service.getSelectedProducts(ids);
        return res.status(200).json(products);
    }catch(error){
        next(error)
    }
})

productRouter.get("/wishlist", checkAuth, async(req,res,next) => {
    const customerId = await checkAuthorized(req, res)
    const wishlist = await wishlistService.getWishlist(customerId)
    return res.status(200).json(wishlist);
})

productRouter.put("/wishlist", checkAuth, async(req, res, next) => {
    const _id = await checkAuthorized(req, res);
    const productId = req.body;
    try{
        const product = await service.getProductById(productId);
        const wishlist = await wishlistService.addToWishlist(_id, product);
        return res.status(200).json(wishlist);
    }catch(error){
        next(error);
    }
})

productRouter.delete("/wishlist/:id", checkAuth, async(req, res, next) => {
    const _id = await checkAuthorized(req, res);
    const productId = req.params.productId;

    try{
        const product = await service.getProductById(productId);
        const wishlist = await wishlistService.addToWishlist(_id, product);
        return res.status(200).json(wishlist);
    }catch(error){
        next(error);
    }
})

productRouter.put("/cart", checkAuth, async(req, res, next) => {
    const {productId, quantity} = req.body;

    const userId = await checkAuthorized(req, res);
    try{
        const product = await service.getProductById(productId);
        const result = await wishlistService.manageCart(userId, product, quantity, false);
        return res.status(200).json(result);
    }catch(error){
        next(error);
    }
})
productRouter.delete('/cart/:id', checkAuth, async(req, res, next) => {
    const _id = await checkAuthorized(req, res);

    try{
        const product = await service.getProductById(req.params.id);
        const result = await wishlistService.manageCart(_id, product, 0, true);
        return res.status(200).json(result);
    }catch(error){
        next(error);
    }
})

productRouter.get("/", async(req ,res, next) => {
    try{
        const data = await service.getProducts();
        return res.status(200).json(data);
    }catch(error){
        next(error);
    }
} )




