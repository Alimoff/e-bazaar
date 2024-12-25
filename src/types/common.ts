import { Request,Response,NextFunction } from "express";

export type Handler = (
    request:Request,
    response:Response,
    next:NextFunction
) => Promise<void>;

export enum ROLES {
    USER = "USER",
    SELLER = "SELLER",
    ADMIN = "ADMIN",
    SUPERADMIN = "SUPERADMIN",
}

export enum GENDER {
    MALE = "MALE",
    FEMALE = "FEMALE",
    ALL = "ALL",
}


export enum Category {
    ELECTRONICS = 'electronics',
    CLOTHES = 'clothes',
    FURNITURE_AND_DECOR = 'furniture_and_decor',
    HEALTH = 'health',
    COSMETICS = 'cosmetics',
    FOOD_AND_BEVERAGE = 'food_and_beverage',
    HOUSEHOLD_ITEMS = 'household_items',
    OFFICE_EQUIPMENT = 'office_equipment',
    OTHER = 'other'
}

export type MultiLanguageName = {
    en:string,
    ru:string,
    uz:string,
};