import axios from "axios";
import React, { useEffect, useState } from "react";

function Interests() {
  const [entries, setEntries] = useState([]);
  const [loans, setLoans] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [customers, setCustomer] = useState([]);
  let [current, setCurrent] = useState({});
  let [currentLoan, setCurrentLoan] = useState({});
  let [selectedCustomerId, setSelectedCustomerId] = useState("");
  let [selectedLoanNo, setSelectedLoanNo] = useState("");
  useEffect(() => {
    fetch(`https://app-1odw.onrender.com/api/loans/${current?.Cus_ID}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLoans(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://app-1odw.onrender.com/api/customers/`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setCustomer(data);
      })
      .catch((error) => console.log(error));
  }, [updated]);
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://app-1odw.onrender.com/api/entries",
        form
      );
      console.log("Post created:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating customer:", error);
      alert(error.response.data)
    }
  };
  const [form, setForm] = useState({
    Loan_No: "",
    Cus_ID: "",
    validity: "",
    payDate: "",
    payAmount: "",
  });
  console.info("Form",form)
  const handleCustomerChange = (event) => {
    const selectedCustomerId = event.target.value;
    setSelectedCustomerId(selectedCustomerId);
    const selectedCustomer = customers.find(
      (customer) => customer.Cus_ID === parseInt(selectedCustomerId)
    );
    setCurrent(selectedCustomer || {});
    setUpdated(!updated);
    setForm({ ...form, ["Cus_ID"]: parseInt(selectedCustomerId, 10) });
  };
  const handleLoanChange = (event) => {
    const selectedLoanNo = event.target.value;
    setSelectedLoanNo(selectedLoanNo);
    const selectedLoan = loans.find(
      (loan) => loan.Loan_No === parseInt(selectedLoanNo)
    );
    setCurrentLoan(selectedLoan || {});
    setForm({ ...form, ["Loan_No"]: parseInt(selectedLoanNo, 10) });
  };
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Loan Entries</h1>
      <form onSubmit={handleClick} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group"></div>
        <div className="grid md:grid-cols-2 md:gap-6">
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
                  {items.Cus_ID} | {items.FirstName} {items.LastName}
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Loan
            </label>
            <select
              onChange={handleLoanChange}
              value={selectedLoanNo}
              id="customers"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose a Loan</option>
              {loans.map((item) => (
                <option value={item.Loan_No}>
                  Loan No: {item.Loan_No} | Loan Type: {item.LoanType} | Amount: ₹ {item.Amount} | Interest:{item.Interest}
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
              value={current.FirstName || "First Name"}
              disabled
            />
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={current.LastName || "Last Name"}
              disabled
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={current.FatherName || "Father Name"}
              disabled
            />
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={current.MobileNo || "Mobile No"}
              disabled
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={currentLoan.Amount || "Amount"}
              disabled
            />
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={currentLoan.Interest || "Interest %"}
              disabled
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="validity"
              id="validity"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleInput}
              placeholder=" "
              required
            />
            <label
              htmlFor="pay_date"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date of Validity
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="payDate"
              id="payDate"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleInput}
              required
            />
            <label
              htmlFor="pay_date"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date of Payment
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="payAmount"
              id="payAmount"
              onChange={handleInput}
              min="0.00"
              step="500.00"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="pay_amount"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Payment Amount
            </label>
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

export default Interests;
