import React, { useEffect } from "react";
import Validity from "../components/tables/Validity";

function ValidityPage() {
  useEffect(() => {
    document.title= "Loan - Validity";
  }, [])
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-20 lg:px-8">
      <div className="max-w-[1640px] m-auto px-4 py-24">
      <h1 className="text-center font-bold text-2xl">Loans</h1>
          <Validity />
        </div>
      </div>
    </div>
  );
}

export default ValidityPage;
