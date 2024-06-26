import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "./bg.jpg"
import "animate.css";
export default function App() {
  useEffect(() => {
    document.title = "Jevars financier";
  }, []);
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-cover" style={{backgroundImage:`url(${bg})`}}>
      <div className="relative isolate">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="flex items-end justify-center mx-auto py-30 sm:py-48 lg:py-56 flex-col">
          <div className="lg:flex  sm:flex sm:justify-center">
            <h1 className="text-end mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-6xl lg:text-9xl dark:text-white">
              Jevars Financier
            </h1>
          </div>
          <p className="sm:mb-2 animate__animated animate__flipInY font-bold lg:text-4xl text-white">
            Better , Brighter , Banking
          </p>
          <div className="pt-5 flex flex-row">
            <Link
              to="overall"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Overall
            </Link>
            <Link
              to="lands"
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              Lands
            </Link>
            <Link
              to="register"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
