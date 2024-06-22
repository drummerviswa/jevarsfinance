import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
function Export() {
  const [Ploans, setPLoans] = useState([]);
  const [PDeposits,setPDeposits] = useState([]);
  const [PEMI,setEMI] = useState([]);
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
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/profit/emi/", {
      method: "GET",
    })
    .then(async (response) => response.json())
      .then((data) => {
        setEMI(data);
      })
      .catch((error) => console.log(error));
      fetch("http://15.206.73.76:8800/api/profit/emi/total", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setETotal(data);
      })
      .catch((error) => console.log(error));
    }, []);
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/profit/deposit/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setPDeposits(data);
      })
      .catch((error) => console.log(error));
    fetch("http://15.206.73.76:8800/api/profit/deposit/total", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setPTotal(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/profit/loans/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setPLoans(data);
      })
      .catch((error) => console.log(error));
    fetch("http://15.206.73.76:8800/api/profit/loans/total", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLTotal(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/emi/entries/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEEntries(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/deposit/entries/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setDEntries(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/entries/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEntries(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/emi/loans/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEMILoans(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/deposit/loans/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setDLoans(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/loans/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLoans(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/emi/customers/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEMICustomers(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/deposit/customers/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLoanCustomers(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch("http://15.206.73.76:8800/api/customers/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setDepositCustomers(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch(`http://15.206.73.76:8800/api/validity`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLoanValidity(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch(`http://15.206.73.76:8800/api/deposit/validity`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setDepositValidity(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch(`http://15.206.73.76:8800/api/emi/validity`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setEmiValidity(data);
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
    utils.sheet_add_json(ws3,PEMI);
    utils.book_append_sheet(wb, ws3, "EMI Profits");
    //File write
    writeFile(wb, `Overall_${today}.xlsx`);
  }, []);
  return (
    <div className="flex justify-center pt-5">
      <button
        onClick={exportFile}
        type="button"
        className="flex text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Export
      </button>
    </div>
  );
}

export default Export;
