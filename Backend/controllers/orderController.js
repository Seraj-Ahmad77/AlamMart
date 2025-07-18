import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { orderModel } from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";
import { config } from "dotenv";
import razorpay from "razorpay";
config({ path: "./config/config.env" });

import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing Stripe Secret Key!");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const currency = "inr";
const deliveryCharge = 10;
export const placeOrder = catchAsyncError(async (req, res, next) => {
  try {
    const { amount, items, address, userId } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

export const placeOrderStripe = catchAsyncError(async (req, res, next) => {
  try {
    const { userId, amount, items, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// verify stripe

export const verifyStripe = async (req, res) => {
  const { userId, orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({
        success: true,
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const placeOrderRazorpay = catchAsyncError(async (req, res, next) => {
  try {
    const { userId, amount, items, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };
    const razorpayOrder = await razorpayInstance.orders.create(options,(error,order)=>{
        if(error){
            console.log(error)
            return res.json({
                success:false,
                message:error
            })
        }
        else{
            res.json({success:true,
                order :razorpayOrder
            })
        }
    });
   
  } catch (error) {
     console.log(error)
    res.json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
});



export const verifyRazorpay=async(req,res)=>{
    try {
        const {userId,razorpay_order_id}=req.body;
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id);
        
       if(orderInfo.status==="paid"){
        await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({
            success:true,
            message:"Payment Successful"
        })
       }
       else{
        res.json({
            success:false,
            message:"Payment failed"
        })
       }
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
        
    }
}
// export const verifyRazorpay = async (req, res) => {
//   try {
//     const { userId, razorpay_order_id } = req.body;
//   console.log("razorpay_order_id:", razorpay_order_id);

//     // Razorpay se order status fetch karo
//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

//     // Sirf status dekhkar verify kar rahe hain (not secure for production)
//     if (orderInfo.status === "paid") {
//       await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });

//       res.json({
//         success: true,
//         message: "Payment Successful",
//       });
//     } else {
//       res.json({
//         success: false,
//         message: "Payment not completed",
//       });
//     }
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const allOrders = catchAsyncError(async (req, res, next) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

export const userOrders = catchAsyncError(async (req, res, next) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

export const updateStatus = catchAsyncError(async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});
