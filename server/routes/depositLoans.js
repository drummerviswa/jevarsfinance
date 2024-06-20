import express from "express";
import {
  addDepositLoan,
  deleteDepositLoan,
  getDepositLoanByCustomer,
  getDepositLoans,
  setDepositStatus,
  updateDepositLoan,
} from "../controllers/depositLoan.js";

const router = express.Router();
router.get("/", getDepositLoans);
router.get("/:id", getDepositLoanByCustomer);
router.post("/", addDepositLoan);
router.put("/:id", updateDepositLoan);
router.put("/status/:id", setDepositStatus);
router.delete("/:id", deleteDepositLoan);

export default router;
