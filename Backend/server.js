
import {app} from "./app.js"

import {v2 as cloudinary} from "cloudinary"


// cloudinary.config({
    
//     cloud_name:process.env.CLOUDINARY_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_SECRET_KEY
// })
cloudinary.config({
    
    cloud_name:"derkxsflg",
    api_key:"471352831668121",
    api_secret:"CUXmBvl5JZveTLMU6HFtXVQ-tJ0"
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})