import React from "react";
import { Link } from "react-router-dom";

const ProfitCategory = () => {
  const categories = [
    {
      id: 1,
      name: "Loans",
      image: "customers.png",
      page:"loan"
    },
    {
      id: 2,
      name: "Deposits",
      image: "loan.png",
      page:'deposit'
    },
    {
      id: 3,
      name: "EMIs",
      image: "interest.png",
      page:'emi'
    },
    {
      id: 4,
      name: "Overall",
      image: "interest.png",
      page:'overall'
    },
  ];
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-20 lg:px-8">
        <div className="max-w-[1640px] m-auto px-4 py-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((item, index) => (
              <Link
                to={item.page}
                key={index}
                className="bg-black text-white font-semibold underline hover:bg-white hover:text-black cursor-pointer duration-500 rounded-lg p-10 flex justify-between items-center"
              >
                <h2 className="font-bold sm:text-xl">{item.name}</h2>
                <img src={item.image} alt={item.name} className="hidden lg:block md:w-40 rounded-lg" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCategory;
