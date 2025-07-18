// 
import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] text-white gap-14 my-10 mt-40 text-sm bg-black p-12">
        {/* LOGO AND DESCRIPTION */}
        <div>
          <img
            src={assets.logo1}
            className="mb-5 w-20 m-5 border border-amber-400 p-2 bg-white"
            alt="AlamMart Logo"
          />
          <p className="w-full md:w-2/3 text-gray-400">
            AlamMart is your one-stop destination for quality home essentials. From cozy bedding to stylish decor, we deliver comfort, design, and convenience right to your doorstep.
          </p>
        </div>

        {/* COMPANY LINKS */}
        <div>
          <p className="text-xl mb-5 font-medium">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-400 cursor-pointer">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li>+91 77049 29230</li>
            <li>serajansari7704@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center font-semibold text-gray-600 bg-white">
          © 2025 AlamMart.com — All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
