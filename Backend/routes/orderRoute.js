import express from "express";
import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  userOrders,
  allOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { authUser } from "../middleware/auth.js";
export const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// payment mothod
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// user features

orderRouter.post("/userorders", authUser, userOrders);

// verify payment
orderRouter.post("/verifyStripe",authUser,verifyStripe)
orderRouter.post("/verifyRazorpay",authUser,verifyRazorpay)