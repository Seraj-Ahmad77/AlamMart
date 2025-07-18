import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delievery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  const [token,setToken]=useState("")
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);
    if(token){
      try {
        await axios.post(backendUrl+"/api/cart/add",{itemId,size},{headers:{token:localStorage.getItem("token")}})
        
      } catch (error) {
        toast.error(error.message)
        
      }
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if(response.data.success){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
        toast.error(error.message)
      
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);
  

  const updateQuantity = async(itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if(token){
      try {
        await axios.post(backendUrl+"/api/cart/update",{itemId,size,quantity},{headers:{token:localStorage.getItem("token")}})
        
      } catch (error) {
         toast.error(error.message)
        
        
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getUserCart=async(token)=>{
    try {
      const response=await axios.post(backendUrl+"/api/cart/get",{},{headers:{token:localStorage.getItem("token")}})
      if(response.data.success){
        setCartItem(response.data.cartData)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  // const getCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const items in cartItem) {
  //     let itemInfo = products.find((product) => product._id === items);
  //     for (const item in cartItem[items]) {
  //       try {
  //         if (cartItem[items][item] > 0) {
  //           totalAmount += itemInfo.price * cartItem[items][item];
  //         }
  //       } catch (error) {}
  //     }
  //   }
  //   return totalAmount;
  // };
  const getCartAmount = () => {
  let total = 0;

  for (const productId in cartItem) {
    const product = products.find((p) => p._id === productId);
    if (!product) continue;

    for (const size in cartItem[productId]) {
      const qty = cartItem[productId][size];
      const rawPrice = product.prices?.[size];      // string या number

      const price = Number(rawPrice);               // ✅ force number
      if (!qty || isNaN(price)) continue;           // skip invalid

      total += price * qty;
    }
  }

  return total;   // always a number
};


  useEffect(()=>{
    if(!token && localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        getUserCart(localStorage.getItem("token"))
    }
  })
  const value = {
    products,
    currency,
    delievery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,setToken,
    setCartItem
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
