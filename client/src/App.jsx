import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "animate.css";
export default function App() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  useEffect(() => {
    document.title = "Jevars financier";
    fetch("https://app-1odw.onrender.com/api/auth/users", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <div className="relative isolate">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="flex items-center justify-center mx-auto max-w-2xl py-30 sm:py-48 lg:py-56 flex-col">
          <div className="lg:flex sm:mb-8 sm:flex sm:justify-center">
            <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
              Jevars Financier
            </h1>
          </div>
          <p className="animate__animated animate__flipInY font-bold">
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
              to="register"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add users
            </Link>
          </div>
          <div className="hidden lg:flex flex-col max-h-10">
            <h2 className="font-bold py-3 text-center text-xl">
              List of users
            </h2>
            <div className="lg:grid lg:grid-cols-3 font-bold text-center">
              <p>UserID</p>
              <p>Username</p>
              <p>Name</p>
            </div>
            {users.map((u) => (
              <div key={u.UID} className="lg:grid lg:grid-cols-3 text-left">
                <div className="lg:block">
                  <p className="font-bold text-center">{u.UID}</p>
                </div>
                <div className="px-6">
                  <p className="font-bold text-center">
                    {u.username}
                    {u.UID == currentUser.UID ? (
                      <span>🎯</span>
                    ) : null}
                  </p>
                </div>
                <div className="px-6">
                  <p className="font-bold text-center">{u.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
