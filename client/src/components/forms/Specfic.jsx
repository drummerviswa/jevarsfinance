import axios from "axios";
import React, { useEffect, useState } from "react";

function Specific() {
  const [entries, setEntries] = useState([]);
  const [loans, setLoans] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [customers, setCustomer] = useState([]);
  let [current, setCurrent] = useState({});
  let [currentLoan, setCurrentLoan] = useState({});
  let [selectedCustomerId, setSelectedCustomerId] = useState("");
  let [selectedLoanNo, setSelectedLoanNo] = useState("");
  useEffect(() => {
    fetch(`http://localhost:8800/api/loans/${current?.Cus_ID}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLoans(data);
      })
      .catch((error) => console.log(error));
    fetch(`http://localhost:8800/api/customers/`, {
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
        "http://localhost:8800/api/entries",
        form
      );
      console.log("Post created:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating customer:", error);
      alert(error.response.data);
    }
  };
  const [form, setForm] = useState({
    Loan_No: "",
    Cus_ID: "",
    validity: "",
    payDate: "",
    payAmount: "",
  });
  console.info("Form", form);
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
                  {items.FirstName} {items.LastName}
                </option>
              ))}
            </select>
          </div>
        <form onSubmit={handleClick} class="flex items-center max-w-sm mx-auto">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Customer ID..."
              required
              onChange={handleCustomerChange}
              value={current.Cus_ID}
            />
          </div>
        </form>
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

export default Specific;
