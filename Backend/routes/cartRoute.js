import express from "express"

import {addToCart,getUserCart,UpdateCart} from "../controllers/cartController.js"
import { authUser } from "../middleware/auth.js";

export const cartRouter=express.Router();
cartRouter.post("/get",authUser,getUserCart)
// cartRouter.post("/get", authUser, (req, res, next) => {
//   console.log("---- /api/cart/get ----");
//   console.log("Headers:", req.headers);
//   console.log("Body   :", req.body);
//   console.log("Query  :", req.query);
//   console.log("User   :", req.user); 
//   res.json({ message: "Test cart route response" });
// });
cartRouter.post("/add",authUser,addToCart)
cartRouter.post("/update",authUser,UpdateCart)