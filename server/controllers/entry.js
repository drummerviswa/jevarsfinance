import { db } from "../connect.js";

export const getEntries = (req, res) => {
  const q = "SELECT FirstName,LastName,l.*,e.* from entries e INNER JOIN loans l ON e.Loan_No=l.Loan_No INNER JOIN customers ON l.Cus_ID=customers.Cus_ID";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getEntry = (req, res) => {
  const q = "SELECT FirstName,LastName,l.*,e.* from entries e INNER JOIN loans l ON e.Loan_No=l.Loan_No INNER JOIN customers ON l.Cus_ID=customers.Cus_ID WHERE Cus_ID=?";
  db.query(q,[req.params.id],(err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addEntries = (req, res) => {
  const q =
    "INSERT INTO `entries`(`Loan_No`, `Cus_ID`, `Pay_Date`, `Pay_Amount`, `Validity`) VALUES (?,?,?,?,?)";
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

export const deleteEntry = (req, res) => {
    const q = "SELECT * FROM entries WHERE `Entry_ID`=?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(409).json("Entry not found");
      const q = "DELETE FROM entries WHERE `Entry_ID`=?";
      db.query(q, [req.params.id], (err, data) => {
        return res.status(200).json("Entry deleted.");
      });
    });
  };


  export const updateEntry = (req, res) => {
    const q = "UPDATE `entries` SET `Pay_Date`=?,`Pay_Amount`=?,`Validity`=? WHERE `Entry_ID`=?";
    db.query(
      q,
      [
        req.body.payDate,
        req.body.payAmount,
        req.body.validity,
        req.params.id
      ],
      (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Updated Entry!!" });
      }
    );
  };