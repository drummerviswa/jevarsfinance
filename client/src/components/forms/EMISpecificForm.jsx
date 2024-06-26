import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {addEMI as addEMIAction} from "../../slices/emiSlice";

function EMISpecificForm({updated,setUpdated}) {
  const [customers, setCustomers] = useState([]);
  const [current, setCurrent] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  useEffect(() => {
    axios.get("https://app-1odw.onrender.com/api/emi/customers/")
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => console.log(error));
  }, [updated]);

  const dispatch = useDispatch();

  const handleCustomerChange = (event) => {
    const selectedCustomerId = event.target.value;
    setSelectedCustomerId(selectedCustomerId);
    if (selectedCustomerId === "") {
      setCurrent({});
    } else {
      const selectedCustomer = customers.find(
        (customer) => customer.Cus_ID === parseInt(selectedCustomerId)
      );
      setCurrent(selectedCustomer || {});
    }
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSelectedCustomerId(searchValue);
    if (searchValue === "") {
      setCurrent({});
    } else {
      const selectedCustomer = customers.find(
        (customer) => customer.Cus_ID.toString() === searchValue
      );
      setCurrent(selectedCustomer || {});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (current && current.Cus_ID) {
      dispatch(addEMIAction(current));
      setUpdated(!updated)
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Specific EMI Entries</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="customers"
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
            {customers.map((customer) => (
              <option key={customer.Cus_ID} value={customer.Cus_ID}>
                {customer.Cus_ID} | {customer.FirstName} {customer.LastName}
              </option>
            ))}
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="search-customer"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Search Customer ID
          </label>
          <input
            type="text"
            id="search-customer"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Customer ID..."
            onChange={handleSearchChange}
            value={selectedCustomerId}
          />
        </div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default EMISpecificForm;
