import { db } from "../connect.js";

export const getDepositLoans = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.* from depositloans l INNER JOIN depositcustomers ON l.Cus_ID=depositcustomers.Cus_ID";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getDepositLoan = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.* from depositloans l INNER JOIN depositcustomers ON l.Cus_ID=depositcustomers.Cus_ID WHERE Cus_ID=?";
  db.query(q, [req.param.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getDepositLoanByCustomer = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.* from depositloans l INNER JOIN depositcustomers ON l.Cus_ID=depositcustomers.Cus_ID WHERE l.Cus_ID=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteDepositLoan = (req, res) => {
  const q = "SELECT * FROM depositloans WHERE `Loan_No`=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(409).json("Loan not found");
    const q = "DELETE FROM depositloans WHERE `Loan_No`=?";
    db.query(q, [req.params.id], (err, data) => {
      return res.status(200).json("Loan deleted.");
    });
  });
};

export const setDepositStatus = (req, res) => {
  const q = "UPDATE `depositloans` SET `Status`=? WHERE `Loan_No`=?";
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

export const updateDepositLoan = (req, res) => {
  const q =
    "UPDATE `depositloans` SET `LoanType`=?,`Amount`=?,`Interest`=?,`DOB`=?,`Document`=?,`Status`=? WHERE `Loan_No`=?";
  const value = [
    req.body.loanType,
    req.body.amount,
    req.body.interest,
    req.body.dob,
    req.body.document,
    req.body.status,
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

export const addDepositLoan = (req, res) => {
  const q =
    "INSERT INTO `depositloans`(`Cus_ID`,`LoanType`, `Amount`, `Interest`, `DOB`, `Document`, `Status`) VALUES (?,?,?,?,?,?,?)";
  const value = [
    req.body.Cus_ID,
    req.body.loanType,
    req.body.amount,
    req.body.interest,
    req.body.dob,
    req.body.document,
    "Open",
  ];
  db.query(q, value, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Loan added successfully");
  });
};
