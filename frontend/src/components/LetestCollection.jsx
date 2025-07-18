import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItme from "./ProductItme";
const LetestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);
  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);
  return (
    <div className=" my-10">
      <div className=" text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our handpicked selection of the latest arrivals, featuring
          modern designs and timeless essentials. Whether you're upgrading your
          space or searching for the perfect piece, our newest collection offers
          quality and style to suit every taste and budget.
        </p>
      </div>

      {/* rendering product */}

      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((item, index) => (
          <ProductItme
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.prices["Single Bed"] || Object.values(item.prices)[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default LetestCollection;
