
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errormiddleware.js";
import {v2 as cloudinary} from "cloudinary"
import {productModel} from "../models/productModel.js"


export const addProduct=catchAsyncError(async(req , res ,next)=>{
  console.log("BODY:", req.body);
console.log("FILES:", req.files);



    const {name,description,prices,category,subCategory,sizes,bestseller}=req.body;
   if (
  !name ||
  !description ||
  !category ||
  !subCategory ||
  !prices ||
  typeof bestseller === "undefined" ||
  typeof sizes === "undefined"
) {
  return next(new ErrorHandler("Please enter all fields", 400));
}
    const image1=req.files.image1 && req.files.image1[0];
    const image2=req.files.image2 && req.files.image2[0];
    const image3=req.files.image3 && req.files.image3[0];
    const image4=req.files.image4 && req.files.image4[0];
    const images=[image1,image2,image3,image4].filter((item)=>item!==undefined)



const imagesUrl = await Promise.all(
  images.map(async (item) => {
    console.log("⏳ Uploading:", item.filename);

    try {
      const result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image",
        folder: "products",
      });
      console.log("✅ Uploaded:", result.secure_url);
      return result.secure_url;
    } catch (err) {
      console.error("❌ Cloudinary Upload Error:");
      console.error(err); // << FULL error object print
      throw new Error("Cloudinary upload error");
    }
  })
);


    const parsedSizes = JSON.parse(sizes);
const parsedprices = JSON.parse(prices);


    const productData=await productModel.create({
        name,
        description,
        prices:parsedprices,
        category,
        subCategory,
        sizes:parsedSizes,
        bestseller:bestseller==="true"?true:false,
        image:imagesUrl,
        date:Date.now()

    })
    res.status(200).json({
        success:true,
        message:"Product added successfully",
        productData
    })
})
export const removeProduct=catchAsyncError(async(req , res ,next)=>{
    await productModel.findByIdAndDelete(req.body.id)

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
    
    
})
export const singleProduct=catchAsyncError(async(req , res ,next)=>{
    const {productId}=req.body
    const product=await productModel.findById(productId)
    res.status(200).json({
        success:true,
        message:"Product information is here",
        product
    })
    
})
export const listProduct=catchAsyncError(async(req , res ,next)=>{
    const products=await productModel.find({});
    res.status(200).json({
        success:true,
        message:"product listed",
        products
    })
    
})