import React, { useEffect, useState } from "react";

function EMICustomer({ updated, setUpdated, person }) {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetch(`https://app-1odw.onrender.com/api/emi/customers/${person["Cus_ID"]}`, {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => console.log(error));
  }, [updated]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-white my-3">
      {customers &&
        customers.map((item) => (
          <div className="flex lg:flex-row flex-col justify-between lg:px-20 px-8 py-5">
            <div className="flex flex-row">
              <p className="font-bold underline decoration-blue-500 hover:text-blue-500 text-gray-300">ID:</p>
              <p className="ps-1">{item.Cus_ID}</p>
            </div>
            <div className="flex flex-row">
              <p className="font-bold underline decoration-blue-500 hover:text-blue-500 text-gray-300">Name:</p>
              <p className="ps-1">
                {item.FirstName} {item.LastName}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="font-bold underline decoration-blue-500 hover:text-blue-500 text-gray-300">Father Name:</p>
              <p className="ps-1">{item.FatherName}</p>
            </div>
            <div className="flex flex-row">
              <p className="font-bold underline decoration-blue-500 hover:text-blue-500 text-gray-300">Address:</p>
              <p className="ps-1"> {item.Address}</p>
            </div>
            <div className="hover:text-gray-500 flex flex-row cursor-pointer" onClick={()=>window.open(`tel:+91${item.MobileNo}`)}>
              <p className="font-bold underline decoration-blue-500 hover:text-blue-500 text-gray-300">Mobile:</p>
              <p className="ps-1"> {item.MobileNo}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default EMICustomer;
