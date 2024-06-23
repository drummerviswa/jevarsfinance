import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpecificEMIEntry from "../components/tables/SpecificEMIEntry";
import EMISpecificForm from "../components/forms/EMISpecificForm";
import EMICustomer from "../components/EMICustomer";
import EMISpecificLoan from "../components/tables/EMISpecificLoan";

function EMISpecific() {
  useEffect(() => {
    document.title= "EMI - Specific";
  }, [])
  const emi = useSelector((state) => state.emi);
  const [updated,setUpdated] = useState(false)
  return (
    <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8 py-10">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transhtmlForm-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          ></div>
          <div className="items-center mx-auto max-w-2xl py-10 sm:py-10 lg:py-36">
            <EMISpecificForm updated={updated} setUpdated={setUpdated} />
          </div>
          {emi.length!=0&&emi[0]!="-1"?(<>
            <div>
              <h1 className="text-center font-bold">Customer details</h1>
              <EMICustomer updated={updated} setUpdated={setUpdated} person={emi[0]} />
            </div>
            <div>
              <h1 className="text-center font-bold">Loan details</h1>
              <EMISpecificLoan updated={updated} setUpdated={setUpdated} />
            </div>
            <div className="mt-3">
              <h1 className="text-center font-bold">
                Interest Payment details
              </h1>
              <SpecificEMIEntry updated={updated} setUpdated={setUpdated} />
            </div>
          </>):<></>}
        </div>
      </div>
  )
}

export default EMISpecific