import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ProfitCategory = () => {
  useEffect(() => {
    document.title = "Profit Category";
  }, []);
  const categories = [
    {
      id: 1,
      name: "Loans",
      page: "loan",
      image: "profitloan.png",
    },
    {
      id: 2,
      name: "Deposits",
      page: "deposit",
      image: "profitdeposit.png",
    },
    {
      id: 3,
      name: "EMIs",
      page: "emi",
      image: "profitemi.png",
    },
    {
      id: 4,
      name: "Balance",
      page: "balance",
      image: "balance.png",
    },
  ];
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 lg:px-8">
        <div className="max-w-[1640px] m-auto px-4 pt-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((item, index) => (
              <Link
                to={item.page}
                key={index}
                className="bg-green-600 font-semibold underline hover:bg-white cursor-pointer duration-500 rounded-lg p-10 flex justify-between items-center"
              >
                <h2 className="font-bold sm:text-xl">{item.name}</h2>
                <img
                  src={item.image}
                  alt={item.name}
                  className="hidden lg:block md:w-40 rounded-lg"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCategory;
