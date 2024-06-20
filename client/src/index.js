import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import Deposit from "./pages/Deposit";
import Profits from "./pages/Profits";
import EMI from "./pages/EMI";
import Navbar from "./components/Navbar";
import CustomerPage from "./pages/CustomerPage";
import Category from "./pages/Category";
import LoanPage from "./pages/LoanPage";
import InterestPage from "./pages/InterestPage";
import SpecificCustomer from "./pages/SpecificCustomer";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path:'/',
        element: <App />
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "deposit",
        element: <Deposit />,
      },
      {
        path: "emi",
        element: <EMI />,
      },
      {
        path: "loan",
        element: <Category />,
      },
      {
        path:"loan/customer",
        element: <CustomerPage />
      },
      {
        path:"loan/loans",
        element: <LoanPage />
      },
      {
        path:"loan/interest",
        element: <InterestPage />
      },
      {
        path:"loan/details",
        element: <SpecificCustomer />
      },
      {
        path: "profit",
        element: <Profits />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
