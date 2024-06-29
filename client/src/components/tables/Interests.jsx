import moment from "moment";
import React, { useEffect, useState } from "react";
import InterestModel from "../modals/InterestModel";
import axios from "axios";

function Interest() {
  const [show, setShow] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeColumn, setActiveColumn] = useState("Price");
  const [sortingColumn, setSortingColumn] = useState("Price");
  const [current, setCurrent] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    fetch("https://app-1odw.onrender.com/api/entries/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEntries(data);
      })
      .catch((error) => console.log(error));
  }, [updated]);

  const handleUpdate = (item) => {
    setShow(true);
    setCurrent(item);
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`https://app-1odw.onrender.com/api/entries/${item.Entry_ID}`);
      setEntries(entries.filter((i) => i.Entry_ID !== item.Entry_ID));
      setUpdated(!updated);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const sortByColumn = (column) => {
    let sortedData = [];
    if (sortingColumn === column) {
      sortedData = entries.slice().reverse();
      setSortingColumn("");
    } else {
      sortedData = entries
        .slice()
        .sort((a, b) =>
          a[column].toString().localeCompare(b[column].toString())
        );
      setSortingColumn(column);
    }
    setEntries(sortedData);
    setActiveColumn(column);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Entry_ID")}>
                Entry ID
                {activeColumn === "Entry_ID" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Loan_No")}>
                Loan No
                {activeColumn === "Loan_No" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Amount")}>
                Loan Amount
                {activeColumn === "Amount" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("LoanType")}>
                Loan Type
                {activeColumn === "LoanType" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Cus_ID")}>
                Customer ID
                {activeColumn === "Cus_ID" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("FirstName")}>
                Customer Name
                {activeColumn === "FirstName" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Pay_Date")}>
                Payment Date
                {activeColumn === "Pay_Date" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Pay_Amount")}>
                Paid Amount
                {activeColumn === "Pay_Amount" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Pay_Type")}>
                Payment Type
                {activeColumn === "Pay_Type" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Entry_Type")}>
                Entry Type
                {activeColumn === "Entry_Type" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Validity")}>
                Validity
                {activeColumn === "Validity" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {entries &&
            entries.map((item) => (
              <tr
                key={item.Entry_ID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.Entry_ID}
                </th>
                <td className="px-6 py-4">{item.Loan_No}</td>
                <td className="px-6 py-4">{item.Amount}</td>
                <td className="px-6 py-4">{item.LoanType}</td>
                <td className="px-6 py-4">{item.Cus_ID}</td>
                <td className="px-6 py-4">
                  {item.FirstName} {item.LastName}
                </td>
                <td className="px-6 py-4">
                  {moment(item.Pay_Date).format("DD-MM-YYYY")}
                </td>
                <td className="px-6 py-4">{item.Pay_Amount}</td>
                <td className="px-6 py-4">{item.Pay_Type}</td>
                <td className="px-6 py-4">{item.Entry_Type}</td>
                <td className="px-6 py-4">
                  {moment(item.Validity).format("DD-MM-YYYY")}
                </td>
                <td className="flex px-6 py-4 space-x-3">
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
      <InterestModel
        setUpdatedData={setUpdated}
        interest={current}
        setShowModal={setShow}
        showModal={show}
      />
    </div>
  );
}

export default Interest;
