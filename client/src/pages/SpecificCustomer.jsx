import React, { useEffect, useState } from "react";
import Specific from "../components/forms/Specfic";
import { useSelector } from "react-redux";
import SpecificLoan from "../components/tables/SpecificLoan";
import SpecificEntry from "../components/tables/SpecificEntry";
import CustomerDetails from "../components/CustomerDetails";

function SpecificCustomer() {
  useEffect(() => {
    document.title= "Loan - Specific";
  }, [])
  const customer = useSelector((state) => state.customer);
  const [updated,setUpdated] = useState(false)
  return (
      <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8 py-10">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transhtmlForm-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          ></div>
          <div className="items-center mx-auto max-w-2xl py-10 sm:py-10 lg:py-36">
            <Specific updated={updated} setUpdated={setUpdated} />
          </div>
          {customer.length!=0&&customer[0]!="-1"?(<>
            <div>
              <h1 className="text-center font-bold">Customer details</h1>
              <CustomerDetails updated={updated} setUpdated={setUpdated} person={customer[0]} />
            </div>
            <div>
              <h1 className="text-center font-bold">Loan details</h1>
              <SpecificLoan updated={updated} setUpdated={setUpdated} />
            </div>
            <div className="mt-3">
              <h1 className="text-center font-bold">
                Interest Payment details
              </h1>
              <SpecificEntry updated={updated} setUpdated={setUpdated} />
            </div>
          </>):<></>}
        </div>
      </div>
  );
}

export default SpecificCustomer;
