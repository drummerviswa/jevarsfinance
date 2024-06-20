import express from "express"
import { getDepositValidity } from "../controllers/depositValid.js";

const router = express.Router();
router.get("/",getDepositValidity);

export default router