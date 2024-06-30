import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function DepositEntryModal({
  showModal,
  setShowModal,
  interest,
  setUpdatedData,
}) {
  const [newData, setNewData] = useState({
    Loan_No: "",
    Cus_ID: "",
    validity: "",
    payDate: "",
    payAmount: "",
    payType: "",
    entryType: "",
  });
  useEffect(() => {
    if (interest) {
      setNewData({
        Loan_No: interest.Loan_No,
        Cus_ID: interest.Cus_ID,
        validity: moment(interest.Validity).format("YYYY-MM-DD"),
        payDate: moment(interest.Pay_Date).format("YYYY-MM-DD"),
        payAmount: interest.Pay_Amount,
        payType: interest.Pay_Type,
        entryType: interest.Entry_Type,
      });
    }
  }, [interest]);
  const handleInput = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`http://localhost:8800/api/deposit/entries/${interest.Entry_ID}`, newData)
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
                    Update Interest
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="space-y-4" onSubmit={handleClick}>
                    <div className="flex flex-col">
                      <label
                        htmlFor="customerID"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Entry ID
                      </label>
                      <input
                        type="text"
                        name="customerID"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={interest.Entry_ID}
                        disabled
                      />
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="flex flex-col">
                        <label
                          htmlFor="customerID"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Customer ID
                        </label>
                        <input
                          type="text"
                          name="customerID"
                          id="disabled-input"
                          aria-label="disabled input"
                          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={interest.Cus_ID}
                          disabled
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="customerID"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Loan ID
                        </label>
                        <input
                          type="text"
                          name="customerID"
                          id="disabled-input"
                          aria-label="disabled input"
                          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={interest.Loan_No}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="flex flex-row justify-between space-x-6">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Payment Date
                        </label>
                        <input
                          type="date"
                          onChange={handleInput}
                          name="payDate"
                          defaultValue={moment(interest.Pay_Date).format("YYYY-MM-DD")}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Select date"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Paid Amount
                        </label>
                        <input
                          defaultValue={parseInt(interest.Pay_Amount,10)}
                          type="number"
                          min="0.00"
                          onChange={handleInput}
                          step="1"
                          name="payAmount"
                          id="amount"
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
                          Validity
                        </label>
                        <input
                          type="date"
                          onChange={handleInput}
                          name="validity"
                          defaultValue={moment(interest.Validity).format(
                            "YYYY-MM-DD"
                          )}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Select date"
                        />
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="type"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Payment Type
                        </label>
                        <select
                          id="customers"
                          name="payType"
                          onChange={handleInput}
                          defaultValue={interest.Pay_Type}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        >
                          <option value="">Choose a PayType</option>
                          <option value="Cash">Cash</option>
                          <option value="UPI">UPI</option>
                          <option value="Account Transfer">
                            Account Transfer
                          </option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="type"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Entry Type
                        </label>
                        <select
                          id="customers"
                          name="entryType"
                          defaultValue={interest.Entry_Type}
                          onChange={handleInput}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        >
                          <option value="">Choose a EntryType</option>
                          <option value="Interest">Interest</option>
                          <option value="Principal">Principal</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="relative z-0 w-full mb-5 group"></div>
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
                    onClick={() => setShowModal(false)}
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
