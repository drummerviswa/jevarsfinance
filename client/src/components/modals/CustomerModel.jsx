import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CustomerModel({
  showModal,
  setShowModal,
  customer,
  setUpdatedData,
}) {
  const [newData, setNewData] = useState({
    Cus_ID: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    mobileNo: "",
    address: "",
  });
  useEffect(() => {
    if (customer) {
      setNewData({
        Cus_ID: customer.Cus_ID,
        firstName: customer.FirstName,
        lastName: customer.LastName,
        fatherName: customer.FatherName,
        motherName: customer.MotherName,
        mobileNo: customer.MobileNo,
        address: customer.Address,
      });
    }
  }, [customer]);
  const handleInput = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`http://localhost:8800/api/customers/${customer.Cus_ID}`, newData)
        .then((response) => {setUpdatedData((prev)=>!prev)})
        .catch((err) => {
          alert(err);
        });
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-700">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold dark:text-white">
                    Update Customer
                  </h3>
                  <button
                    className="dark:text-white p-1 ml-auto bg-transparent border-0 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="dark:text-white bg-transparent opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="space-y-4" onSubmit={handleClick}>
                    <div>
                      <label
                        htmlFor="customerID"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Customer ID
                      </label>
                      <input
                        type="text"
                        name="Cus_ID"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={customer.Cus_ID}
                        disabled
                      />
                    </div>
                    <div className="flex flex-row justify-between space-x-6">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="name"
                          defaultValue={customer.FirstName}
                          onChange={handleInput}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="name"
                          defaultValue={customer.LastName}
                          onChange={handleInput}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-row justify-between space-x-6">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Father's Name
                        </label>
                        <input
                          type="text"
                          name="fatherName"
                          id="name"
                          defaultValue={customer.FatherName}
                          onChange={handleInput}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Mother's Name
                        </label>
                        <input
                          type="text"
                          name="motherName"
                          defaultValue={customer.MotherName}
                          onChange={handleInput}
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-row justify-between space-x-6">
                      <div className="flex flex-col">
                        <label
                          htmlFor="mobile"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Mobile no
                        </label>
                        <input
                          type="tel"
                          pattern="[0-9]{10}"
                          name="mobileNo"
                          defaultValue={customer.MobileNo}
                          onChange={handleInput}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Address
                        </label>
                        <textarea
                          name="address"
                          id="message"
                          defaultValue={customer.Address}
                          onChange={handleInput}
                          rows="4"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter your address here..."
                        ></textarea>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Update
                    </button>
                  </form>
                </div>
                <div className="flex items-center justify-end  rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
