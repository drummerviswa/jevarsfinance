import express from "express"
import { addLoan, deleteLoan, getLoanByCustomer, getLoans, setStatus, updateLoan } from "../controllers/loan.js";

const router = express.Router();
router.get("/",getLoans);
router.get("/:id",getLoanByCustomer);
router.post("/",addLoan);
router.put("/:id",updateLoan);
router.put("/status/:id",setStatus)
router.delete("/:id",deleteLoan);

export default router