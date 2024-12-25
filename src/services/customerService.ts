import { IAddress } from "../database/models/address/types";
import { ICustomer } from "../database/models/customer";
import CustomerRepository from "../database/repository/customerRepo"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class CustomerService {
    private repository: CustomerRepository;

    constructor(){
        this.repository  = new CustomerRepository();
    }

    async SignIn(userInputs:any){
        const {email, password} = userInputs;

        try{
            const existingCustomer:any = await this.repository.findCustomer(email);

            console.log(existingCustomer);

            if(existingCustomer){
                const validPassword:any = bcrypt.compare(password, existingCustomer.password);

                if(validPassword){
                    const token = createAccessToken({id:existingCustomer._id});

                    return {_id:existingCustomer._id, token};
                }
            }

            return null;

        }catch(error){
            return error;
        }
    }

    async SingUp(userInputs:any){
        const {email, password, name, surname} = userInputs;
        try{
         
            const checkIfCustomerExist = await this.repository.findCustomer(email);

            if(!checkIfCustomerExist){
            const hashPassword = bcrypt.hashSync(password, 12);

            const existingCustomer:any = await this.repository.createCustomer({email, password:hashPassword, name, surname});

            const accessToken = createAccessToken({ id: existingCustomer._id });
            const refreshtoken = createRefreshToken({ id: existingCustomer._id });

            existingCustomer.refreshtoken = refreshtoken;

            await existingCustomer.save();

            return {_id: existingCustomer._id, accessToken};
            }
            return "User already exist. Please Log In"

        }catch(error){
            return error;
        }
    }


    async newAddress (_id:any, userInputs:any){
        const {street, postalCode, city, country} = userInputs;

        try{
            const addressResult = await this.repository.createAddress({_id, street, postalCode, city, country});

            return addressResult;

        }catch(error){
            return error;
        }
    }

    async getProfile(_id:any){
        try{
            const existingCustomer = await this.repository.findCustomerById(_id);
            return existingCustomer;
        }catch(error){
            return error;
        }
    }

    async getShoppingDetails(_id:any){
        try{
            const existingCustomer = await this.repository.findCustomerById(_id);

            if(existingCustomer){
                return existingCustomer;
            }
            return {"msg": "Error"};
        }catch(error){
            return error;
        }
    }

    async getWishlist(customerId:any){
        try{
            const wishlistItems = await this.repository.Wishlist(customerId);

            return wishlistItems;
        }catch(error){
            return error;
        }
    }

    async addToWishlist(customerId: any, product: any){
        try{
            const wishlistResult = await this.repository.addWishlistItems(customerId, product);
            
            return wishlistResult;
        }catch(error){
            return error;
        }
    }

    async manageCart (customerId:any, product:any,quantity:any, isRemove:boolean){
        try{
            const cartResult = await this.repository.addItemToCard(customerId, product, quantity, isRemove);
            return cartResult;
        }catch(error){
            return error;
        }
    }

    async mangeOrder({customerId, order}: any) {
        try{
            const orderResult = await this.repository.addOrderToProfile(customerId, order);

            return orderResult;
        }catch(error){
            return error;
        }
    }

}


const createAccessToken = (user: any): string => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '30d' })
  }
  const createRefreshToken = (user: any): string => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' })
  } 


//   module.exports = CustomerService;