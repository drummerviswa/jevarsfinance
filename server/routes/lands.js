import express from "express";
import { addLands, deleteLands, getLands, updateLand } from "../controllers/land.js";

const router = express.Router();

router.get("/",getLands);
router.put("/:id",updateLand);
router.delete("/:id",deleteLands);
router.post("/",addLands);

export default router