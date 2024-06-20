import express from "express";
import { addDepositCustomer, deleteDepositCustomer, getDepositCustomer, getDepositCustomers, updateDepositCustomer } from "../controllers/depositCustomer.js";

const router = express.Router();

router.get("/",getDepositCustomers);
router.get("/:id",getDepositCustomer);
router.post("/",addDepositCustomer);
router.delete("/:id",deleteDepositCustomer);
router.put("/:id",updateDepositCustomer);

export default router