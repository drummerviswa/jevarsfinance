import { db } from "../connect.js";

export const getDepositEntries = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.*,e.* from depositentries e INNER JOIN depositloans l ON e.Loan_No=l.Loan_No INNER JOIN depositcustomers ON l.Cus_ID=depositcustomers.Cus_ID";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getDepositEntryFromCustomer = (req, res) => {
  const q =
    "SELECT FirstName,LastName,l.*,e.* from depositentries e INNER JOIN depositloans l ON e.Loan_No=l.Loan_No INNER JOIN depositcustomers ON l.Cus_ID=depositcustomers.Cus_ID WHERE depositcustomers.Cus_ID=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addDepositEntries = (req, res) => {
  const q =
    "INSERT INTO `depositentries`(`Loan_No`, `Cus_ID`, `Pay_Date`, `Pay_Amount`, `Validity`) VALUES (?,?,?,?,?)";
  const value = [
    req.body.Loan_No,
    req.body.Cus_ID,
    req.body.payDate,
    req.body.payAmount,
    req.body.validity,
  ];
  db.query(q, value, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Entry add successfully");
  });
};

export const deleteDepositEntry = (req, res) => {
  const q = "SELECT * FROM depositentries WHERE `Entry_ID`=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(409).json("Entry not found");
    const q = "DELETE FROM depositentries WHERE `Entry_ID`=?";
    db.query(q, [req.params.id], (err, data) => {
      return res.status(200).json("Entry deleted.");
    });
  });
};

export const updateDepositEntry = (req, res) => {
  const q =
    "UPDATE `depositentries` SET `Pay_Date`=?,`Pay_Amount`=?,`Validity`=? WHERE `Entry_ID`=?";
  db.query(
    q,
    [req.body.payDate, req.body.payAmount, req.body.validity, req.params.id],
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ message: "Updated Entry!!" });
    }
  );
};
