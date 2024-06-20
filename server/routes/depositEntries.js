import express from "express";
import {
  addDepositEntries,
  deleteDepositEntry,
  getDepositEntries,
  getDepositEntryFromCustomer,
  updateDepositEntry,
} from "../controllers/depositEntry.js";

const router = express.Router();
router.get("/", getDepositEntries);
router.post("/", addDepositEntries);
router.put("/:id", updateDepositEntry);
router.delete("/:id", deleteDepositEntry);
router.get("/:id", getDepositEntryFromCustomer);

export default router;
