import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import Profits from "./pages/Profits";
import EMI from "./pages/EMI";
import Navbar from "./components/Navbar";
import CustomerPage from "./pages/CustomerPage";
import LoanCategory from "./pages/LoanCategory";
import LoanPage from "./pages/LoanPage";
import InterestPage from "./pages/InterestPage";
import SpecificCustomer from "./pages/SpecificCustomer";
import { store } from "./store";
import { Provider } from "react-redux";
import ValidityPage from "./pages/ValidityPage";
import DepositCategory from "./pages/DepositCategory";
import DepositCustomer from "./pages/DepositCustomer";
import DepositLoan from "./pages/DepositLoan";
import DepositEntry from "./pages/DepositEntry";
import DepositSpecific from "./pages/DepositSpecific";
import DepositValidity from "./pages/DepositValidity";

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
        element: <DepositCategory />,
      },
      {
        path: "deposit/customer",
        element:<DepositCustomer />
      },
      {
        path: "deposit/loans",
        element:<DepositLoan />
      },
      {
        path: "deposit/interest",
        element:<DepositEntry />
      },
      {
        path: "deposit/details",
        element:<DepositSpecific />
      },
      {
        path: "deposit/validity",
        element:<DepositValidity />
      },
      {
        path: "emi",
        element: <EMI />,
      },
      {
        path: "loan",
        element: <LoanCategory />,
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
        path:"loan/validity",
        element: <ValidityPage />
      },
      {
        path: "profit",
        element: <Profits />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
);
