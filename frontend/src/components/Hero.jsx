import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className=" flex flex-col sm:flex-row border border-gray-400">
      {/* hero left */}
      <div className=" w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className=" flex items-center gap-4">
            <p className=" w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className=" font-medium text-sm md:text-base">OUR BESTSELLER</p>
          </div>
          <h1 className="text-xl sm:py-3 lg:text-5xl leading-relaxed">Latest Arrivals</h1>
          <div className=" flex items-center gap-4">
            <p className=" font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className=" w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* hero right side */}
      <img src={assets.hero_img1} className=" w-full sm:w-1/2 " alt="" />

    </div>
  );
};

export default Hero;
