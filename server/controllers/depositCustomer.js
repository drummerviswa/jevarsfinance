import { db } from "../connect.js";

export const getDepositCustomers = (req, res) => {
  const q = "SELECT * from depositcustomers";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getDepositCustomer = (req, res) => {
  const q = "SELECT * from depositcustomers WHERE Cus_ID=?";
  db.query(q,[req.params.id],(err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const addDepositCustomer = (req, res) => {
  const q =
    "SELECT * FROM depositcustomers WHERE firstName=? AND fatherName=?";
  db.query(
    q,
    [req.body.firstName, req.body.fatherName],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("Customer Already exist");
      const q =
        "INSERT INTO `depositcustomers`(`FirstName`, `LastName`, `FatherName`, `MotherName`, `MobileNo`, `Address`, `Type`) VALUES (?,?,?,?,?,?,?)";
      const value = [
        req.body.firstName,
        req.body.lastName,
        req.body.fatherName,
        req.body.motherName,
        req.body.mobileNo,
        req.body.address,
        "customer",
      ];
      db.query(q, value, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User add successfully");
      });
    }
  );
};

export const deleteDepositCustomer = (req, res) => {
  const q = "SELECT * FROM depositcustomers WHERE `Cus_ID`=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(409).json("Customer not found");
    const q = "DELETE FROM depositcustomers WHERE `Cus_ID`=?";
    db.query(q, [req.params.id], (err, data) => {
      return res.status(200).json("Customer deleted.");
    });
  });
};

export const updateDepositCustomer = (req, res) => {
  const q = "UPDATE `depositcustomers` SET `FirstName`=?,`LastName`=?,`FatherName`=?,`MotherName`=?,`MobileNo`=?,`Address`=? WHERE `Cus_ID`=?";
  db.query(
    q,
    [
      req.body.firstName,
      req.body.lastName,
      req.body.fatherName,
      req.body.motherName,
      req.body.mobileNo,
      req.body.address,
      req.params.id
    ],
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: "Updated Customer!!" });
    }
  );
};