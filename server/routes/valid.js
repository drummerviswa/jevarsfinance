import express from "express"
import { getValidity } from "../controllers/validity.js";

const router = express.Router();
router.get("/",getValidity);

export default router