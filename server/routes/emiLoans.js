import express from "express";
import {
  addEMILoan,
  deleteEMILoan,
  getEMILoanByCustomer,
  getEMILoans,
  setEMIStatus,
  updateEMILoan,
} from "../controllers/emiLoan.js";

const router = express.Router();
router.get("/", getEMILoans);
router.get("/:id", getEMILoanByCustomer);
router.post("/", addEMILoan);
router.put("/:id", updateEMILoan);
router.put("/status/:id", setEMIStatus);
router.delete("/:id", deleteEMILoan);

export default router;
