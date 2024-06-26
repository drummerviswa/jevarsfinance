import express from "express";
import {
  addDepositLoan,
  deleteDepositLoan,
  getDepositLoanByCustomer,
  getDepositLoanByCustomerOpen,
  getDepositLoans,
  setDepositStatus,
  updateDepositLoan,
} from "../controllers/depositLoan.js";

const router = express.Router();
router.get("/", getDepositLoans);
router.get("/c/:id", getDepositLoanByCustomer);
router.get("/o/:id", getDepositLoanByCustomerOpen);
router.post("/", addDepositLoan);
router.put("/:id", updateDepositLoan);
router.put("/status/:id", setDepositStatus);
router.delete("/:id", deleteDepositLoan);

export default router;
