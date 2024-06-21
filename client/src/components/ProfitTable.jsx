import React from "react";

function ProfitTable({ items, total }) {
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
                Total Amount Given
              </th>
              <th scope="col" className="px-6 py-3 border-x border-gray-700">
                Monthly Entries
              </th>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Average Interest
              </th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((o) => (
                <tr key={o.total_amount} className="bg-white dark:bg-gray-800 border-y border-y-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {parseInt(o.month)}
                  </th>
                  <td className="px-6 py-4 border-x border-gray-700">
                    ₹ {parseInt(o.total_amount,10)}
                  </td>
                  <td className="px-6 py-4 border-x border-gray-700">
                    ₹ {parseInt(o.total_interest,10)}
                  </td>
                  <td className="px-6 py-4">{parseFloat(o.avg_interest).toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 py-2 flex flex-col justify-center items-center text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
        <table>
          {total &&
            total.map((i) => (
              <thead key={i.Total_avg_interest} className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Overall Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {parseFloat(i.Total_total_amount).toFixed(2)}
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Overall Interest Credited
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {parseFloat(i.Total_total_interest).toFixed(2)}
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Average Rate of Interest
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {parseFloat(i.Total_avg_interest).toFixed(2)}
                  </th>
                </tr>
              </thead>
            ))}
        </table>
      </div>
    </div>
  );
}

export default ProfitTable;
