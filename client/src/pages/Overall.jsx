import ReactToPrint from "react-to-print";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { utils, writeFile } from "xlsx";
import ProfitTable from "../components/ProfitTable";
import Icon from "react-icons-kit";
import { ic_call } from "react-icons-kit/md/ic_call";
import BalanceTable from "../components/BalanceTable";
function Overall() {
  const now = moment();
  const [Ploans, setPLoans] = useState([]);
  const [PDeposits, setPDeposits] = useState([]);
  const [PEMI, setEMI] = useState([]);
  const [Ltotal, setLTotal] = useState([]);
  const [Ptotal, setPTotal] = useState([]);
  const [Etotal, setETotal] = useState([]);
  const [entries, setEntries] = useState([]);
  const [Dentries, setDEntries] = useState([]);
  const [Eentries, setEEntries] = useState([]);
  const [loans, setLoans] = useState([]);
  const [dloans, setDLoans] = useState([]);
  const [EMIloans, setEMILoans] = useState([]);
  const [EMICustomers, setEMICustomers] = useState([]);
  const [loanCustomers, setLoanCustomers] = useState([]);
  const [depositCustomers, setDepositCustomers] = useState([]);
  const [Emivalidity, setEmiValidity] = useState([]);
  const [Loanvalidity, setLoanValidity] = useState([]);
  const [DepositValidity, setDepositValidity] = useState([]);
  const [emi, setEmi] = useState([]);
  const [total, setTotal] = useState([]);
  const [till, setTill] = useState([]);
  useEffect(() => {
    document.title = `${now.format("DD/MM/YYYY")} Overall`;
  }, []);
  var currentTime = new Date();
  const year = currentTime.getFullYear();
  useEffect(() => {
    fetch(`https://jevarsfinance.onrender.com/api/profit/emi/e/${year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEMI(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/profit/emi/total/${year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setETotal(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/profit/deposit/e/${year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setPDeposits(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/profit/deposit/total/${year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setPTotal(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/profit/loans/e/${year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setPLoans(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/profit/loans/total/${year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLTotal(data);
      })
      .catch((error) => console.log(error));
    fetch("https://jevarsfinance.onrender.com/api/emi/entries/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEEntries(data);
      })
      .catch((error) => console.log(error));
    fetch("https://jevarsfinance.onrender.com/api/deposit/entries/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setDEntries(data);
      })
      .catch((error) => console.log(error));
    fetch("https://jevarsfinance.onrender.com/api/entries/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEntries(data);
      })
      .catch((error) => console.log(error));
    fetch("https://jevarsfinance.onrender.com/api/emi/loans/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEMILoans(data);
      })
      .catch((error) => console.log(error));
    fetch("https://jevarsfinance.onrender.com/api/deposit/loans/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setDLoans(data);
      })
      .catch((error) => console.log(error));
    fetch("https://jevarsfinance.onrender.com/api/loans/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLoans(data);
      })
      .catch((error) => console.log(error));
    fetch("https://jevarsfinance.onrender.com/api/emi/customers/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEMICustomers(data);
      })
      .catch((error) => console.log(error));
    fetch("https://jevarsfinance.onrender.com/api/deposit/customers/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLoanCustomers(data);
      })
      .catch((error) => console.log(error));
    fetch("https://jevarsfinance.onrender.com/api/customers/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setDepositCustomers(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/validity`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLoanValidity(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/deposit/validity`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setDepositValidity(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/emi/validity`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEmiValidity(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/profit/balance/e/${year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEmi(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/profit/balance/total/${year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setTotal(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/profit/balance/till/${year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setTill(data);
      })
      .catch((error) => console.log(error));
  }, []);

  let ProfitHeading = [
    [
      "Month",
      "Total Amount Given",
      "Monthly Entries",
      "Average Interest",
      "",
      "Overall Amount",
      "Overall Entries",
      "Overall Average Interest",
    ],
  ];
  let EntriesHeading = [
    [
      "First Name",
      "Last Name",
      "Loan No",
      "CustomerID",
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
      "Validity",
    ],
  ];
  let CustomersHeading = [
    [
      "CustomerID",
      "First Name",
      "Last Name",
      "Father Name",
      "Mother Name",
      "Mobile No",
      "Address",
      "Customer Type",
    ],
  ];
  let ValidityHeading = [
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
      "Validity",
    ],
  ];
  let LoanHeading = [
    [
      "First Name",
      "Last Name",
      "Loan No",
      "CustomerID",
      "Loan Type",
      "Loan Amount",
      "Rate of Interest",
      "Date of Borrow",
      "Document",
      "Advance Payment",
      "Loan Status",
    ],
  ];
  let Lentire = [...Ploans, [{}], ...Ltotal];
  let Pentire = [...PDeposits, [{}], ...Ptotal];
  let Eentire = [...PEMI, [{}], ...Etotal];
  const today = moment().format("DD/MM/YYYY");
  const exportFile = useCallback(() => {
    //File creation
    const wb = utils.book_new();
    //Sheets Creation
    const wsLoanEntries = utils.book_new();
    const wsDepositEntries = utils.book_new();
    const wsEMIEntries = utils.book_new();
    const wsLoans = utils.book_new();
    const wsDepositLoans = utils.book_new();
    const wsEMILoans = utils.book_new();
    const wsLoanCustomer = utils.book_new();
    const wsEMICustomer = utils.book_new();
    const wsdepositCustomers = utils.book_new();
    const wsLoanValidity = utils.book_new();
    const wsDepositValidity = utils.book_new();
    const wsEMIValidity = utils.book_new();
    // Loan Customers
    utils.sheet_add_aoa(wsLoanCustomer, CustomersHeading);
    utils.sheet_add_json(wsLoanCustomer, loanCustomers, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsLoanCustomer, "Loan Customers");
    //Deposit Customers
    utils.sheet_add_aoa(wsdepositCustomers, CustomersHeading);
    utils.sheet_add_json(wsdepositCustomers, depositCustomers, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsdepositCustomers, "Deposit Customers");
    //EMI Customers
    utils.sheet_add_aoa(wsEMICustomer, CustomersHeading);
    utils.sheet_add_json(wsEMICustomer, EMICustomers, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsEMICustomer, "EMI Customers");
    //Loans
    utils.sheet_add_aoa(wsLoans, LoanHeading);
    utils.sheet_add_json(wsLoans, loans, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsLoans, "Loans");
    //Deposit Loans
    utils.sheet_add_aoa(wsDepositLoans, LoanHeading);
    utils.sheet_add_json(wsDepositLoans, dloans, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsDepositLoans, "Deposit Loans");
    //EMI Loans
    utils.sheet_add_aoa(wsEMILoans, LoanHeading);
    utils.sheet_add_json(wsEMILoans, EMIloans, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsEMILoans, "EMI Loans");
    //Loan Entries
    utils.sheet_add_aoa(wsLoanEntries, EntriesHeading);
    utils.sheet_add_json(wsLoanEntries, entries, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsLoanEntries, "Loan Entries");
    //Deposit Entries
    utils.sheet_add_aoa(wsDepositEntries, EntriesHeading);
    utils.sheet_add_json(wsDepositEntries, Dentries, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsDepositEntries, "Deposit Entries");
    //EMI Entries
    utils.sheet_add_aoa(wsEMIEntries, EntriesHeading);
    utils.sheet_add_json(wsEMIEntries, Eentries, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsEMIEntries, "EMI Entries");
    //Loan Validity
    utils.sheet_add_aoa(wsLoanValidity, ValidityHeading);
    utils.sheet_add_json(wsLoanValidity, Loanvalidity, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsLoanValidity, "Loan Validity");
    //Deposit Validity
    utils.sheet_add_aoa(wsDepositValidity, ValidityHeading);
    utils.sheet_add_json(wsDepositValidity, DepositValidity, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsDepositValidity, "Deposit Validity");
    //EMI Validity
    utils.sheet_add_aoa(wsEMIValidity, ValidityHeading);
    utils.sheet_add_json(wsEMIValidity, Emivalidity, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, wsEMIValidity, "EMI Validity");
    //Loan Profits
    const ws1 = utils.json_to_sheet(Lentire, { skipHeader: true });
    utils.sheet_add_aoa(ws1, ProfitHeading);
    utils.sheet_add_aoa(Lentire, ProfitHeading);
    utils.book_append_sheet(wb, ws1, "Loan Profits");
    //Deposit Profits
    const ws2 = utils.json_to_sheet(Pentire, { skipHeader: true });
    utils.sheet_add_aoa(ws2, ProfitHeading);
    utils.sheet_add_json(ws2, PDeposits);
    utils.book_append_sheet(wb, ws2, "Deposit Profits");
    //EMI Profits
    const ws3 = utils.json_to_sheet(Eentire, { skipHeader: true });
    utils.sheet_add_aoa(ws3, ProfitHeading);
    utils.sheet_add_json(ws3, PEMI);
    utils.book_append_sheet(wb, ws3, "EMI Profits");
    //File write
    writeFile(wb, `Overall_${today}.xlsx`);
  }, []);
  const componentRef = useRef();
  return (
    <div ref={componentRef} className="bg-white">
      <div className="relative isolate px-6 lg:px-8">
        <div className="items-center justify-center flex  mx-auto py-32 flex-col">
          <div className="flex flex-row">
            <ReactToPrint
              pageStyle="@page {
    size: A4 landscape;
  }"
              trigger={() => (
                <button
                  type="button"
                  className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  PDF
                </button>
              )}
              content={() => componentRef.current}
              documentTitle={`${now.format("DD/MM/YYYY")} Overall`}
            />
            <button
              onClick={exportFile}
              type="button"
              className="flex text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Export
            </button>
          </div>
          <div>
            <div className="flex justify-center py-3">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className="font-bold text-center">Loan Customers</h1>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3">
                        <div className="flex items-center cursor-pointer">
                          ID
                        </div>
                      </th>
                      <th className="px-6 py-3">
                        <div className="flex items-center cursor-pointer">
                          First Name
                        </div>
                      </th>
                      <th className="px-6 py-3">
                        <div className="flex items-center cursor-pointer">
                          Last Name
                        </div>
                      </th>
                      <th className="px-6 py-3">
                        <div className="flex items-center cursor-pointer">
                          Father's Name
                        </div>
                      </th>
                      <th className="px-6 py-3">
                        <div className="flex items-center cursor-pointer">
                          Mother's Name
                        </div>
                      </th>
                      <th className="px-6 py-3">
                        <div className="flex items-center cursor-pointer">
                          Address
                        </div>
                      </th>
                      <th className="px-6 py-3">
                        <div className="flex items-center cursor-pointer">
                          Mobile no
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanCustomers &&
                      loanCustomers.map((item) => (
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
                          <td
                            onClick={() =>
                              window.open(`tel:+91${item.MobileNo}`)
                            }
                            className="cursor-pointer px-6 py-4"
                          >
                            {item.MobileNo}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-3">
              <h1 className="font-bold text-center">Deposit Customers</h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">ID</div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        First Name
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Last Name
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Father's Name
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Mother's Name
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Address
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Mobile no
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {depositCustomers &&
                    depositCustomers.map((item) => (
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
                        <td
                          onClick={() => window.open(`tel:+91${item.MobileNo}`)}
                          className="cursor-pointer px-6 py-4"
                        >
                          {item.MobileNo}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-3">
              <h1 className="font-bold text-center">EMI Customers</h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">ID</div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        First Name
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Last Name
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Father's Name
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Mother's Name
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Address
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Mobile no
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {EMICustomers &&
                    EMICustomers.map((item) => (
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
                        <td
                          onClick={() => window.open(`tel:+91${item.MobileNo}`)}
                          className="cursor-pointer px-6 py-4"
                        >
                          {item.MobileNo}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-3">
              <h1 className="font-bold text-center">Loans</h1>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Loan No
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Customer Name
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Loan Type
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Amount
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Rate of Interest
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Date of Borrowing
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Document
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Advance Payment
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Status
                      </div>
                    </th>
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
                      <td className="py-5 px-4 text-base font-normal border-t">
                        {data.AdvancePay}
                      </td>
                      <td className="px-4 py-5 text-base font-normal border-t">
                        {data.Status.toLowerCase().match("open") ? (
                          <button
                            type="button"
                            class="font-medium text-green-600 dark:text-green-500 hover:text-green-100"
                          >
                            {data.Status}
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="font-medium text-red-600 dark:text-red-500 hover:text-red-100"
                          >
                            {data.Status}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-3">
              <h1 className="font-bold text-center">Deposit Loans</h1>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Loan No
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Customer Name
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Loan Type
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Amount
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Rate of Interest
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Date of Borrowing
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Document
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Advance Payment
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Status
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dloans.map((data, index) => (
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
                      <td className="py-5 px-4 text-base font-normal border-t">
                        {data.AdvancePay}
                      </td>
                      <td className="px-4 py-5 text-base font-normal border-t">
                        {data.Status.toLowerCase().match("open") ? (
                          <button
                            type="button"
                            class="font-medium text-green-600 dark:text-green-500 hover:text-green-100"
                          >
                            {data.Status}
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="font-medium text-red-600 dark:text-red-500 hover:text-red-100"
                          >
                            {data.Status}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-3">
              <h1 className="font-bold text-center">EMI Loans</h1>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Loan No
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Customer Name
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Loan Type
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Amount
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Monthly Amount
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Time Period
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Rate of Interest
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Date of Borrowing
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Document
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div>Advance Payment</div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center cursor-pointer">
                        Status
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {EMIloans.map((data, index) => (
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
                      <td className="py-2 px-3 text-base font-normal border-t whitespace-nowrap">
                        {"₹ " + data.MonthlyAmount}
                      </td>
                      <td className="py-2 px-3 text-base font-normal border-t whitespace-nowrap">
                        {data.TimePeriod}
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
                      <td className="py-5 px-4 text-base font-normal border-t">
                        {data.advancePay}
                      </td>
                      <td className="px-4 py-5 text-base font-normal border-t">
                        {data.Status.toLowerCase().match("open") ? (
                          <button
                            type="button"
                            class="font-medium text-green-600 dark:text-green-500 hover:text-green-100"
                          >
                            {data.Status}
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="font-medium text-red-600 dark:text-red-500 hover:text-red-100"
                          >
                            {data.Status}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-3">
              <h1 className="font-bold text-center">Loan Entries</h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Entry ID
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Loan No
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Loan Amount
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Loan Type
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Customer ID
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Customer Name
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Payment Date
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Paid Amount
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Payment Type
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Entry Type
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Validity
                      </div>
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
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-3">
              <h1 className="font-bold text-center">Deposit Entries</h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Entry ID
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Loan No
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Loan Amount
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Loan Type
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Customer ID
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Customer Name
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Payment Date
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Paid Amount
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Payment Type
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Entry Type
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Validity
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Dentries &&
                    Dentries.map((item) => (
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
                        <td className="px-6 py-4">{item.Pay_Type}</td>
                        <td className="px-6 py-4">{item.Entry_Type}</td>
                        <td className="px-6 py-4">
                          {moment(item.Validity).format("DD-MM-YYYY")}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="font-bold text-center">EMI Entries</h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Entry ID
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Loan No
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Loan Amount
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Loan Type
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Customer ID
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Customer Name
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        EMI No
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Payment Date
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Paid Amount
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Payment Type
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Entry Type
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      <div className="flex items-center cursor-pointer">
                        Validity
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Eentries &&
                    Eentries.map((item) => (
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
                        <td className="px-6 py-4">{item.EMINo}</td>
                        <td className="px-6 py-4">
                          {moment(item.Pay_Date).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-6 py-4">{item.Pay_Amount}</td>
                        <td className="px-6 py-4">{item.Pay_Type}</td>
                        <td className="px-6 py-4">{item.Entry_Type}</td>
                        <td className="px-6 py-4">
                          {moment(item.Validity).format("DD-MM-YYYY")}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="font-bold text-center">Loan Validity</h1>
              {Loanvalidity.length != 0 ? (
                <>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Entry ID
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Loan No
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Loan Amount
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Loan Type
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Customer ID
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Customer Name
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Mobile No
                          </div>
                        </th>
                        <th className="px-6 py-3">Remaining</th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Validity
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Loanvalidity &&
                        Loanvalidity.map((item) => (
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
                            <td className="flex flex-row items-center justify-center px-6 py-4">
                              <p className="text-center p-3">{item.MobileNo}</p>
                              <button
                                onClick={() =>
                                  window.open(`tel:+91${item.MobileNo}`)
                                }
                                className="flex py-0.5 px-1 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                              >
                                Call <Icon icon={ic_call} size={15} />
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              {-1 * moment(item.Validity).diff(now, "months") >
                              0 ? (
                                <>
                                  {-1 *
                                    moment(item.Validity).diff(
                                      now,
                                      "months"
                                    )}{" "}
                                  monthsand
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
                              days{" "}
                            </td>
                            <td className="px-6 py-4">
                              {moment(item.Validity).format("DD-MM-YYYY")}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <div className="w-full rtl:text-right text-black text-center">
                  No Entries found
                </div>
              )}
            </div>
            <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="font-bold text-center">Deposit Validity</h1>
              {DepositValidity.length != 0 ? (
                <>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Entry ID
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Loan No
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Loan Amount
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Loan Type
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Customer ID
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Customer Name
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Mobile No
                          </div>
                        </th>
                        <th className="px-6 py-3">Remaining</th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Validity
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {DepositValidity &&
                        DepositValidity.map((item) => (
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
                            <td className="flex flex-row items-center justify-center px-6 py-4">
                              <p className="text-center p-3">{item.MobileNo}</p>
                              <button
                                onClick={() =>
                                  window.open(`tel:+91${item.MobileNo}`)
                                }
                                className="flex py-0.5 px-1 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                              >
                                Call <Icon icon={ic_call} size={15} />
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              {-1 * moment(item.Validity).diff(now, "months") >
                              0 ? (
                                <>
                                  {-1 *
                                    moment(item.Validity).diff(
                                      now,
                                      "months"
                                    )}{" "}
                                  monthsand{" "}
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
                </>
              ) : (
                <div className="w-full rtl:text-right text-black text-center">
                  No Entries found
                </div>
              )}
            </div>
            <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="font-bold text-center">EMI Validity</h1>
              {Emivalidity.length != 0 ? (
                <>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Entry ID
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Loan No
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Loan Amount
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Loan Type
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Customer ID
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Customer Name
                          </div>
                        </th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Mobile No
                          </div>
                        </th>
                        <th className="px-6 py-3">Remaining</th>
                        <th className="px-6 py-3">
                          <div className="flex items-center cursor-pointer">
                            Validity
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Emivalidity &&
                        Emivalidity.map((item) => (
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
                            <td className="flex flex-row items-center justify-center px-6 py-4">
                              <p className="text-center p-3">{item.MobileNo}</p>
                              <button
                                onClick={() =>
                                  window.open(`tel:+91${item.MobileNo}`)
                                }
                                className="flex py-0.5 px-1 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                              >
                                Call <Icon icon={ic_call} size={15} />
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              {-1 * moment(item.Validity).diff(now, "months") >
                              0 ? (
                                <>
                                  {-1 *
                                    moment(item.Validity).diff(
                                      now,
                                      "months"
                                    )}{" "}
                                  monthsand{" "}
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
                </>
              ) : (
                <div className="w-full rtl:text-right text-black text-center">
                  No Entries found
                </div>
              )}
            </div>
            <div className="relative isolate px-6 lg:px-8">
              <h1 className="font-bold text-center">Loan Profits</h1>
              <ProfitTable items={Ploans} total={Ltotal} />
            </div>
            <div className="relative isolate px-6 lg:px-8">
              <h1 className="font-bold text-center">Deposit Profits</h1>
              <ProfitTable items={PDeposits} total={Ptotal} />
            </div>
            <div className="relative isolate px-6 lg:px-8">
              <h1 className="font-bold text-center">EMI Profits</h1>
              <ProfitTable items={PEMI} total={Etotal} />
            </div>
          </div>
          <div className="relative isolate px-6 pt-20 lg:px-8">
            <div className="max-w-[900px] m-auto px-4 py-24">
              <h1 className="text-center font-bold text-2xl">
                Balance Analysis
              </h1>
              {year ? (
                <BalanceTable items={emi} total={total} till={till} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overall;
