import {catchAsyncError} from "../middleware/catchAsyncError.js"
import ErrorHandler from "../middleware/errormiddleware.js"
import {userModel} from "../models/userModel.js"
import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


export const loginUser=catchAsyncError(async(req ,res ,next)=>{

    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter all fields",400))
    }
    if(password.length<8){
        return next(new ErrorHandler("password must be between 8 to 16 character",400))
    }
    const user=await userModel.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("User not exists",404))
    }
    console.log(password)
    console.log(user.password)
    const isPasswordMatched=await bcrypt.compare(password,user.password)
    
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const token = createToken(user._id);

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user,
        token
    });

})
export const registerUser =catchAsyncError(async(req ,res ,next)=>{
    console.log("📦 Register request body:", req.body);

    const {name,email,password}=req.body;

    if(!email || !password || !name){
        return next(new ErrorHandler("Please enter all fields",400))
    }

    const exists= await userModel.findOne({email})
    if(exists){
        return next(new ErrorHandler("User is already exists",400))
    }

    if(!validator.isEmail(email)){
        return next(new ErrorHandler("Please enter a valid email",400))
    }
    if(password.length<8){
        return next(new ErrorHandler("Please enter passsword 8 or more character",400))
    }
    const hashedpassword=await bcrypt.hash(password,10);

    const newUser=await  userModel.create({
        name,
        email,
        password:hashedpassword
    })

    // const token= createToken(userModel._id)
    const token= createToken(newUser._id)


    res.status(200).json({
        success:true,
        message:"User registred successfully",
        newUser,
        token
    })
})
export const adminLogin=catchAsyncError(async(req ,res ,next)=>{

    const {email,password}=req.body
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        const token=jwt.sign("token",process.env.JWT_SECRET);
        res.status(200).json({
            success:true,
            token
        })
    }else{
       res.status(400).json({
        success:false,
        message:"Invalid credentials"
       })
    }
    
})