import ShoppingRepository from "../database/repository/shoppingRepo";

export class ShoppingService {
    repository: ShoppingRepository;

    constructor() {
        this.repository = new ShoppingRepository();
    }

    async placeOrder(userInput: any){
        const { _id, txnId} = userInput;

        try{
            const orderResult = await this.repository.CreateNewOrder(_id, txnId); 
            return orderResult;
        }catch(error){
            return error;
        }
    }

    async getOrders (customerId: any){
        try{
            const orders: any = await this.repository.Orders(customerId);
            return orders;
        }catch(error){
            return error;
        }
    }
}