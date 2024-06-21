import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { utils, writeFile } from "xlsx";
import DepositEntryModal from "../modals/DepositEntryModal";

function EMIValidityTable() {
  const [show, setShow] = useState(false);
  const [validity, setValidity] = useState([]);
  const [activeColumn, setActiveColumn] = useState("Amount");
  const [sortingColumn, setSortingColumn] = useState("Amount");
  const [current, setCurrent] = useState({});
  const customer = useSelector((state) => state.customer);
  useEffect(() => {
    fetch(`http://localhost:8800/api/emi/validity`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setValidity(data);
      })
      .catch((error) => console.log(error));
  }, []);
  const sortByColumn = (column) => {
    let sortedData = [];
    if (sortingColumn === column) {
      sortedData = validity
        .slice()
        .sort((a, b) =>
          b[column].toString().localeCompare(a[column].toString())
        );
      setSortingColumn("");
    } else {
      sortedData = validity
        .slice()
        .sort((a, b) =>
          a[column].toString().localeCompare(b[column].toString())
        );
      setSortingColumn(column);
    }
    setValidity(sortedData);
    setActiveColumn(column);
  };
  const now = moment();
  let Heading = [
    [
      "CustomerID",
      "First Name",
      "Last Name",
      "Father Name",
      "Mother Name",
      "Mobile No",
      "Address",
      "Customer Type",
      "Loan No",
      "Loan Type",
      "Loan Amount",
      "Rate of Interest",
      "Date of Borrow",
      "Document",
      "Advance Payment",
      "Loan Status",
      "Entry ID",
      "Pay Date",
      "Pay Amount",
      "Validity"
    ],
  ];
  const today = moment().format("DD/MM/YYYY");
  const exportFile = useCallback(() => {
    const wb = utils.book_new();
    const ws1 = utils.book_new()
    utils.sheet_add_aoa(ws1, Heading);
    utils.sheet_add_json(ws1, validity, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws1, "EMI Validity");
    writeFile(wb, `EMIValidity_${today}.xlsx`);
  }, [validity]);
  return (
    <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
      {validity.length != 0 ? (
        <>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => sortByColumn("Entry_ID")}
                >
                  Entry ID
                  {activeColumn === "Entry_ID" && (sortingColumn ? " ↑" : " ↓")}
                </div>
              </th>
              <th className="px-6 py-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => sortByColumn("Loan_No")}
                >
                  Loan No
                  {activeColumn === "Loan_No" && (sortingColumn ? " ↑" : " ↓")}
                </div>
              </th>
              <th className="px-6 py-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => sortByColumn("Amount")}
                >
                  Loan Amount
                  {activeColumn === "Amount" && (sortingColumn ? " ↑" : " ↓")}
                </div>
              </th>
              <th className="px-6 py-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => sortByColumn("LoanType")}
                >
                  Loan Type
                  {activeColumn === "LoanType" && (sortingColumn ? " ↑" : " ↓")}
                </div>
              </th>
              <th className="px-6 py-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => sortByColumn("Cus_ID")}
                >
                  Customer ID
                  {activeColumn === "Cus_ID" && (sortingColumn ? " ↑" : " ↓")}
                </div>
              </th>
              <th className="px-6 py-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => sortByColumn("FirstName")}
                >
                  Customer Name
                  {activeColumn === "FirstName" &&
                    (sortingColumn ? " ↑" : " ↓")}
                </div>
              </th>
              <th className="px-6 py-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => sortByColumn("Pay_Date")}
                >
                  Payment Date
                  {activeColumn === "Pay_Date" && (sortingColumn ? " ↑" : " ↓")}
                </div>
              </th>
              <th className="px-6 py-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => sortByColumn("Pay_Amount")}
                >
                  Paid Amount
                  {activeColumn === "Pay_Amount" &&
                    (sortingColumn ? " ↑" : " ↓")}
                </div>
              </th>
              <th className="px-6 py-3">Remaining</th>
              <th className="px-6 py-3">
                <div className="flex items-center cursor-pointer">Validity</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {validity &&
              validity.map((item) => (
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
                  <td className="px-6 py-4">
                    {item.FirstName} {item.LastName}
                  </td>
                  <td className="px-6 py-4">
                    {moment(item.Pay_Date).format("DD-MM-YYYY")}
                  </td>
                  <td className="px-6 py-4">{item.Pay_Amount}</td>
                  <td className="px-6 py-4">
                    {-1 * moment(item.Validity).diff(now, "months") > 0 ? (
                      <>
                        {-1 * moment(item.Validity).diff(now, "months")} months
                        and
                      </>
                    ) : (
                      <></>
                    )}{" "}
                    {-1 *
                      moment(item.Validity).diff(
                        now.add(
                          moment(item.Validity).diff(now, "months"),
                          "months"
                        ),
                        "days"
                      )}{" "}
                    days
                  </td>
                  <td className="px-6 py-4">
                    {moment(item.Validity).format("DD-MM-YYYY")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-center pt-5">
            <button
              onClick={exportFile}
              type="button"
              class="flex text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Export
            </button>
          </div>
        </>
      ) : (
        <div className="w-full rtl:text-right text-black text-center">
          No Entries found
        </div>
      )}
      <DepositEntryModal
        interest={current}
        setShowModal={setShow}
        showModal={show}
      />
    </div>
  );
}

export default EMIValidityTable;
