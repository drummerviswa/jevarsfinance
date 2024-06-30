import React, { useCallback, useEffect, useState } from "react";
import ProfitTable from "../components/ProfitTable";
import moment from "moment";
import { utils, writeFile } from "xlsx";

function LoanProfits() {
  useEffect(() => {
    document.title = "Profit - Loans";
  }, []);

  const [loans, setLoans] = useState([]);
  const [total, setTotal] = useState([]);
  const [loanTotal, setloanTotal] = useState([]);
  const [form, setForm] = useState({
    year: new Date().getFullYear().toString(), // Set current year as default
  });
  const [no, setNo] = useState([]);
  const [overall, setOverall] = useState([]);
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const currentYear = new Date().getFullYear();

  function get5YearsBeforeAndAfter() {
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  }

  const years = get5YearsBeforeAndAfter();

  let entire = [...loans, [{}], ...total];
  let Heading = [
    [
      "Month",
      "Total Amount Given",
      "Monthly Entries",
      "Monthly Principal",
      "Average Interest",
      "",
      "Overall Amount",
      "Overall Entries",
      "Overall Principal",
      "Overall Average Interest",
    ],
  ];

  const today = moment().format("DD/MM/YYYY");

  const exportFile = useCallback(() => {
    const ws1 = utils.json_to_sheet(entire, { skipHeader: true });
    utils.sheet_add_aoa(ws1, Heading);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws1, "Loan Profits");
    writeFile(wb, `LoanProfits_${today}.xlsx`);
  }, [loans]);

  useEffect(() => {
    fetch(`https://jevarsfinance.onrender.com/api/profit/loans/e/${form.year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLoans(data);
      })
      .catch((error) => console.log(error));

    fetch(`https://jevarsfinance.onrender.com/api/profit/loans/total/${form.year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setTotal(data);
      })
      .catch((error) => console.log(error));
    fetch("https://jevarsfinance.onrender.com/api/profit/loans/c/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setNo(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/profit/loans/overall/${currentYear}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setOverall(data);
      })
      .catch((error) => console.log(error));
    fetch(`https://jevarsfinance.onrender.com/api/profit/loans/l/`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setloanTotal(data);
      })
      .catch((error) => console.log(error));
  }, [form]);
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-20 lg:px-8">
        <div className="max-w-[900px] m-auto px-4 py-24">
          <h1 className="text-center font-bold text-2xl">Loans Analysis</h1>
          <div className="py-5">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col justify-start">
                <h2 className="font-bold">
                  Overall loan amount till {currentYear}: ₹
                  {(overall[0] && overall[0].Amount) || 0}
                </h2>
                <h2 className="font-bold">
                  Overall average rate of interest till {currentYear}:{" "}
                  {(parseFloat(overall[0] && overall[0].Interest).toFixed(2)) || 0}%
                </h2>
              </div>
              <div className="flex justify-end">
                <h2 className="font-bold">
                  No of currently available customers:{" "}
                  {no[0] ? no[0].cus_count : 0}
                </h2>
              </div>
              <div className="flex justify-end">
                <h2 className="font-bold">
                  No of currently available loans:{" "}
                  {loanTotal[0] ? loanTotal[0].loan_count : 0}
                </h2>
              </div>
            </div>
            <div className="justify-start">
              <select
                onChange={handleInput}
                name="year"
                defaultValue={form.year}
              >
                <option value="">Choose a year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {form.year && loans.length != 0 ? (
            <>
              <ProfitTable items={loans} total={total} />
              <div className="flex justify-center">
                <button
                  onClick={exportFile}
                  type="button"
                  className="flex text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Export
                </button>
              </div>
            </>
          ) : (
            <div>
              <h1 className="font-bold text-center">No record found for this year</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanProfits;
