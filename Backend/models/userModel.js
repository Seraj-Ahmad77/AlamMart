import mongoose from "mongoose"

export const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        select:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    cartData:{
        type:Object,
        default:{}
    }

},{minimize:false})

export const userModel=mongoose.model("user",userSchema)