import React, { useCallback, useEffect, useState } from "react";
import ProfitTable from "../components/ProfitTable";
import { utils, writeFile } from "xlsx";
import moment from "moment";

function EMIProfits() {
  useEffect(() => {
    document.title= "Profit - EMI";
  }, [])
  const [emi, setEmi] = useState([]);
  const [total, setTotal] = useState([]);
  const [form, setForm] = useState({
    year: new Date().getFullYear().toString(),
  });
  const currentYear = new Date().getFullYear();
  function get5YearsBeforeAndAfter() {
    const years = [];
    
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        years.push(i);
    }
    
    return years;
  }
  const years = get5YearsBeforeAndAfter();
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  let entire = [...emi,[{}], ...total];
  useEffect(() => {
    fetch(`https://app-1odw.onrender.com/api/profit/emi/e/${form.year}`, {
      method: "GET",
    })
    .then(async (response) => response.json())
      .then((data) => {
        setEmi(data);
      })
      .catch((error) => console.log(error));
      fetch(`https://app-1odw.onrender.com/api/profit/emi/total/${form.year}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setTotal(data);
      })
      .catch((error) => console.log(error));
    }, [form]);
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
    console.log(entire);
    const exportFile = useCallback(() => {
      const ws1 = utils.json_to_sheet(entire, { skipHeader: true });
      utils.sheet_add_aoa(ws1, Heading);
      utils.sheet_add_json(ws1,emi);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws1, "EMI Profits");
      writeFile(wb, `EMIProfits_${today}.xlsx`);
    }, [emi]);
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-20 lg:px-8">
        <div className="max-w-[900px] m-auto px-4 py-24">
          <h1 className="text-center font-bold text-2xl">EMI Analysis</h1>
          <select onChange={handleInput} name="year" defaultValue={form.year}>
            <option value="">Choose an year</option>
            {years.map((y)=>(
            <option value={y}>{y}</option>
            ))}
          </select>
          {form.year ? <ProfitTable items={emi} total={total} /> : <></>}
          <div className="flex justify-center">
            <button
              onClick={exportFile}
              type="button"
              class="flex text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EMIProfits;
