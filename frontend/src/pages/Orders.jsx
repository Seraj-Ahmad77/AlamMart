import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      if (response.data.success) {
        let allOrder = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["orderId"] = order._id;

            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrder.push(item);
          });
        });
        setOrderData(allOrder.reverse());
      }
    } catch (error) {}
  };

 
  useEffect(() => {
  const delay = setTimeout(() => {
    loadOrderData();
  }, 1000); 

  return () => clearTimeout(delay);
}, [token]);

  return (
    <div className=" border-t pt-16">
      <div className=" text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />

        <div>
          {orderData.map((item, index) => (
            <div
              className=" py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              key={index}
            >
              <div className=" flex items-start gap-6 text-sm">
                <img className=" w-16 sm:w-20" src={item.image[0]} alt="" />
                <div className="">
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className=" flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>{item.quantity}</p>
                    <p>{item.size}</p>
                  </div>
                  <p className=" mt-2">
                    Date{" "}
                    <span className=" text-gray-400 ">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className=" mt-2">
                    Payment{" "}
                    <span className=" text-gray-400 ">
                      {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              <div className=" md:w-1/2 flex justify-between">
                <div className=" flex items-center gap-2">
                  <p className=" min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className=" text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className=" border px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
