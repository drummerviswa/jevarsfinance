import React from 'react'
import ProfitTable from '../components/ProfitTable'

function LoanProfits() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-20 lg:px-8">
      <div className="max-w-[1640px] m-auto px-4 py-24">
      <h1 className="text-center font-bold text-2xl">Loans Analysis</h1>
          <ProfitTable />
        </div>
      </div>
    </div>
  )
}

export default LoanProfits