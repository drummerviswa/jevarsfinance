import React, { useEffect, useState } from "react";
import CustomerModel from "../modals/CustomerModel";
import axios from "axios";

function Customer() {
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeColumn, setActiveColumn] = useState("Price");
  const [sortingColumn, setSortingColumn] = useState("Price");
  const [current, setCurrent] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/customers/", {
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
      await axios.delete(`http://15.206.73.76:8800/api/customers/${item.Cus_ID}`);
      setCustomers(customers.filter((i) => i.Cus_ID !== item.Cus_ID));
      setUpdated(!updated);
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
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Cus_ID")}>
                ID
                {activeColumn === "Cus_ID" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("FirstName")}>
                First Name
                {activeColumn === "FirstName" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("LastName")}>
                Last Name
                {activeColumn === "LastName" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("FatherName")}>
                Father's Name
                {activeColumn === "FatherName" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("MotherName")}>
                Mother's Name
                {activeColumn === "MotherName" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Address")}>
                Address
                {activeColumn === "Address" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("MobileNo")}>
                Mobile no
                {activeColumn === "MobileNo" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((item) => (
              <tr
                key={item.Cus_ID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.Cus_ID}
                </th>
                <td className="px-6 py-4">{item.FirstName}</td>
                <td className="px-6 py-4">{item.LastName}</td>
                <td className="px-6 py-4">{item.FatherName}</td>
                <td className="px-6 py-4">{item.MotherName}</td>
                <td className="px-6 py-4">{item.Address}</td>
                <td onClick={()=>window.open(`tel:+91${item.MobileNo}`)} className="cursor-pointer px-6 py-4">{item.MobileNo}</td>
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
      <CustomerModel
        setUpdatedData={setUpdated}
        customer={current}
        setShowModal={setShow}
        showModal={show}
      />
    </div>
  );
}

export default Customer;
