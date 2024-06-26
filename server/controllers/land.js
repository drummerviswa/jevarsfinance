import { db } from "../connect.js";

export const getLands = (req, res) => {
  const query = "SELECT * FROM lands";
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteLands = (req, res) => {
  const q = "SELECT * FROM lands WHERE `Land_No`=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(409).json("Land not found");
    const q = "DELETE FROM lands WHERE `Land_No`=?";
    db.query(q, [req.params.id], (err, data) => {
      return res.status(200).json("Land deleted.");
    });
  });
};

export const updateLand = (req, res) => {
  const q =
    "UPDATE `lands` SET `Land_Details`=?,`Land_Value`=?,`Land_Location`=? WHERE `Land_No`=?";
  const value = [
    req.body.landDetails,
    req.body.landValue,
    req.body.landLocation,
    req.body.Land_No,
  ];
  db.query(q, value, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
      return;
    }
    res.json({ message: "Updated Land!!" });
  });
};

export const addLands = (req, res) => {
  const q =
    "INSERT INTO `lands`(`Land_Details`, `Land_Value`, `Land_Location`) VALUES (?,?,?)";
  const value = [
    req.body.landDetails,
    req.body.landValue,
    req.body.landLocation,
    req.body.landNo,
  ];
  db.query(q, value, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Loan added successfully");
  });
};
