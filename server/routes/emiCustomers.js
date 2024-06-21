import express from "express";
import { addEMICustomer, deleteEMICustomer, getEMICustomer, getEMICustomers, updateEMICustomer } from "../controllers/emiCustomer.js";

const router = express.Router();

router.get("/",getEMICustomers);
router.get("/:id",getEMICustomer);
router.post("/",addEMICustomer);
router.delete("/:id",deleteEMICustomer);
router.put("/:id",updateEMICustomer);

export default router