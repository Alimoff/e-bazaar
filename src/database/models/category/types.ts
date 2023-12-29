import { Document,ObjectId } from "mongoose";
import { Category, MultiLanguageName } from "../../../types/common";

export interface ICategory {
    _id: ObjectId | string;
    name: MultiLanguageName;
    type:Category;
    parent? : ObjectId;
    children? : ICategory[];
}

export type CategoryDocument = Document & ICategory;