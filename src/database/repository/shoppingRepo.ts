import { CustomerModel } from "../models/customer";
import { OrderModel } from "../models/order";
import { v4 } from "uuid";

export default class ShoppingRepository {
    
    async Orders(customerId:any){
        try{
            const orders = await OrderModel.find(customerId).populate('items.product');

            return orders;

        }catch(error){
            return error;
        }
    }

    async CreateNewOrder (customerId:any, txnId:any ){
        try{
            const profile = await CustomerModel.findById(customerId).populate('cart.product');
            console.log(profile);

            if(profile){
                let amount = 0;

                let cartItems:any = profile.cart;

                // if(cartItems?.length > 0){
                    cartItems.map((item:any) => {
                        amount += parseInt(item.product.price) * parseInt(item.unit);
                    });

                    const orderId = v4();

                    const order = new OrderModel ({
                        _id:orderId,
                        amount,
                        status: 'received',
                        items:cartItems,
                    });

                    profile.cart = [];

                    const newOrder:any = order.populate('items.product')

                    newOrder.execPopulate();

                    const orderResult = await newOrder.save();

                    return orderResult
                // }

            }
        }catch(error){
            return error;
        }
    }
}

module.exports = ShoppingRepository;