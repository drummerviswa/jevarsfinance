import express from "express";
import { addEMIEntries, deleteEMIEntry, getEMIEntries, getEMIEntryFromCustomer, updateEMIEntry } from "../controllers/emiEntry.js";

const router = express.Router();
router.get("/", getEMIEntries);
router.post("/", addEMIEntries);
router.put("/:id", updateEMIEntry);
router.delete("/:id", deleteEMIEntry);
router.get("/:id", getEMIEntryFromCustomer);

export default router;
