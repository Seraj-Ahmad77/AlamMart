import {catchAsyncError} from '../middleware/catchAsyncError.js'
import {userModel} from "../models/userModel.js"
export const addToCart=catchAsyncError(async(req,res,next)=>{
    try {
        const {itemId,size,userId}=req.body;
        const userData=await userModel.findById(userId)
        const cartData=await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }else{
                cartData[itemId][size]=1
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.status(200).json({
            success:true,
            message:"Added to cart"
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }

})
export const UpdateCart=catchAsyncError(async(req,res,next)=>{
    try {
        const {userId,itemId,size,quantity}=req.body

        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;
        cartData[itemId][size]=quantity

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.status(200).json({
            success:true,
            message:"Cart updated"
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
        
    }

})
export const getUserCart=catchAsyncError(async(req,res,next)=>{
    try {
        const {userId}=req.body;
          const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;
        res.status(200).json({
            success:true,
            cartData
        })
        
    } catch (error) {
         res.status(400).json({
            success:false,
            message:error.message
        })
        
    }

})


