import express from "express";
import { addCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "../controllers/customer.js";

const router = express.Router();

router.get("/",getCustomers);
router.get("/:id",getCustomer);
router.post("/",addCustomer);
router.delete("/:id",deleteCustomer);
router.put("/:id",updateCustomer);

export default router