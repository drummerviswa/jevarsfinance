import { db } from "../connect.js";

export const getEMILoans = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.* from emiloans l INNER JOIN emicustomers ON l.Cus_ID=emicustomers.Cus_ID";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getEMILoan = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.* from emiloans l INNER JOIN emicustomers ON l.Cus_ID=emicustomers.Cus_ID WHERE Cus_ID=?";
  db.query(q, [req.param.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getEMILoanByCustomerOpen = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.* from emiloans l INNER JOIN emicustomers ON l.Cus_ID=emicustomers.Cus_ID WHERE Status='Open' AND l.Cus_ID=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getEMILoanByCustomer = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.* from emiloans l INNER JOIN emicustomers ON l.Cus_ID=emicustomers.Cus_ID WHERE l.Cus_ID=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteEMILoan = (req, res) => {
  const q = "SELECT * FROM emiloans WHERE `Loan_No`=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(409).json("Loan not found");
    const q = "DELETE FROM emiloans WHERE `Loan_No`=?";
    db.query(q, [req.params.id], (err, data) => {
      return res.status(200).json("Loan deleted.");
    });
  });
};

export const setEMIStatus = (req, res) => {
  const q = "UPDATE `emiloans` SET `Status`=? WHERE `Loan_No`=?";
  const values = [req.body.status, req.params.id];
  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Status Changed Loan!!" });
  });
};

export const updateEMILoan = (req, res) => {
  const q =
    "UPDATE `emiloans` SET `LoanType`=?,`Amount`=?,`Interest`=?,`DOB`=?,`Document`=?,`Status`=?,`advancePay`=?,`TimePeriod`=?,`MonthlyAmount`=? WHERE `Loan_No`=?";
  const value = [
    req.body.loanType,
    req.body.amount,
    req.body.interest,
    req.body.dob,
    req.body.document,
    req.body.status,
    req.body.advancePay,
    req.body.timePeriod,
    req.body.monthlyAmount,
    req.params.id,
  ];
  db.query(q, value, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Updated Loan!!" });
  });
};

export const addEMILoan = (req, res) => {
  const q =
    "INSERT INTO `emiloans`(`Cus_ID`,`LoanType`, `Amount`, `Interest`, `DOB`, `Document`, `Status`,`advancePay`,`TimePeriod`,`MonthlyAmount`) VALUES (?,?,?,?,?,?,?,?,?,?)";
  const value = [
    req.body.Cus_ID,
    req.body.loanType,
    req.body.amount,
    req.body.interest,
    req.body.dob,
    req.body.document,
    "Open",
    req.body.advancePay,
    req.body.timePeriod,
    req.body.monthlyAmount,
  ];
  db.query(q, value, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Loan added successfully");
  });
};
