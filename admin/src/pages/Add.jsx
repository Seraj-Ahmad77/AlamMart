import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pricesBySize, setPricesBySize] = useState({});
  const [category, setCategory] = useState("Single bed");
  const [subCategory, setSubCategory] = useState("Belvet");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      //  formData.append("price",price)
      formData.append("prices", JSON.stringify(pricesBySize));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <form
      className=" flex flex-col gap-3 w-full items-start"
      onSubmit={onSubmitHandler}
    >
      <div>
        <p className=" mb-2">Upload image</p>
        <div className=" flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className=" w-full">
        <p className="mb-2">Product name:</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 shadow-sm outline-none box-border border-1 rounded-full border-gray-300  hover:bg-gray-200 "
          type="text"
          placeholder=" Type here"
          required
        />
      </div>
      <div className=" w-full">
        <p className="mb-2">Description:</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 shadow-sm outline-none box-border border-1 rounded-4 border-gray-300  hover:bg-gray-200 "
          
          placeholder=" Type here"
          required
        />
      </div>
      <div className=" flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div>
          <p className="mb-2 ">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className=" w-full px-3 py-2 shadow-sm border-1 border-gray-300 rounded-full"
          >
            <option value="SingleBed">Single-bed</option>
            <option value="DoubleBed">Double-bed</option>
            <option value="DoubleBetSet">Double-bed-set</option>
            <option value="Kathola">Kathola</option>
          </select>
        </div>
        <div>
          <p className="mb-2 "> Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className=" w-full px-5 pr-10 outline-none py-2 shadow-sm border-1 border-gray-300 rounded-full"
          >
            <option value="Belvet">Belvet</option>
            <option value="Pure-cotton">Pure Cotton</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Price per size:</p>
          <div className="flex flex-col gap-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center gap-2">
                <label className="min-w-[120px]">{size} Price:</label>
                <input
                  type="number"
                  value={pricesBySize[size] || ""}
                  onChange={(e) =>
                    setPricesBySize((prev) => ({
                      ...prev,
                      [size]: e.target.value,
                    }))
                  }
                  placeholder={`Enter price for ${size}`}
                  className="px-3 py-1 shadow-sm border border-gray-300 rounded-full w-[150px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2">Product sizes:</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) => {
                if (prev.includes("Single Bed")) {
                  const updated = prev.filter((item) => item !== "Single Bed");
                  const updatedPrices = { ...pricesBySize };
                  delete updatedPrices["Single Bed"];
                  setPricesBySize(updatedPrices);
                  return updated;
                } else {
                  return [...prev, "Single Bed"];
                }
              })
            }
          >
            <p
              className={`${
                sizes.includes("Single Bed") ? "bg-amber-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Single Bed
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) => {
                if (prev.includes("Double Bed")) {
                  const updated = prev.filter((item) => item !== "Double Bed");
                  const updatedPrices = { ...pricesBySize };
                  delete updatedPrices["Double Bed"];
                  setPricesBySize(updatedPrices);
                  return updated;
                } else {
                  return [...prev, "Double Bed"];
                }
              })
            }
          >
            <p
              className={`${
                sizes.includes("Double Bed") ? "bg-amber-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Double Bed
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) => {
                if (prev.includes("Double Bed Set")) {
                  const updated = prev.filter(
                    (item) => item !== "Double Bed Set"
                  );
                  const updatedPrices = { ...pricesBySize };
                  delete updatedPrices["Double Bed Set"];
                  setPricesBySize(updatedPrices);
                  return updated;
                } else {
                  return [...prev, "Double Bed Set"];
                }
              })
            }
          >
            <p
              className={`${
                sizes.includes("Double Bed Set")
                  ? "bg-amber-300"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Double Bed Set
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) => {
                if (prev.includes("Kathola")) {
                  const updated = prev.filter((item) => item !== "Kathola");
                  const updatedPrices = { ...pricesBySize };
                  delete updatedPrices["Kathola"];
                  setPricesBySize(updatedPrices);
                  return updated;
                } else {
                  return [...prev, "Kathola"];
                }
              })
            }
          >
            <p
              className={`${
                sizes.includes("Kathola") ? "bg-amber-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Kathola
            </p>
          </div>
        </div>
      </div>

      <div className=" gap-2 mt-2 flex">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          name=""
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button
        type="Submit"
        className=" w-28 py-2 mt-4 px-3 bg-black text-white rounded-full shadow-md "
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
