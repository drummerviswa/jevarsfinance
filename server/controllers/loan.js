import { db } from "../connect.js";

export const getLoans = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.* from loans l INNER JOIN customers ON l.Cus_ID=customers.Cus_ID";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getLoan = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.* from loans l INNER JOIN customers ON l.Cus_ID=customers.Cus_ID WHERE Cus_ID=?";
  db.query(q, [req.param.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getLoanByCustomerOpen = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.* from loans l INNER JOIN customers ON l.Cus_ID=customers.Cus_ID WHERE Status='Open' AND l.Cus_ID=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getLoanByCustomer = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.* from loans l INNER JOIN customers ON l.Cus_ID=customers.Cus_ID WHERE l.Cus_ID=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteLoan = (req, res) => {
  const q = "SELECT * FROM loans WHERE `Loan_No`=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(409).json("Loan not found");
    const q = "DELETE FROM loans WHERE `Loan_No`=?";
    db.query(q, [req.params.id], (err, data) => {
      return res.status(200).json("Loan deleted.");
    });
  });
};

export const setStatus = (req, res) => {
  const q = "UPDATE `loans` SET `Status`=? WHERE `Loan_No`=?";
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

export const updateLoan = (req, res) => {
  const q =
    "UPDATE `loans` SET `LoanType`=?,`Amount`=?,`Interest`=?,`DOB`=?,`Document`=?,`Status`=?,`AdvancePay`=? WHERE `Loan_No`=?";
  const value = [
    req.body.loanType,
    req.body.amount,
    req.body.interest,
    req.body.dob,
    req.body.document,
    req.body.status,
    req.body.advancePay,
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

export const addLoan = (req, res) => {
  const q =
    "INSERT INTO `loans`(`Cus_ID`,`LoanType`, `Amount`, `Interest`, `DOB`, `Document`, `Status`,`AdvancePay`) VALUES (?,?,?,?,?,?,?,?)";
  const value = [
    req.body.Cus_ID,
    req.body.loanType,
    req.body.amount,
    req.body.interest,
    req.body.dob,
    req.body.document,
    "Open",
    req.body.advancePay,
  ];
  db.query(q, value, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Loan added successfully");
  });
};
