import express from "express";
import {
  addEMILoan,
  deleteEMILoan,
  getEMILoanByCustomer,
  getEMILoanByCustomerOpen,
  getEMILoans,
  setEMIStatus,
  updateEMILoan,
} from "../controllers/emiLoan.js";

const router = express.Router();
router.get("/", getEMILoans);
router.get("/c/:id", getEMILoanByCustomer);
router.get("/o/:id", getEMILoanByCustomerOpen);
router.post("/", addEMILoan);
router.put("/:id", updateEMILoan);
router.put("/status/:id", setEMIStatus);
router.delete("/:id", deleteEMILoan);

export default router;
