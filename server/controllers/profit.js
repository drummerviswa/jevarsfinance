import { db } from "../connect.js";

export const getLoanProfits = (req, res) => {
  const q =
    "WITH LoanData AS ( SELECT MONTH(DOB) AS Month, SUM(Amount) AS Amount, AVG(Interest) AS Avg_Interest FROM loans WHERE YEAR(DOB) = YEAR(CURDATE()) GROUP BY MONTH(DOB) ), PaymentData AS ( SELECT MONTH(Pay_Date) AS Month, SUM(Pay_Amount) AS Pay_Amount FROM entries WHERE YEAR(Pay_Date) = YEAR(CURDATE()) GROUP BY MONTH(Pay_Date) ) SELECT COALESCE(ld.Month, pd.Month) AS month, COALESCE(ld.Amount, 0) AS total_amount, COALESCE(pd.Pay_Amount, 0) AS total_interest, COALESCE(ld.Avg_Interest, 0) AS avg_interest FROM LoanData ld LEFT JOIN PaymentData pd ON ld.Month = pd.Month UNION SELECT COALESCE(ld.Month, pd.Month) AS month, COALESCE(ld.Amount, 0) AS total_amount, COALESCE(pd.Pay_Amount, 0) AS total_interest, COALESCE(ld.Avg_Interest, 0) AS avg_interest FROM LoanData ld RIGHT JOIN PaymentData pd ON ld.Month = pd.Month ORDER BY month;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getLoanTotal = (req, res) => {
  const q =
    "WITH LoanData AS ( SELECT SUM(Amount) AS Total_total_amount, SUM(Interest) AS Total_total_interest, AVG(Interest) AS Total_avg_interest FROM loans WHERE YEAR(DOB) = YEAR(CURDATE()) ), PaymentData AS ( SELECT SUM(Pay_Amount) AS Total_total_interest FROM entries WHERE YEAR(Pay_Date) = YEAR(CURDATE()) ) SELECT COALESCE(ld.Total_total_amount, 0) AS Total_total_amount, COALESCE(ld.Total_avg_interest, 0) AS Total_avg_interest, COALESCE(pd.Total_total_interest, 0) AS Total_total_interest FROM LoanData ld CROSS JOIN PaymentData pd;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getDepositTotal = (req, res) => {
  const q =
    "WITH LoanData AS ( SELECT SUM(Amount) AS Total_total_amount, SUM(Interest) AS Total_total_interest, AVG(Interest) AS Total_avg_interest FROM depositloans WHERE YEAR(DOB) = YEAR(CURDATE()) ), PaymentData AS ( SELECT SUM(Pay_Amount) AS Total_total_interest FROM depositentries WHERE YEAR(Pay_Date) = YEAR(CURDATE()) ) SELECT COALESCE(ld.Total_total_amount, 0) AS Total_total_amount, COALESCE(ld.Total_avg_interest, 0) AS Total_avg_interest, COALESCE(pd.Total_total_interest, 0) AS Total_total_interest FROM LoanData ld CROSS JOIN PaymentData pd;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getEMITotal = (req, res) => {
  const q =
    "WITH LoanData AS ( SELECT SUM(Amount) AS Total_total_amount, SUM(Interest) AS Total_total_interest, AVG(Interest) AS Total_avg_interest FROM emiloans WHERE YEAR(DOB) = YEAR(CURDATE()) ), PaymentData AS ( SELECT SUM(Pay_Amount) AS Total_total_interest FROM emientries WHERE YEAR(Pay_Date) = YEAR(CURDATE()) ) SELECT COALESCE(ld.Total_total_amount, 0) AS Total_total_amount, COALESCE(ld.Total_avg_interest, 0) AS Total_avg_interest, COALESCE(pd.Total_total_interest, 0) AS Total_total_interest FROM LoanData ld CROSS JOIN PaymentData pd;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getDepositProfits = (req, res) => {
  const q =
    "WITH LoanData AS ( SELECT MONTH(DOB) AS Month, SUM(Amount) AS Amount, AVG(Interest) AS Avg_Interest FROM depositloans WHERE YEAR(DOB) = YEAR(CURDATE()) GROUP BY MONTH(DOB) ), PaymentData AS ( SELECT MONTH(Pay_Date) AS Month, SUM(Pay_Amount) AS Pay_Amount FROM depositentries WHERE YEAR(Pay_Date) = YEAR(CURDATE()) GROUP BY MONTH(Pay_Date) ) SELECT COALESCE(ld.Month, pd.Month) AS month, COALESCE(ld.Amount, 0) AS total_amount, COALESCE(pd.Pay_Amount, 0) AS total_interest, COALESCE(ld.Avg_Interest, 0) AS avg_interest FROM LoanData ld LEFT JOIN PaymentData pd ON ld.Month = pd.Month UNION SELECT COALESCE(ld.Month, pd.Month) AS month, COALESCE(ld.Amount, 0) AS total_amount, COALESCE(pd.Pay_Amount, 0) AS total_interest, COALESCE(ld.Avg_Interest, 0) AS avg_interest FROM LoanData ld RIGHT JOIN PaymentData pd ON ld.Month = pd.Month ORDER BY month;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getEMIProfits = (req, res) => {
  const q =
    "WITH LoanData AS ( SELECT MONTH(DOB) AS Month, SUM(Amount) AS Amount, AVG(Interest) AS Avg_Interest FROM emiloans WHERE YEAR(DOB) = YEAR(CURDATE()) GROUP BY MONTH(DOB) ), PaymentData AS ( SELECT MONTH(Pay_Date) AS Month, SUM(Pay_Amount) AS Pay_Amount FROM emientries WHERE YEAR(Pay_Date) = YEAR(CURDATE()) GROUP BY MONTH(Pay_Date) ) SELECT COALESCE(ld.Month, pd.Month) AS month, COALESCE(ld.Amount, 0) AS total_amount, COALESCE(pd.Pay_Amount, 0) AS total_interest, COALESCE(ld.Avg_Interest, 0) AS avg_interest FROM LoanData ld LEFT JOIN PaymentData pd ON ld.Month = pd.Month UNION SELECT COALESCE(ld.Month, pd.Month) AS month, COALESCE(ld.Amount, 0) AS total_amount, COALESCE(pd.Pay_Amount, 0) AS total_interest, COALESCE(ld.Avg_Interest, 0) AS avg_interest FROM LoanData ld RIGHT JOIN PaymentData pd ON ld.Month = pd.Month ORDER BY month;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
