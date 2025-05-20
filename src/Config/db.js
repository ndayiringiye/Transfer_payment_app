import mongoose from "mongoose";

export const connectdb = async () =>{
    try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log({message : "database connected successfully"})
    } catch (error) {
        console.log({message : "database connection failure", error})
        
    }
}