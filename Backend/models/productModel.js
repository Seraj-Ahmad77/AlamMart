import mongoose  from "mongoose";

 const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
    },
    prices:{
        type:Object,
        required:true
    },
    image:{
        type:Array,
        required:true

    },
    subCategory:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    sizes:{type:Array,
        required :true
    },
    bestseller:{
        type:Boolean
    },
    date:{type:Number,
        required:true
    }

})

export const productModel=mongoose.model("product",productSchema)