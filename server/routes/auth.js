import express from "express"
import { register,login,logout, getUsers } from "../controllers/auth.js";

const router = express.Router();
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/users",getUsers);

export default router