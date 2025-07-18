import React from "react";

const NewLetterbox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className=" text-center">
      <p className=" text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Join our newsletter to stay updated on the latest arrivals, exclusive
        offers, and special discounts. Sign up now and enjoy 20% off your first
        order!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className=" w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3 border"
      >
        <input
          type="email"
          className=" w-full sm:flex-1 outline-none"
          placeholder="Enter your email "
          required
        />
        <button
          type="submit"
          className=" bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewLetterbox;
