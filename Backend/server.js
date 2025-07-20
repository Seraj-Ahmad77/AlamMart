
import {app} from "./app.js"

import {v2 as cloudinary} from "cloudinary"


// cloudinary.config({
    
//     cloud_name:process.env.CLOUDINARY_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_SECRET_KEY
// })
import { v2 as cloudinary } from "cloudinary";
console.log("Env check:", {
  name: process.env.CLOUDINARY_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_SECRET_KEY ? "loaded" : "missing"
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})