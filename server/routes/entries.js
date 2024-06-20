import express from "express";
import { addEntries, deleteEntry, getEntries, updateEntry } from "../controllers/entry.js";

const router = express.Router();
router.get("/",getEntries);
router.post("/",addEntries);
router.put("/:id",updateEntry);
router.delete("/:id",deleteEntry);

export default router