import React, { useCallback, useEffect, useState } from "react";
import ProfitTable from "../components/ProfitTable";
import moment from "moment"
import { utils, writeFile } from "xlsx";

function LoanProfits() {
  const [loans, setLoans] = useState([]);
  const [total, setTotal] = useState([]);
  let entire = [...loans, [{}], ...total];
  let Heading = [
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
  const today = moment().format("DD/MM/YYYY");
  const exportFile = useCallback(() => {
    const ws1 = utils.json_to_sheet(entire, { skipHeader: true });
    utils.sheet_add_aoa(ws1, Heading);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws1, "Loan Profits");
    writeFile(wb, `LoanProfits_${today}.xlsx`);
  }, [loans]);
  useEffect(() => {
    fetch("http://localhost:8800/api/profit/loans/", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setLoans(data);
      })
      .catch((error) => console.log(error));
    fetch("http://localhost:8800/api/profit/loans/total", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setTotal(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-20 lg:px-8">
        <div className="max-w-[900px] m-auto px-4 py-24">
          <h1 className="text-center font-bold text-2xl">Loans Analysis</h1>
          <ProfitTable items={loans} total={total} />
          <div className="flex justify-center">
          <button onClick={exportFile} type="button" class="flex text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Export</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanProfits;
