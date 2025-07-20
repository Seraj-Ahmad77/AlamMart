
import {app} from "./app.js"

import {v2 as cloudinary} from "cloudinary"
console.log("🌐 CLOUDINARY_NAME:", process.env.CLOUDINARY_NAME);


cloudinary.config({
    
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})