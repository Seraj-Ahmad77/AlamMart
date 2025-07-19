// import express from "express"
// import {config} from "dotenv"
// import cookieParser from "cookie-parser";
// import cors from "cors"
// import {connectDB} from "./Database/db.js"
// import {userRouter} from "./routes/userRoute.js"

// import {errormiddleware} from "./middleware/errormiddleware.js"
// import { productRouter } from "./routes/productRoute.js";
// import { cartRouter } from "./routes/cartRoute.js";
// import { orderRouter } from "./routes/orderRoute.js";
// config({path:"./config/config.env"})
// export const app=express();



// app.use(cors({
//     origin:[process.env.ADMIN_URL,process.env.USER_URL],
//     methods:["GET","POST","PUT","DELETE"],
//     credentials:true,
// }))
// app.use(cookieParser())
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))


// app.use("/api/user",userRouter)
// app.use("/api/product",productRouter)
// app.use("/api/cart",cartRouter)
// app.use("/api/order",orderRouter)


// connectDB();
// app.use(errormiddleware)
// // Global error handler
// app.use((err, req, res, next) => {
//   console.error("🔥 ERROR:", err); // Error console me dikhane ke liye
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });
import {app} from "./app.js"

import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})