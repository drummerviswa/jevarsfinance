import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const categories = [
    {
      id: 1,
      name: "Customers",
      image: "customers.png",
      page:"customer"
    },
    {
      id: 2,
      name: "Loan Details",
      image: "loan.png",
      page:'loans'
    },
    {
      id: 3,
      name: "Interest Entries",
      image: "interest.png",
      page:'interest'
    },
    {
      id: 4,
      name: "Specific Customer",
      image: "Customer.png",
      page:"details"
    },
    {
      id: 5,
      name: "Validity Over",
      image: "validity.png",
    },
  ];
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-20 lg:px-8">
        <div className="max-w-[1640px] m-auto px-4 py-24">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((item, index) => (
              <Link
                to={item.page}
                key={index}
                className="bg-gray-400 font-semibold underline hover:bg-white cursor-pointer duration-500 rounded-lg p-10 flex justify-between items-center"
              >
                <h2 className="font-bold sm:text-xl">{item.name}</h2>
                <img src={item.image} alt={item.name} className="hidden lg:block md:w-40" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
