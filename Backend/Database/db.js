import mongoose from "mongoose";
export const connectDB=async()=>{
     console.log("👉 MONGO_URI =", process.env.MONGO_URI); 
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Database connected successfully")
    }).catch((err)=>{
        console.log("Error connecting to database",err)
    })
}