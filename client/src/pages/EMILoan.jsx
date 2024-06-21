import React from 'react'
import EMILo from '../components/forms/EMILoans'
import EMILoansTable from '../components/tables/EMILoansTable'

function EMILoan() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8 py-10">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transhtmlForm-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
        </div>
        <div className="items-center mx-auto max-w-2xl py-10 sm:py-10 lg:py-18">
          <EMILo />
        </div>
          <EMILoansTable />
      </div>
    </div>
  )
}

export default EMILoan