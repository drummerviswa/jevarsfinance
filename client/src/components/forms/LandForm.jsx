import axios from "axios";
import React, { useState } from "react";

function LandForm() {
  const [form, setForm] = useState({
    landDetails: "",
    landValue: "",
    landLocation: "",
  });
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/lands",
        form
      );
      console.log("Land created:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating customer:", error);
      alert(error.response.data);
    }
  };
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Lands</h1>
      <form onSubmit={handleClick} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group"></div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="landLocation"
              id="floating_landDetails"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleInput}
            />
            <label
              htmlFor="floating_landDetails"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Land Location
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="landValue"
              id="floating_landValue"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleInput}
            />
            <label
              htmlFor="floating_landValue"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Land Value
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-black"
            >
              Land Details
            </label>
            <textarea
              onChange={handleInput}
              name="landDetails"
              rows="4"
              className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter land details"
            ></textarea>
          </div>
        </div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <button
            style={{ backgroundColor: "royalblue" }}
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center content-center"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default LandForm;
