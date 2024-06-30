import React, { useEffect, useState } from 'react'
import Customer from '../components/tables/Customers'
import '../index.css'
import LandForm from '../components/forms/LandForm';
import LandTable from '../components/tables/LandTable';

function Lands() {
  const [lands, setLands] = useState({
    total:0,
    no:0
  });
  useEffect(() => {
    document.title= "Lands";
    fetch("http://localhost:8800/api/lands/status").then(async (response) => response.json())
    .then((data) => {
      setLands({
          total:data[0].total_lands,
          no:data[0].no_of_lands
      });
    })
  }, [])
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8 py-10">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transhtmlForm-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
        </div>
        <div className="items-center mx-auto max-w-2xl py-10 sm:py-10 lg:py-36">
          <LandForm />
        </div>
          <div className='flex justify-around py-3'>
            <h1 className='text-xl font-bold'>No.of Lands: {lands.no}</h1>
            <h1 className='text-xl font-bold'>Total Land Value: ₹{lands.total||0}</h1>
          </div>
          <LandTable  />
      </div>
    </div>
  )
}

export default Lands