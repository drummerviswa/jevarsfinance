import express from "express"
import { addLoan, deleteLoan, getLoanByCustomer, getLoanByCustomerOpen, getLoans, setStatus, updateLoan } from "../controllers/loan.js";

const router = express.Router();
router.get("/",getLoans);
router.get("/c/:id",getLoanByCustomer);
router.get("/o/:id",getLoanByCustomerOpen);
router.post("/",addLoan);
router.put("/:id",updateLoan);
router.put("/status/:id",setStatus)
router.delete("/:id",deleteLoan);

export default router