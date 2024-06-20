import React from "react";
import DepositValidityTable from "../components/tables/DepositValidity";

function DepositValidity() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-20 lg:px-8">
      <div className="max-w-[1640px] m-auto px-4 py-24">
      <h1 className="text-center font-bold text-2xl">Loans</h1>
          <DepositValidityTable />
        </div>
      </div>
    </div>
  );
}

export default DepositValidity;
