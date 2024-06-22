import express from "express";
import cors from 'cors';
import customerRoutes from "./routes/customers.js";
import entryRoutes from "./routes/entries.js";
import loanRoutes from "./routes/loans.js";
import authRoutes from "./routes/auth.js";
import validityRoutes from "./routes/valid.js";
import depositCustomerRoutes from "./routes/depositCustomers.js";
import depositLoanRoutes from "./routes/depositLoans.js";
import depositEntryRoutes from "./routes/depositEntries.js";
import depositValidityRoutes from "./routes/depositValid.js";
import emiCustomerRoutes from "./routes/emiCustomers.js";
import emiLoanRoutes from "./routes/emiLoans.js";
import emiEntryRoutes from "./routes/emiEntries.js";
import emiValidityRoutes from "./routes/emiValid.js";
import profitRoutes from "./routes/profits.js"
import cookieParser from 'cookie-parser'

const app = express();
app.use(cookieParser());

app.use(cors({
    origin:"https://jeevars.vercel.app",
    credentials:true,
  }));
app.use(express.json());

app.use('/api/customers',customerRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/loans",loanRoutes);
app.use("/api/entries",entryRoutes);
app.use("/api/validity",validityRoutes);
app.use("/api/deposit/customers",depositCustomerRoutes)
app.use("/api/deposit/loans",depositLoanRoutes)
app.use("/api/deposit/entries",depositEntryRoutes)
app.use("/api/deposit/validity",depositValidityRoutes);
app.use("/api/emi/customers",emiCustomerRoutes)
app.use("/api/emi/loans",emiLoanRoutes)
app.use("/api/emi/entries",emiEntryRoutes)
app.use("/api/emi/validity",emiValidityRoutes);
app.use("/api/profit",profitRoutes);

app.listen(8800,()=>{
    console.log("Api started");
})