import React, { useCallback, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItme from "../components/ProductItme";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");



  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProduct(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProduct.slice();
    switch (sortType) {
      case "low-high":
        setFilterProduct(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProduct(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className=" flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter option */}
      <div className=" min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className=" my-2 text-xl  flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={` h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>
        {/* category filter */}
        <div
          className={` border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className=" mb-3 text-sm font-medium ">CATEGORIES</p>
          <div className=" flex flex-col gap-2 font-light text-gray-700">
            <p className=" flex gap-2">
              <input
                type="checkbox"
                className=" w-3"
                onChange={toggleCategory}
                value={"Double-bed"}
              />
              Double-bed
            </p>
            <p className=" flex gap-2">
              <input
                type="checkbox"
                className=" w-3"
                onChange={toggleCategory}
                value={"Single-bed"}
              />
              Single-bed
            </p>
            <p className=" flex gap-2">
              <input
                type="checkbox"
                className=" w-3"
                onChange={toggleCategory}
                value={"Double-bed-set"}
              />
              Double-bed-set
            </p>
            <p className=" flex gap-2">
              <input
                type="checkbox"
                className=" w-3"
                onChange={toggleCategory}
                value={"Kathola"}
              />
              Kathola
            </p>
          </div>
        </div>

        {/* SubCategory filter */}
        <div
          className={` border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className=" mb-3 text-sm font-medium ">TYPE</p>
          <div className=" flex flex-col gap-2 font-light text-gray-700">
            <p className=" flex gap-2">
              <input
                type="checkbox"
                className=" w-3"
                onChange={toggleSubCategory}
                value={"Belvet"}
              />
              Belvet
            </p>
            <p className=" flex gap-2">
              <input
                type="checkbox"
                className=" w-3"
                onChange={toggleSubCategory}
                value={"Pure-cotton"}
              />
              Pure Cotton
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <div className=" flex-1">
        <div className=" flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* product sort */}

          <select
            onChange={(e) => setSortType(e.target.value)}
            className=" border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by:Relevent</option>
            <option value="low-high">Sort by:low to high</option>
            <option value="high-low">Sort by:high to low</option>
          </select>
        </div>

        {/* map products */}
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProduct.map((item, index) => {
            const defaultSize = item.sizes?.[0];
            const defaultPrice = item.prices?.[defaultSize];
            return (
              <ProductItme
                key={index}
                name={item.name}
                id={item._id}
                price={defaultPrice}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
