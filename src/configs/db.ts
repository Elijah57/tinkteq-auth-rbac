import mongoose from "mongoose";
import { configs } from "./config";

export const connectDb = async ()=>{
    try{
        const connection = await mongoose.connect(configs.dbUri)

        console.log(`Database connected successfully`)
        console.log(`Connected to DB: ${connection.connection.name}`)
    }catch(err){
        console.log(`Error: Could not connect to database ${err}`)
    }
}
