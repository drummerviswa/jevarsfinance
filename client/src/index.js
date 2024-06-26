import React, { useContext } from "react";
import "./index.css";
import bg from "./bg.jpg"
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import ProfitsCategory from "./pages/ProfitsCategory";
import EMICategory from "./pages/EMICategory";
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
import EMICustomer from "./pages/EMICustomer";
import EMILoan from "./pages/EMILoan";
import EMIEntry from "./pages/EMIEntry";
import EMISpecific from "./pages/EMISpecific";
import EMIValidity from "./pages/EMIValidity";
import LoanProfits from "./pages/LoanProfits";
import DepositProfits from "./pages/DepositProfits";
import EMIProfits from "./pages/EMIProfits";
import Login from "./pages/Login";
import { AuthContext, AuthContextProvider } from "./context/authContext";
import Register from "./pages/Register";
import Overall from "./pages/Overall";
import Balance from "./pages/Balance";
import Users from "./pages/Users";
import Lands from "./pages/Lands";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <App />,
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
        element: <DepositCustomer />,
      },
      {
        path: "deposit/loans",
        element: <DepositLoan />,
      },
      {
        path: "deposit/interest",
        element: <DepositEntry />,
      },
      {
        path: "deposit/details",
        element: <DepositSpecific />,
      },
      {
        path: "deposit/validity",
        element: <DepositValidity />,
      },
      {
        path: "emi",
        element: <EMICategory />,
      },
      {
        path: "emi/customer",
        element: <EMICustomer />,
      },
      {
        path: "emi/loans",
        element: <EMILoan />,
      },
      {
        path: "emi/interest",
        element: <EMIEntry />,
      },
      {
        path: "emi/details",
        element: <EMISpecific />,
      },
      {
        path: "emi/validity",
        element: <EMIValidity />,
      },
      {
        path: "loan",
        element: <LoanCategory />,
      },
      {
        path: "loan/customer",
        element: <CustomerPage />,
      },
      {
        path: "loan/loans",
        element: <LoanPage />,
      },
      {
        path: "loan/interest",
        element: <InterestPage />,
      },
      {
        path: "loan/details",
        element: <SpecificCustomer />,
      },
      {
        path: "loan/validity",
        element: <ValidityPage />,
      },
      {
        path: "profit",
        element: <ProfitsCategory />,
      },
      {
        path: "profit/loan",
        element: <LoanProfits />,
      },
      {
        path: "profit/deposit",
        element: <DepositProfits />,
      },
      {
        path: "profit/emi",
        element: <EMIProfits />,
      },
      {
        path:"profit/balance",
        element: <Balance />
      },
      {
        path: "overall",
        element: <Overall />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path:"lands",
        element:<Lands />
      }
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AuthContextProvider>
);
