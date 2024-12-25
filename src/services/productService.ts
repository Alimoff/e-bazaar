import ProductRepository from "../database/repository/productRepo";
import { productRouter } from "../routes/productRoutes";


export class ProductService {
    repository: ProductRepository;

    constructor(){
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs: any){
        try{
            const productResult = await this.repository.CreateProduct(productInputs);
            console.log("created product: ", productResult)
            return productResult;

        }catch(error){
            return error;
        }
    } 

    async getProducts(){
        try{
            const products: any = await this.repository.Products();

            let categories:any = {};

            products.map(({type}:any) => {
                categories[type] = type;
            })
            return {products, categories: Object.keys(categories)};

        }catch(error){
            return error;
        }
    }

    async getProductDescription (productId: any){
        try{
            const product: any = await this.repository.FindById(productId);

            return product;
        }catch(error){
            return error;
        }
    }

    async getProductByCategory(category: any){
        try{
            const products = await this.repository.findByCategory(category);
            console.log("products: ",products)
            return products;
        }catch(error){
            return error;
        }
    }

    async getSelectedProducts (selectedIds: any){
        try{
            const products = await this.repository.FindSelectedProducts(selectedIds);
            
            return products;
        }catch(error){
            return error;
        }
    }

    async getProductById(productId: any){
        try{
            const product: any = await this.repository.FindById(productId);
            return product;
        }catch(error){
            return error;
        }
    }

}
