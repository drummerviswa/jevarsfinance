import express from "express"
import { register,login,logout, getUsers, deleteUser } from "../controllers/auth.js";
import { getCustomersDeposit, getCustomersEMI, getCustomersLoan } from "../controllers/profit.js";

const router = express.Router();
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/users",getUsers);
router.get("/loans",getCustomersLoan);
router.get("/deposit",getCustomersDeposit);
router.get("/emi",getCustomersEMI);
router.delete("/users/:id",deleteUser);

export default router