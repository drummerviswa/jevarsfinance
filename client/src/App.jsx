import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function App() {
  useEffect(() => {
    document.title = "Jevars financier";
  }, []);
  return (
    <div className="w-screen h-screen bg-white">
      <div className="relative isolate px-5 pt-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="flex items-center justify-center mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 flex-col">
          <div className="lg:flex sm:mb-8 sm:flex sm:justify-center">
            <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
              Jevars Finance
            </h1>
          </div>
          <p class="hover:animate-pulse relative font-mono before:absolute before:inset-0 before:animate-typewriter before:bg-white after:absolute after:inset-0 after:w-[0.100em] after:animate-caret after:bg-black">
            Better , Brighter , Banking
          </p>
          <div className="pt-5 flex flex-row">
            <Link
              to="overall"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Overll
            </Link>
            <Link
              to="register"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
