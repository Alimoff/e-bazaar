import { CustomerModel, ICustomer } from "../models/customer";
import { AddressModel } from "../models/address/model";
import { IAddress } from "../models/address/types";
import { IProduct } from "../models/product";

export default class CustomerRepository {


    async createCustomer({email, password, name, surname}:any){
        try{
            const newCustomer =  new CustomerModel({
                email, password, name, surname, address:[]});
            const customerResult = await newCustomer.save();

            return customerResult;

        }catch(error){
            return error
        }
    }


    async createAddress ({_id, street, postalCode, city, country}: any){
     try{
        const  profile = await CustomerModel.findById(_id);

       if(profile){

        const newAddress = new AddressModel({
            street, postalCode, city, country
        });

        await newAddress.save();
        profile.address?.pop()
        profile.address?.push(newAddress);
       }
       return await profile?.save();
    }catch(error){
        return error;
    }
    }

    async findCustomer (email: any){
        try{
            const existingCustomer = await CustomerModel.findOne({email});

            return existingCustomer;

        }catch(error){
            return error
        }
    }

    async findCustomerById (_id: any){
        try{
            const existingCustomer = await CustomerModel.findById({_id})
            .populate('address')
            .populate('wishlist')
            // .populate('orders')
            .populate("cart.product");
            console.log(existingCustomer)
            return existingCustomer;
        }catch(error){
            return error
        }
    }

    async Wishlist(customerId: any){
        try{
            const profile = await CustomerModel.findById(customerId).populate('wishlist');

            return profile?.wishlist;
        }catch(error){
            return error;
        }
    }


    async addWishlistItems(_id:any, product:any){
        try{
            const profile = await CustomerModel.findById(_id).populate('wishlist');
            
            if(profile){
                let wishlist:any = profile.wishlist;
            
                if(wishlist?.length> 0){
                    let isExist = false;

                    wishlist.map((item:any)=>{
                        if(item._id.toString() === product._id.toString()){
                            const index = wishlist.indexOf(item);
                            wishlist.splice(index, 1);
                            isExist = true;
                        }
                    });

                    if(!isExist){
                        wishlist.push(product)
                    }else{
                    wishlist.push(product);}
                }
                wishlist.push(product);
                profile.wishlist = wishlist;
            }
            const profileResult = await profile?.save();
            return profileResult?.wishlist;
        }catch(error){
            return error;
        }
    }


    async addItemToCard(_id:string,product:any, quantity:number, isRemove:Boolean){
        try{
            const profile = await CustomerModel.findById(_id).populate('cart.product');

            if(profile){
                const cartItem = {
                    product, unit:quantity
                };

                let cartItems:any = profile.cart;

                if(cartItems?.length > 0){
                    let isExist = false;

                    cartItems.map((item:any)=>{
                        if(item.product._id.toString() === product._id.toString()){
                            if(isRemove){
                                cartItems.splice(cartItems.indexOf(item), 1);
                            }
                            item.unit = quantity;
                        }
                        isExist: true;
                    });

                    if(!isExist){
                        cartItems.push(cartItem)
                    }
                    else{
                    cartItems.push(cartItem);}
                }
                cartItems.push(cartItem);
                profile.cart = cartItems;

                const cartResultSave = await profile.save();
                return cartResultSave.cart; 

            }

        }catch(error){
            return error;
        }
    }


    async addOrderToProfile (_id:any, order:any){
        try{
            const profile = await CustomerModel.findById(_id);

            if(profile){
                if(profile.orders === undefined){
                    profile.orders = [];
                }
                profile.orders.push(order);

                profile.cart = [];

                const profileResult = profile.save();

                return profileResult;
            }
        }catch(error)
        {
            return error;
        }
    }
}

module.exports = CustomerRepository;