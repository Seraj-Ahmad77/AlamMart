import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const Verify = () => {
  const { navigate, token, setCartItem, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const verifyPayment = async() => {
    try {
        if(!token){
            return null
        }
        const response=await axios.post(backendUrl+"/api/order/verifyStripe",{success,orderId},{headers:{token:localStorage.getItem("token")}})
        if(response.data.success){
            setCartItem({})
            toast.error(response.data.message)
            navigate("/orders")
        }
        else{
            navigate("/cart")
        }
    } catch (error) {
        toast.error(error.message)
        
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div></div>;
};

export default Verify;
