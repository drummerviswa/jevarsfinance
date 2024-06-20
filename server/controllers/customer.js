import { db } from "../connect.js";

export const getCustomers = (req, res) => {
  const q = "SELECT * from customers";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getCustomer = (req, res) => {
  const q = "SELECT * from customers WHERE Cus_ID=?";
  db.query(q,[req.params.id],(err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const addCustomer = (req, res) => {
  const q =
    "SELECT * FROM customers WHERE firstName=? AND fatherName=? OR mobileNo=?";
  db.query(
    q,
    [req.body.firstName, req.body.fatherName, req.body.mobileNo],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("Customer Already exist");
      const q =
        "INSERT INTO `customers`(`FirstName`, `LastName`, `FatherName`, `MotherName`, `MobileNo`, `Address`, `Type`) VALUES (?,?,?,?,?,?,?)";
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

export const deleteCustomer = (req, res) => {
  const q = "SELECT * FROM customers WHERE `Cus_ID`=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(409).json("Customer not found");
    const q = "DELETE FROM customers WHERE `Cus_ID`=?";
    db.query(q, [req.params.id], (err, data) => {
      return res.status(200).json("Customer deleted.");
    });
  });
};

export const updateCustomer = (req, res) => {
  const q = "UPDATE `customers` SET `FirstName`=?,`LastName`=?,`FatherName`=?,`MotherName`=?,`MobileNo`=?,`Address`=? WHERE `Cus_ID`=?";
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