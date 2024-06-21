import { db } from "../connect.js";

export const getLoanProfits = (req, res) => {
  const q =
    "SELECT MONTH(DOB) AS month,SUM(Amount) AS total_amount, SUM(Pay_Amount) AS total_interest,AVG(Interest) AS avg_interest FROM loans,entries WHERE YEAR(loans.DOB) = YEAR(CURDATE()) GROUP BY MONTH(DOB)";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getLoanTotal = (req, res) => {
  const q =
    "SELECT AVG(Interest) AS Total_avg_interest, SUM(Pay_Amount) AS Total_total_interest, SUM(Amount) AS Total_total_amount FROM loans,entries WHERE YEAR(loans.DOB) = YEAR(CURDATE())";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getDepositTotal = (req, res) => {
  const q =
    "SELECT AVG(Interest) AS Total_avg_interest, SUM(Pay_Amount) AS Total_total_interest, SUM(Amount) AS Total_total_amount FROM depositloans,depositentries WHERE YEAR(depositloans.DOB) = YEAR(CURDATE())";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getEMITotal = (req, res) => {
  const q =
    "SELECT AVG(Interest) AS Total_avg_interest, SUM(Pay_Amount) AS Total_total_interest, SUM(Amount) AS Total_total_amount FROM emiloans,emientries WHERE YEAR(emiloans.DOB) = YEAR(CURDATE())";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getDepositProfits = (req, res) => {
  const q =
    "SELECT MONTH(DOB) AS month,SUM(Amount) AS total_amount, SUM(Pay_Amount) AS total_interest,AVG(Interest) AS avg_interest FROM depositloans,depositentries WHERE YEAR(depositloans.DOB) = YEAR(CURDATE()) GROUP BY MONTH(DOB)";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getEMIProfits = (req, res) => {
  const q =
    "SELECT MONTH(DOB) AS month,SUM(Amount) AS total_amount, SUM(Pay_Amount) AS total_interest,AVG(Interest) AS avg_interest FROM emiloans,emientries WHERE YEAR(emiloans.DOB) = YEAR(CURDATE()) GROUP BY MONTH(DOB)";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
