import React from 'react'
import DepositLo from '../components/forms/DepositLoans'
import DepositLoansTable from '../components/tables/DepositLoans'

function DepositLoan() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8 py-10">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transhtmlForm-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
        </div>
        <div className="items-center mx-auto max-w-2xl py-10 sm:py-10 lg:py-20">
          <DepositLo />
        </div>
          <DepositLoansTable />
      </div>
    </div>
  )
}

export default DepositLoan