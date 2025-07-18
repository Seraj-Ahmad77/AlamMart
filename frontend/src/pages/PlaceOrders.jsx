import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";

const PlaceOrder = () => {
  // const navigate = useNavigate();
  const [method, setMethod] = useState("cod");
  const {
    backendUrl,
    token,
    cartItem,
    setCartItem,
    getCartAmount,
    delievery_fee,
    products,
    navigate
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };


  const initPay=(order)=>{
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:"Order Payment",
      description:"Order Payment",
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        try {
          const {data}=await axios.post(backendUrl+"/api/order/verifyRazorpay",response,{headers:{token:localStorage.getItem("token")}})
          if(data.success){
            navigate("/orders")
            setCartItem({})
          }
          
        } catch (error) {
          toast.error(error)
        }
      }


    }
    const rzp=new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delievery_fee,
      };

      switch (method) {
        //  api call for cash on delievery
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            {
              amount: getCartAmount() + delievery_fee,
              address: formData,
              items: orderItems,
            },
            {
              headers: {
               token:localStorage.getItem("token")
              },
            }
          );

          if (response.data.success) {
            toast.success(response.data.message)
            setCartItem({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
          case "stripe":
            const responseStripe=await axios.post(backendUrl+"/api/order/stripe",orderData,{headers:{token:localStorage.getItem("token")}})
            if(responseStripe.data.success){
              const {session_url}=responseStripe.data
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.message)
            }
            break;
          case "razorpay":
            const responseRazorpay=await axios.post(backendUrl+"/api/order/razorpay",orderData,{headers:{token:localStorage.getItem("token")}})
           initPay(responseRazorpay.data.order)
            break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className=" flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left side */}
      <div className=" flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className=" text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
        </div>
        <div className=" flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className="border border-gray-300 py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 py-1.5 px-3.5 w-full"
          />
        </div>
        <div>
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Email Address"
            className="border mb-4 border-gray-300 py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            type="text"
            placeholder="Street"
            className="border mb-4 border-gray-300 py-1.5 px-3.5 w-full"
          />
          <div className=" flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className="border mb-4 border-gray-300 py-1.5 px-3.5 w-full"
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State"
              className="border mb-4 border-gray-300 py-1.5 px-3.5 w-full"
            />
          </div>
          <div className=" flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="Number"
              placeholder="Zip-Code"
              className="border mb-4 border-gray-300 py-1.5 px-3.5 w-full"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className="border mb-4 border-gray-300 py-1.5 px-3.5 w-full"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            type="Number"
            placeholder="Phone"
            className="border mb-4 border-gray-300 py-1.5 px-3.5 w-full"
          />
        </div>
      </div>
      {/* right */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className=" mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"}/>
          <div className=" flex gap-3  flex-col lg:flex-row">
            {/* payment methode collection */}
            <div
              onClick={() => setMethod("stripe")}
              className=" flex items-center gap-3 p-2 border px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} className=" h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className=" flex items-center gap-3 p-2 border px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} className=" h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className=" flex items-center gap-3 p-2 border px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className=" w-full mt-8 text-end">
            <button
              type="submit"
              
              className="bg-black text-white px-16 py-3 text:sm"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
