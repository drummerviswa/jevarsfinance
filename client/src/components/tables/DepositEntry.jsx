import moment from "moment"
import React, { useEffect, useState } from "react";
import axios from "axios";
import DepositEntryModal from "../modals/DepositEntryModal";

function DepositEntryTable() {
  const [show, setShow] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeColumn, setActiveColumn] = useState("Price");
  const [sortingColumn, setSortingColumn] = useState("Price");
  const [current, setCurrent] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8800/api/deposit/entries/", {
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
      await axios.delete(`http://localhost:8800/api/deposit/entries/${item.Entry_ID}`);
      setEntries(entries.filter((i) => i.Entry_ID !== item.Entry_ID));
      setUpdated(!updated);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const sortByColumn = (column) => {
    let sortedData = [];
    if (sortingColumn === column) {
      sortedData = entries
        .slice()
        .sort((a, b) =>
          b[column].toString().localeCompare(a[column].toString())
        );
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
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Cus_ID")}>
              Entry ID
                {activeColumn === "Entry_ID" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("FirstName")}>
                Loan No
                {activeColumn === "Loan_No" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("FirstName")}>
                Loan Amount
                {activeColumn === "Amount" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("FirstName")}>
                Loan Type
                {activeColumn === "LoanType" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("LastName")}>
                Customer ID
                {activeColumn === "Cus_ID" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("LastName")}>
                Customer Name
                {activeColumn === "FirstName" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("FatherName")}>
              Payment Date
                {activeColumn === "Pay_Date" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("MotherName")}>
              Paid Amount
                {activeColumn === "Pay_Amount" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center cursor-pointer" onClick={() => sortByColumn("Address")}>
                Validity
                {activeColumn === "Validity" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {entries &&
            entries.map((item) => (
              <tr
                key={item.Cus_ID}
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
                <td className="px-6 py-4">{item.FirstName} {item.LastName}</td>
                <td className="px-6 py-4">{moment(item.Pay_Date).format("DD-MM-YYYY")}</td>
                <td className="px-6 py-4">{item.Pay_Amount}</td>
                <td className="px-6 py-4">{moment(item.Validity).format("DD-MM-YYYY")}</td>
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
      <DepositEntryModal
        setUpdatedData={setUpdated}
        interest={current}
        setShowModal={setShow}
        showModal={show}
      />
    </div>
  );
}

export default DepositEntryTable;
