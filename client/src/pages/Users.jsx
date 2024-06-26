import axios from "axios";
import React, { useEffect, useState } from "react";

function Users() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    document.title = "Users";
    fetch("https://app-1odw.onrender.com/api/auth/users", {
      method: "GET",
    })
      .then(async (response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log(error));
  }, [updated]);
  const handleDelete = async (item) => {
    try {
      await axios.delete(`https://app-1odw.onrender.com/api/auth/users/${item.UID}`);
      setUsers(users.filter((i) => i.UID !== item.UID));
      setUpdated(!updated);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div className="flex items-center justify-center w-15 lg:w-screen h-screen">
      <div className="relative isolate">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <h1 className="text-center mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-black">
          Users
        </h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        UserID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-500">
                    {users.map((u) => (
                      <tr key={u.UID}>
                        <td className="px-6 py-4 text-2xl font-bold text-black whitespace-nowrap">
                          {u.UID}
                        </td>
                        <td className="px-6 py-4 text-2xl text-black whitespace-nowrap">
                          {u.username}{" "}
                          {u.UID == currentUser.UID ? <span>🎯</span> : null}
                        </td>
                        <td className="px-6 py-4 text-2xl text-black whitespace-nowrap">
                          {u.name}
                        </td>
                        {u.UID != currentUser.UID ? (
                          <button
                            onClick={() => handleDelete(u)}
                            className="px-6 py-5 font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
