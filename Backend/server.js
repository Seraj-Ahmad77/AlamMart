
import {app} from "./app.js"

import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name:"derkxsflg",
    api_key:"471352831668121",
    api_secret:"CUXmBvl5JZveTLMU6HFtXVQ-tJ0"
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})