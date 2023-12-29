import { Category } from "../../../types/common";
import { model, Schema, SchemaTypes } from "mongoose";
import { ICategory } from "./types";

const categorySchema = new Schema<ICategory>(
    {
        name:{
            en: String,
            ru: String,
            uz: String,
        },

        type:{
            type: String,
            enum: [
                Category.CLOTHES,
                Category.COSMETICS,
                Category.ELECTRONICS,
                Category.FOOD_AND_BEVERAGE,
                Category.FURNITURE_AND_DECOR,
                Category.HEALTH,
                Category.HOUSEHOLD_ITEMS,
                Category.OFFICE_EQUIPMENT,
                Category.OTHER
            ],
            default: Category.OTHER,
        },

        parent: {
            type: SchemaTypes.ObjectId,
            ref: "Category",
            required: false,
        },

        children: {
            type: [SchemaTypes.ObjectId],
            ref: "Category",
        },
    },
    {timestamps: true}
);

export const CategoryModel = model("Category", categorySchema); 