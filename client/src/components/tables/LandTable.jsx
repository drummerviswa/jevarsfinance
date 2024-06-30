import React, { useEffect, useState } from "react";
import axios from "axios";
import LandModel from "../modals/LandModal";
import { toast } from "react-toastify";

function LandTable() {
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeColumn, setActiveColumn] = useState("Price");
  const [sortingColumn, setSortingColumn] = useState("Price");
  const [current, setCurrent] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    fetch("https://jevarsfinance.onrender.com/api/lands/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => console.log(error));
  }, [updated]);

  const handleUpdate = (item) => {
    setShow(true);
    setCurrent(item);
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`https://jevarsfinance.onrender.com/api/lands/${item.Land_No}`);
      setCustomers(customers.filter((i) => i.Land_No !== item.Land_No));
      setUpdated(!updated);
      toast.error(`${item.Land_No} - ₹${item.Land_Value} deleted`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const sortByColumn = (column) => {
    let sortedData = [];
    if (sortingColumn === column) {
      sortedData = customers
        .slice()
        .sort((a, b) =>
          b[column].toString().localeCompare(a[column].toString())
        );
      setSortingColumn("");
    } else {
      sortedData = customers
        .slice()
        .sort((a, b) =>
          a[column].toString().localeCompare(b[column].toString())
        );
      setSortingColumn(column);
    }
    setCustomers(sortedData);
    setActiveColumn(column);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("Land_No")}
              >
                Land No
                {activeColumn === "Land_No" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("Land_Location")}
              >
                Land Location
                {activeColumn === "Land_Location" &&
                  (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("Land_Value")}
              >
                Land Value
                {activeColumn === "Land_Value" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("Land_Details")}
              >
                Land Details
                {activeColumn === "Land_Details" &&
                  (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((item) => (
              <tr
                key={item.Land_No}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.Land_No}
                </th>
                <td className="px-6 py-4">{item.Land_Location}</td>
                <td className="px-6 py-4">{item.Land_Value}</td>
                <td className="px-6 py-4">{item.Land_Details}</td>
                <td className="px-6 py-4 space-x-3">
                  <button
                    onClick={() => handleUpdate(item)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <LandModel
        setUpdatedData={setUpdated}
        customer={current}
        setShowModal={setShow}
        showModal={show}
      />
    </div>
  );
}

export default LandTable;
