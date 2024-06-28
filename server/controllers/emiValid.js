import { db } from "../connect.js";

export const getEMIValidity = (req, res) => {
  const query =
    "SELECT c.*, l.*, e.* FROM emientries e INNER JOIN emiloans l ON e.Loan_No = l.Loan_No INNER JOIN emicustomers c ON l.Cus_ID = c.Cus_ID WHERE e.Validity =( SELECT MAX(e2.Validity) FROM emientries e2 WHERE l.Status='Open' AND e2.Loan_No = e.Loan_No AND TIMESTAMPDIFF(MONTH, (SELECT MAX(e3.Validity) FROM emientries e3 WHERE e2.Loan_No=e3.Loan_No), CURDATE()) >= 1);";
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
