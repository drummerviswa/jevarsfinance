import React, { useState, useMemo, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import DepositLoanModel from "../modals/DepositLoanModal";

const DepositSpecificLoan = ({ updated, setUpdated }) => {
  const [show, setShow] = useState(false);
  const [loans, setLoans] = useState([]);
  const [activeColumn, setActiveColumn] = useState("Price");
  const [sortingColumn, setSortingColumn] = useState("Price");
  const [current, setCurrent] = useState({});
  const customer = useSelector((state) => state.deposit);
  useEffect(() => {
    fetch(`https://jevarsfinance.onrender.com/api/deposit/loans/c/${customer[0]["Cus_ID"]}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLoans(data);
      })
      .catch((error) => console.log(error));
  }, [updated]);

  const handleUpdate = (item) => {
    setShow(true);
    setCurrent(item);
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`https://jevarsfinance.onrender.com/api/deposit/loans/${item.Loan_No}`);
      setLoans(loans.filter((i) => i.Loan_No !== item.Loan_No));
      setUpdated(!updated);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const handleStatus = async (item) => {
    try {
      await axios.put(
        `https://jevarsfinance.onrender.com/api/deposit/loans/status/${item.Loan_No}`,
        { status: "Closed" }
      );
      setLoans(loans.filter((i) => i.Loan_No !== item.Loan_No));
      setUpdated(!updated);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const sortByColumn = (column) => {
    let sortedData = [];
    if (sortingColumn === column) {
      sortedData = loans
        .slice()
        .sort((a, b) =>
          b[column].toString().localeCompare(a[column].toString())
        );
      setSortingColumn("");
    } else {
      sortedData = loans
        .slice()
        .sort((a, b) =>
          a[column].toString().localeCompare(b[column].toString())
        );
      setSortingColumn(column);
    }
    setLoans(sortedData);
    setActiveColumn(column);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="py-3 px-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("Loan_No")}
              >
                Loan No
                {activeColumn === "Loan_No" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="py-3 px-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("FirstName")}
              >
                Customer Name
                {activeColumn === "FirstName" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="py-3 px-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("LoanType")}
              >
                Loan Type
                {activeColumn === "LoanType" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="py-3 px-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("Amount")}
              >
                Amount
                {activeColumn === "Amount" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="py-3 px-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("Interest")}
              >
                Rate of Interest
                {activeColumn === "Interest" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="py-3 px-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("DOB")}
              >
                Date of Borrowing
                {activeColumn === "DOB" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="py-3 px-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("Document")}
              >
                Document
                {activeColumn === "Document" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="py-3 px-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => sortByColumn("Status")}
              >
                Status
                {activeColumn === "Status" && (sortingColumn ? " ↑" : " ↓")}
              </div>
            </th>
            <th className="py-3 px-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((data, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="py-2 px-3 font-normal text-base border-t whitespace-nowrap">
                {data.Loan_No}
              </td>
              <td className="py-2 px-3 font-normal text-base border-t whitespace-nowrap">
                {data.FirstName} {data.LastName}
              </td>
              <td className="py-2 px-3 font-normal text-base border-t whitespace-nowrap">
                {data.LoanType}
              </td>
              <td className="py-2 px-3 text-base font-normal border-t whitespace-nowrap">
                {"₹ " + data.Amount}
              </td>
              <td className="py-5 px-4 text-base font-normal border-t">
                {data.Interest}
              </td>
              <td className="py-5 px-4 text-base font-normal border-t">
                {moment(data.DOB).format("DD-MM-YYYY")}
              </td>
              <td className="py-5 px-4 text-base font-normal border-t">
                {data.Document}
              </td>
              <td className="px-4 py-5 text-base font-normal border-t">
                {data.Status.toLowerCase().match("open") ? (
                  <button
                    type="button"
                    className="font-medium text-green-600 dark:text-green-500 hover:text-green-100"
                  >
                    {data.Status}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="font-medium text-red-600 dark:text-red-500 hover:text-red-100"
                  >
                    {data.Status}
                  </button>
                )}
              </td>
              <td className="px-4 py-5 text-base font-normal border-t">
                <button
                  onClick={() => handleUpdate(data)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(data)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                >
                  Delete
                </button>
                {data.Status.toLowerCase().match("open") ? (
                  <button
                    onClick={() => handleStatus(data)}
                    className="font-medium text-yellow-400 dark:text-yellow-500 hover:underline ms-3"
                  >
                    Close
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DepositLoanModel
        setUpdatedData={setUpdated}
        loans={current}
        setShowModal={setShow}
        showModal={show}
      />
    </div>
  );
};

export default DepositSpecificLoan;
