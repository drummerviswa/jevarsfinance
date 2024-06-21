import express from "express"
import { getEMIValidity } from "../controllers/emiValid.js";

const router = express.Router();
router.get("/",getEMIValidity);

export default router