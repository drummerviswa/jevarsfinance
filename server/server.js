import express from "express";
import cors from 'cors';
import customerRoutes from "./routes/customers.js";
import entryRoutes from "./routes/entries.js";
import loanRoutes from "./routes/loans.js";
import authRoutes from "./routes/auth.js";
import cookieParser from 'cookie-parser'

const app = express();
app.use(cookieParser());

app.use(cors());
app.use(express.json());

app.use('/api/customers',customerRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/loans",loanRoutes);
app.use("/api/entries",entryRoutes);

app.listen(8800,()=>{
    console.log("Api started");
})