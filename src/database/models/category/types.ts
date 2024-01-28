import { Document,ObjectId } from "mongoose";
import { Category, MultiLanguageName } from "../../../types/common";

export interface ICategory {
    _id: ObjectId | string;
    name:string;
    description?: string;
}

export type CategoryDocument = Document & ICategory;