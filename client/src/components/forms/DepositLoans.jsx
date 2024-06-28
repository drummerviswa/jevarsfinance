import axios from "axios";
import React, { useEffect, useState } from "react";

function DepositLo() {
  let [customers, setCustomers] = useState([]);
  let [current, setCurrent] = useState({});
  let [selectedCustomerId, setSelectedCustomerId] = useState("");
  useEffect(() => {
    fetch("https://app-1odw.onrender.com/api/deposit/customers/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log("Current",current)
  const [form,setForm] = useState({
    Cus_ID:"",
    loanType: "",
    amount: "",
    interest: "",
    dob: "",
    document: "",
    advancePay:"",
  })
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCustomerChange = (event) => {
    const selectedCustomerId = event.target.value;
    setSelectedCustomerId(selectedCustomerId);
    const selectedCustomer = customers.find(
      (customer) => customer.Cus_ID === parseInt(selectedCustomerId)
    );
    setCurrent(selectedCustomer || {});
    setForm({ ...form, ["Cus_ID"]: parseInt(selectedCustomerId,10) });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://app-1odw.onrender.com/api/deposit/loans",
        form
      );
      console.log("Loan created:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating customer:", error);
      alert("Error:",error)
    }
  }
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Deposits</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Customer
            </label>
            <select
              onChange={handleCustomerChange}
              value={selectedCustomerId}
              id="customers"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose a Customer</option>
              {customers.map((items) => (
                <option key={items.Cus_ID} value={items.Cus_ID}>
                  {items.Cus_ID} | {items.FirstName} {items.LastName} | {items.FatherName} |{" "}
                  {items.MobileNo} | {items.Address}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6 items-center">
          <div className="relative z-0 w-full mb-3 group col">
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={current.FirstName || ""}
              placeholder="First Name"
              disabled
            />
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={current.LastName || ""}
              disabled
              placeholder="Last Name"
            />
          </div>
            <div className="relative z-0 w-full mb-3 group col">
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={current.FatherName || ""}
                placeholder="Father Name"
                disabled
              />
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mobile"
                value={current.MobileNo || ""}
                disabled
              />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="min-h-[100px] mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={current.Address || ""}
              placeholder="Address"
              disabled
            ></textarea>
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Loan Type
            </label>
            <select
              id="customers"
              name="loanType"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Choose a Type</option>
              <option value="Educational">Education</option>
              <option value="Personal">Personal</option>
              <option value="Gold">Gold</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
          <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Advance Payment
            </label>
            <select
              name="advancePay"
              onChange={handleInput}
              id="advancePay"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Choose an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              min="0.00"
              step="100.00"
              name="amount"
              onChange={handleInput}
              id="floating_amount"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Amount ₹
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="interest"
              onChange={handleInput}
              id="floating_interest"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              step="0.01"
            />
            <label
              htmlFor="interest"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Interest %
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
          <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Document
            </label>
            <select
              name="document"
              onChange={handleInput}
              id="document"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Choose an option</option>
              <option value="no">No</option>
              <option value="cheque">Cheque</option>
              <option value="bond">Bond</option>
              <option value="land document">Land Document</option>
              <option value="gold">Gold</option>
              <option value="vehicle">Vehicle</option>
              <option value="bond and cheque">Bond and Cheque</option>
              <option value="bond and land document">Bond and Land Document</option>
              <option value="bond and gold">Bond and Gold</option>
              <option value="bond and vehicle">Bond and Vehicle</option>
              <option value="bond and others">Bond and Others</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Date of borrow
            </label>
            <input
              type="date"
              onChange={handleInput}
              name="dob"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Select date"
            />
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

export default DepositLo;
