import React from "react";

function BalanceTable({ items, total }) {
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  return (
    <div>
      <div className="mt-5 relative overflow-x-auto bg-white dark:bg-gray-900 rounded-xl py-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Month
              </th>
              <th scope="col" className="px-6 py-3 border-x border-gray-700">
                Interest Credited
              </th>
              <th scope="col" className="px-6 py-3 border-x border-gray-700">
                Interest Debited
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Balance Interest's
              </th>
              <th scope="col" className="px-6 py-3 border-x border-gray-700">
                Principal Credited
              </th>
              <th scope="col" className="px-6 py-3 border-x border-gray-700">
                Principal Debited
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Balance Principal's
              </th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((o, index) => (
                <tr key={index} className="bg-white dark:bg-gray-800 border-y border-y-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {getMonthName(parseInt(o.Month))}
                  </th>
                  <td className="px-6 py-4 border-x border-gray-700">
                    ₹ {parseInt(o.total_credit, 10)}
                  </td>
                  <td className="px-6 py-4 border-x border-gray-700">
                    ₹ {parseInt(o.total_debit, 10)}
                  </td>
                  <td className="px-6 py-4">
                    {parseFloat(o.total_balance).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 border-x border-gray-700">
                    ₹ {parseInt(o.total_loan_principal, 10)}
                  </td>
                  <td className="px-6 py-4 border-x border-gray-700">
                    ₹ {parseInt(o.total_deposit_principal, 10)}
                  </td>
                  <td className="px-6 py-4 border-x border-gray-700">
                    ₹ {parseInt(o.total_principal_balance, 10)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 py-2 flex flex-col justify-center items-center text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
        <table>
          {total &&
            total.map((i, index) => (
              <div className="">
              <h1 className="font-bold text-black">Including Interest and Principals</h1>
              <thead key={index} className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Overall Loans
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ₹ {parseFloat(i.Total_loans).toFixed(2)}
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Overall EMI's
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ₹ {parseFloat(i.Total_emis).toFixed(2)}
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Overall Loans + EMI's
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ₹ {parseFloat(i.Total_credits).toFixed(2)}
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Overall Deposits
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ₹ {parseFloat(i.Total_debits).toFixed(2)}
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Total Tally
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ₹ {parseFloat(i.Total_balance).toFixed(2)}
                  </th>
                </tr>
              </thead>
            </div>
            ))}
        </table>
      </div>
    </div>
  );
}

export default BalanceTable;
