import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";

export default async function connectDB() {
        try {
            await mongoose.connect(DB_URL);
            console.log("connected to database");
        }
        catch (error){
            console.log("error connecting to database");
            console.log(error);
        }
}