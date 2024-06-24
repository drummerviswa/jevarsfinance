import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

function DepositLoanModel({ showModal, setShowModal, loans, setUpdatedData }) {
  const [newData, setNewData] = useState({
    Cus_ID: "",
    loanType: "",
    amount: "",
    interest: "",
    dob: "",
    document: "",
    status:"",
    advancePay:"",
  });
  useEffect(() => {
    if (loans) {
      setNewData({
        loanType: loans.LoanType,
        amount: loans.Amount,
        interest: loans.Interest,
        dob: moment(loans.DOB).format("YYYY-MM-DD"),
        document: loans.Document,
        status:loans.Status,
        advancePay:loans.advancePay,
      });
    }
  }, [loans]);
  const handleInput = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`https://app-1odw.onrender.com/api/deposit/loans/${loans.Loan_No}`, newData)
        .then((response) => {
          console.log("Data:", response);
          window.location.reload;
        })
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
                    Update Loan Details
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
                    <div className="flex flex-row justify-between space-x-6">
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
                          value={loans.Cus_ID}
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
                          value={loans.Loan_No}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="flex flex-row justify-between space-x-6">
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="type"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Loan Type
                        </label>
                        <select
                          id="customers"
                          defaultValue={loans.LoanType}
                          onChange={handleInput}
                          name="loanType"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="">Choose a Type</option>
                          <option value="Educational">Education</option>
                          <option value="Personal">Personal</option>
                          <option value="Gold">Gold</option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="type"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Loan Type
                        </label>
                        <select
                          id="customers"
                          defaultValue={loans.Status}
                          onChange={handleInput}
                          name="status"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="">Choose a Type</option>
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between space-x-6">
                      <div className="flex flex-col">
                        <label
                          htmlFor="amount"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Amount ₹
                        </label>
                        <input
                          defaultValue={parseInt(loans.Amount,10)}
                          type="number"
                          min="0.00"
                          onChange={handleInput}
                          step="100"
                          name="amount"
                          id="amount"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="interest"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Rate of Interest
                        </label>
                        <input
                          type="text"
                          name="interest"
                          onChange={handleInput}
                          defaultValue={loans.Interest}
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-6">
                      <div className="flex flex-col">
                        <label
                          htmlFor="mobile"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Date of Borrowing
                        </label>
                        <input
                          type="date"
                          onChange={handleInput}
                          name="dob"
                          defaultValue={moment(loans.DOB).format("YYYY-MM-DD")}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Select date"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="type"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Document
                        </label>
                        <select
                          name="document"
                          onChange={handleInput}
                          defaultValue={loans.Document}
                          id="document"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        >
                          <option value="">Choose an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="type"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Advanced Payment
                        </label>
                        <select
                          name="advancePay"
                          onChange={handleInput}
                          defaultValue={loans.advancePay}
                          id="advancePay"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        >
                          <option value="">Choose an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-1 md:gap-6 px-10">
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end rounded-b">
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

export default DepositLoanModel;
