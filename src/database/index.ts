import mongoose, { Mongoose } from "mongoose";
import {PASSWORD} from "../index";

class AppDatabase {
  private url = process.env.DB_URL || `mongodb+srv://alimoff:${PASSWORD}@cluster0.w04cyls.mongodb.net/?retryWrites=true&w=majority`;
  private dbName = process.env.DB_NAME;

  async connect(): Promise<Mongoose> {
    try {
      console.log(this.url);

      return await mongoose.connect(`${this.url}`);
    } catch (e) {
      throw Error("Failed to establish connection database");
    }
  }
}

export default AppDatabase;
