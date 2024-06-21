import express from "express"
import { getDepositProfits, getDepositTotal, getEMIProfits, getEMITotal, getLoanProfits, getLoanTotal } from "../controllers/profit.js";

const router = express.Router();
router.get("/loans",getLoanProfits);
router.get("/loans/total",getLoanTotal)
router.get("/deposit/total",getDepositTotal)
router.get("/emi/total",getEMITotal)
router.get("/deposit",getDepositProfits);
router.get("/emi",getEMIProfits);

export default router