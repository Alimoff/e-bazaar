import { IProduct } from "../models/product";
import { ProductModel } from "../models/product";


export default class ProductRepository {
    async CreateProduct({
        product,
        price,
        quantity,
        image,
        description,
        available,
        category
    }:IProduct)
    {
        try{
            let image = "";
            const newProduct = new ProductModel({
                product,
                price,
                quantity,
                image,
                description,
                available,  
                category
            });
            const productResult = await newProduct.save();

            return productResult;
        }catch(error){
            return error;
        }
    }

    async Products (){
        try{
            return await ProductModel.find();
        }catch(error){
            return error;
        }
    }

    async FindById(_id:string){
        try{
            return await ProductModel.findById(_id); 
        }catch(error){
            return error;
        }
    }

    async findByCategory (category: string){
        try{
            const products = await ProductModel.find({category});
            return products;

        }catch(error){
            return error;
        } 
    }

    async FindSelectedProducts (selectedIds: any){
        try{
            const products = await ProductModel.find()
            .where("_id")
            .in(selectedIds.map((_id:any)=> _id))
            .exec();

            return products;
        }catch(error){
            return error;
        }
    }

}

module.exports = ProductRepository;
