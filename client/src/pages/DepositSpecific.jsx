import React, { useState } from "react";
import { useSelector } from "react-redux";
import SpecificEntry from "../components/tables/SpecificEntry";
import DepositSpecificForm from "../components/forms/DepositSpecific";
import DepositCustomer from "../components/DepositCustomer";
import DepositSpecificLoan from "../components/tables/DepositSpecificLoan";

function DepositSpecific() {
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
            <DepositSpecificForm updated={updated} setUpdated={setUpdated} />
          </div>
          {customer.length!=0&&customer[0]!="-1"?(<>
            <div>
              <h1 className="text-center font-bold">Customer details</h1>
              <DepositCustomer updated={updated} setUpdated={setUpdated} person={customer[0]} />
            </div>
            <div>
              <h1 className="text-center font-bold">Loan details</h1>
              <DepositSpecificLoan updated={updated} setUpdated={setUpdated} />
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
  )
}

export default DepositSpecific