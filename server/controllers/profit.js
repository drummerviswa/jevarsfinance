import { db } from "../connect.js";

export const getCustomersLoan = (req, res) => {
  const q =
    "SELECT COUNT(l.Cus_ID) as cus_count from loans l INNER JOIN customers c ON l.Cus_ID=c.Cus_ID WHERE Status='Open';";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getCustomersDeposit = (req, res) => {
  const q =
    "SELECT COUNT(l.Cus_ID) as cus_count from depositloans l INNER JOIN depositcustomers c ON l.Cus_ID=c.Cus_ID WHERE Status='Open';";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getCustomersEMI = (req, res) => {
  const q =
    "SELECT COUNT(l.Cus_ID) as cus_count from emiloans l INNER JOIN emicustomers c ON l.Cus_ID=c.Cus_ID WHERE Status='Open';";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getLoanProfits = (req, res) => {
  const q = `WITH
    LoanData AS (
        SELECT
            MONTH(DOB) AS Month,
            SUM(Amount) AS Amount,
            AVG(Interest) AS Avg_Interest
        FROM
            loans
        WHERE
            YEAR(DOB) = ?
        GROUP BY
            MONTH(DOB)
    ),
    PaymentData AS (
        SELECT
            MONTH(Pay_Date) AS Month,
            SUM(Pay_Amount) AS Pay_Amount
        FROM
            entries
        WHERE
            YEAR(Pay_Date) = ? AND Entry_Type = 'Interest'
        GROUP BY
            MONTH(Pay_Date)
    ),
    PaymentE AS (
        SELECT
            MONTH(Pay_Date) AS Month,
            SUM(Pay_Amount) AS Pay_Amount
        FROM
            entries
        WHERE
            YEAR(Pay_Date) = ? AND Entry_Type = 'Principal'
        GROUP BY
            MONTH(Pay_Date)
    )
SELECT
    COALESCE(ld.Month, pd.Month, pe.Month) AS Month,
    COALESCE(ld.Amount, 0) AS Total_Amount,
    COALESCE(pd.Pay_Amount, 0) AS Total_Interest,
    COALESCE(ld.Avg_Interest, 0) AS Avg_Interest,
    COALESCE(pe.Pay_Amount, 0) AS Principal
FROM
    LoanData ld
LEFT JOIN PaymentData pd ON ld.Month = pd.Month
LEFT JOIN PaymentE pe ON ld.Month = pe.Month
UNION
SELECT
    COALESCE(ld.Month, pd.Month, pe.Month) AS Month,
    COALESCE(ld.Amount, 0) AS Total_Amount,
    COALESCE(pd.Pay_Amount, 0) AS Total_Interest,
    COALESCE(ld.Avg_Interest, 0) AS Avg_Interest,
    COALESCE(pe.Pay_Amount, 0) AS Principal
FROM
    PaymentData pd
LEFT JOIN LoanData ld ON pd.Month = ld.Month
LEFT JOIN PaymentE pe ON pd.Month = pe.Month
UNION
SELECT
    COALESCE(ld.Month, pd.Month, pe.Month) AS Month,
    COALESCE(ld.Amount, 0) AS Total_Amount,
    COALESCE(pd.Pay_Amount, 0) AS Total_Interest,
    COALESCE(ld.Avg_Interest, 0) AS Avg_Interest,
    COALESCE(pe.Pay_Amount, 0) AS Principal
FROM
    PaymentE pe
LEFT JOIN LoanData ld ON pe.Month = ld.Month
LEFT JOIN PaymentData pd ON pe.Month = pd.Month
ORDER BY
    Month;
`;
  db.query(q, [req.params.id, req.params.id, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getLoanTotal = (req, res) => {
  const q = `WITH
    LoanData AS (
        SELECT
            SUM(Amount) AS Total_total_amount,
            SUM(Interest) AS Total_total_interest,
            AVG(Interest) AS Total_avg_interest
        FROM
            loans
        WHERE
            STATUS = 'Open' AND YEAR(DOB) = ?
    ),
    PaymentData AS (
        SELECT
            SUM(Pay_Amount) AS Total_total_interest
        FROM
            entries
        WHERE
            YEAR(Pay_Date) = ? AND Entry_Type = 'Interest'
    ),
    PaymentE AS (
        SELECT
            SUM(Pay_Amount) AS Principal
        FROM
            entries
        WHERE
            YEAR(Pay_Date) = ? AND Entry_Type = 'Principal'
    )
SELECT
    COALESCE(ld.Total_total_amount, 0) AS Total_total_amount,
    COALESCE(ld.Total_avg_interest, 0) AS Total_avg_interest,
    COALESCE(pd.Total_total_interest, 0) AS Total_total_interest,
    COALESCE(pe.Principal, 0) AS Principal
FROM
    LoanData ld
CROSS JOIN PaymentData pd
CROSS JOIN PaymentE pe;`;

  db.query(q, [req.params.id, req.params.id, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getDepositTotal = (req, res) => {
  const q = `WITH
    LoanData AS(
    SELECT
        SUM(Amount) AS Total_total_amount,
        SUM(Interest) AS Total_total_interest,
        AVG(Interest) AS Total_avg_interest
    FROM
        depositloans
    WHERE
STATUS
    = 'Open' AND YEAR(DOB) = ?
),
PaymentData AS(
    SELECT
        SUM(Pay_Amount) AS Total_total_interest
    FROM
        depositentries
    WHERE
        YEAR(Pay_Date) = ? AND Entry_Type="Interest"
),
PaymentE AS(
    SELECT
        SUM(Pay_Amount) AS Principal
    FROM
        depositentries
    WHERE
        YEAR(Pay_Date) = ? AND Entry_Type="Principal"
)
SELECT
    COALESCE(ld.Total_total_amount, 0) AS Total_total_amount,
    COALESCE(ld.Total_avg_interest, 0) AS Total_avg_interest,
    COALESCE(pd.Total_total_interest, 0) AS Total_total_interest,
    COALESCE(pe.Principal, 0) AS Principal
FROM
    LoanData ld
CROSS JOIN PaymentData pd,PaymentE pe;`;
  db.query(q, [req.params.id, req.params.id, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getEMITotal = (req, res) => {
  const q = `WITH
    LoanData AS(
    SELECT
        SUM(Amount) AS Total_total_amount,
        SUM(Interest) AS Total_total_interest,
        AVG(Interest) AS Total_avg_interest
    FROM
        emiloans
    WHERE
STATUS
    = 'Open' AND YEAR(DOB) = ?
),
PaymentData AS(
    SELECT
        SUM(Pay_Amount) AS Total_total_interest
    FROM
        emientries
    WHERE
        YEAR(Pay_Date) = ? AND Entry_Type="Interest"
),
PaymentE AS(
    SELECT
        SUM(Pay_Amount) AS Principal
    FROM
        emientries
    WHERE
        YEAR(Pay_Date) = ? AND Entry_Type="Principal"
)
SELECT
    COALESCE(ld.Total_total_amount, 0) AS Total_total_amount,
    COALESCE(ld.Total_avg_interest, 0) AS Total_avg_interest,
    COALESCE(pd.Total_total_interest, 0) AS Total_total_interest,
    COALESCE(pe.Principal, 0) AS Principal
FROM
    LoanData ld
CROSS JOIN PaymentData pd,PaymentE pe;`;
  db.query(q, [req.params.id, req.params.id, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getDepositProfits = (req, res) => {
  const q = `WITH
    LoanData AS (
        SELECT
            MONTH(DOB) AS Month,
            SUM(Amount) AS Amount,
            AVG(Interest) AS Avg_Interest
        FROM
            depositloans
        WHERE
            YEAR(DOB) = ?
        GROUP BY
            MONTH(DOB)
    ),
    PaymentData AS (
        SELECT
            MONTH(Pay_Date) AS Month,
            SUM(Pay_Amount) AS Pay_Amount
        FROM
            depositentries
        WHERE
            YEAR(Pay_Date) = ? AND Entry_Type = 'Interest'
        GROUP BY
            MONTH(Pay_Date)
    ),
    PaymentE AS (
        SELECT
            MONTH(Pay_Date) AS Month,
            SUM(Pay_Amount) AS Pay_Amount
        FROM
            depositentries
        WHERE
            YEAR(Pay_Date) = ? AND Entry_Type = 'Principal'
        GROUP BY
            MONTH(Pay_Date)
    )
SELECT
    COALESCE(ld.Month, pd.Month, pe.Month) AS Month,
    COALESCE(ld.Amount, 0) AS Total_Amount,
    COALESCE(pd.Pay_Amount, 0) AS Total_Interest,
    COALESCE(ld.Avg_Interest, 0) AS Avg_Interest,
    COALESCE(pe.Pay_Amount, 0) AS Principal
FROM
    LoanData ld
LEFT JOIN PaymentData pd ON ld.Month = pd.Month
LEFT JOIN PaymentE pe ON ld.Month = pe.Month
UNION
SELECT
    COALESCE(ld.Month, pd.Month, pe.Month) AS Month,
    COALESCE(ld.Amount, 0) AS Total_Amount,
    COALESCE(pd.Pay_Amount, 0) AS Total_Interest,
    COALESCE(ld.Avg_Interest, 0) AS Avg_Interest,
    COALESCE(pe.Pay_Amount, 0) AS Principal
FROM
    PaymentData pd
LEFT JOIN LoanData ld ON pd.Month = ld.Month
LEFT JOIN PaymentE pe ON pd.Month = pe.Month
UNION
SELECT
    COALESCE(ld.Month, pd.Month, pe.Month) AS Month,
    COALESCE(ld.Amount, 0) AS Total_Amount,
    COALESCE(pd.Pay_Amount, 0) AS Total_Interest,
    COALESCE(ld.Avg_Interest, 0) AS Avg_Interest,
    COALESCE(pe.Pay_Amount, 0) AS Principal
FROM
    PaymentE pe
LEFT JOIN LoanData ld ON pe.Month = ld.Month
LEFT JOIN PaymentData pd ON pe.Month = pd.Month
ORDER BY
    Month;
`;
  db.query(q, [req.params.id, req.params.id, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getEMIProfits = (req, res) => {
  const q = `WITH
    LoanData AS (
        SELECT
            MONTH(DOB) AS Month,
            SUM(Amount) AS Amount,
            AVG(Interest) AS Avg_Interest
        FROM
            emiloans
        WHERE
            YEAR(DOB) = ?
        GROUP BY
            MONTH(DOB)
    ),
    PaymentData AS (
        SELECT
            MONTH(Pay_Date) AS Month,
            SUM(Pay_Amount) AS Pay_Amount
        FROM
            emientries
        WHERE
            YEAR(Pay_Date) = ? AND Entry_Type = 'Interest'
        GROUP BY
            MONTH(Pay_Date)
    ),
    PaymentE AS (
        SELECT
            MONTH(Pay_Date) AS Month,
            SUM(Pay_Amount) AS Pay_Amount
        FROM
            emientries
        WHERE
            YEAR(Pay_Date) = ? AND Entry_Type = 'Principal'
        GROUP BY
            MONTH(Pay_Date)
    )
SELECT
    COALESCE(ld.Month, pd.Month, pe.Month) AS Month,
    COALESCE(ld.Amount, 0) AS Total_Amount,
    COALESCE(pd.Pay_Amount, 0) AS Total_Interest,
    COALESCE(ld.Avg_Interest, 0) AS Avg_Interest,
    COALESCE(pe.Pay_Amount, 0) AS Principal
FROM
    LoanData ld
LEFT JOIN PaymentData pd ON ld.Month = pd.Month
LEFT JOIN PaymentE pe ON ld.Month = pe.Month
UNION
SELECT
    COALESCE(ld.Month, pd.Month, pe.Month) AS Month,
    COALESCE(ld.Amount, 0) AS Total_Amount,
    COALESCE(pd.Pay_Amount, 0) AS Total_Interest,
    COALESCE(ld.Avg_Interest, 0) AS Avg_Interest,
    COALESCE(pe.Pay_Amount, 0) AS Principal
FROM
    PaymentData pd
LEFT JOIN LoanData ld ON pd.Month = ld.Month
LEFT JOIN PaymentE pe ON pd.Month = pe.Month
UNION
SELECT
    COALESCE(ld.Month, pd.Month, pe.Month) AS Month,
    COALESCE(ld.Amount, 0) AS Total_Amount,
    COALESCE(pd.Pay_Amount, 0) AS Total_Interest,
    COALESCE(ld.Avg_Interest, 0) AS Avg_Interest,
    COALESCE(pe.Pay_Amount, 0) AS Principal
FROM
    PaymentE pe
LEFT JOIN LoanData ld ON pe.Month = ld.Month
LEFT JOIN PaymentData pd ON pe.Month = pd.Month
ORDER BY
    Month;
`;
  db.query(q, [req.params.id, req.params.id, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getBalance = (req, res) => {
  const q = `WITH LoanData AS (
    SELECT 
        MONTH(DOB) AS Month, 
        SUM(Amount) AS Amount, 
        AVG(Interest) AS Avg_Interest 
    FROM loans 
    WHERE YEAR(DOB) = ? 
    GROUP BY MONTH(DOB)
), 
PaymentData AS (
    SELECT 
        MONTH(Pay_Date) AS Month, 
        SUM(Pay_Amount) AS Pay_Amount 
    FROM entries 
    WHERE YEAR(Pay_Date) = ? AND Entry_Type='Interest' 
    GROUP BY MONTH(Pay_Date)
), 
LoanDataDeposit AS (
    SELECT 
        MONTH(DOB) AS Month, 
        SUM(Amount) AS Amount, 
        AVG(Interest) AS Avg_Interest 
    FROM depositloans 
    WHERE YEAR(DOB) = ? 
    GROUP BY MONTH(DOB)
), 
PaymentDataDeposit AS (
    SELECT 
        MONTH(Pay_Date) AS Month, 
        SUM(Pay_Amount) AS Pay_Amount 
    FROM depositentries 
    WHERE YEAR(Pay_Date) = ? AND Entry_Type='Interest'
    GROUP BY MONTH(Pay_Date)
), 
LoanDataEMI AS (
    SELECT 
        MONTH(DOB) AS Month, 
        SUM(Amount) AS Amount, 
        AVG(Interest) AS Avg_Interest 
    FROM emiloans 
    WHERE YEAR(DOB) = ? 
    GROUP BY MONTH(DOB)
), 
PaymentDataEMI AS (
    SELECT 
        MONTH(Pay_Date) AS Month, 
        SUM(Pay_Amount) AS Pay_Amount 
    FROM emientries 
    WHERE YEAR(Pay_Date) = ? AND Entry_Type='Interest'
    GROUP BY MONTH(Pay_Date)
), 
PrincipalData AS (
    SELECT 
        MONTH(DOB) AS Month, 
        SUM(Amount) AS Loan_Principal, 
        0 AS Deposit_Principal, 
        0 AS EMI_Principal
    FROM loans 
    WHERE YEAR(DOB) = ? 
    GROUP BY MONTH(DOB)
    UNION ALL
    SELECT 
        MONTH(DOB) AS Month, 
        0 AS Loan_Principal, 
        SUM(Amount) AS Deposit_Principal, 
        0 AS EMI_Principal
    FROM depositloans 
    WHERE YEAR(DOB) = ? 
    GROUP BY MONTH(DOB)
    UNION ALL
    SELECT 
        MONTH(DOB) AS Month, 
        0 AS Loan_Principal, 
        0 AS Deposit_Principal, 
        SUM(Amount) AS EMI_Principal
    FROM emiloans 
    WHERE YEAR(DOB) = ? 
    GROUP BY MONTH(DOB)
), 
CombinedData AS (
    SELECT 
        COALESCE(ld.Month, pd.Month, ldp.Month, pdd.Month, lde.Month, pde.Month) AS Month,
        COALESCE(ld.Amount, 0) AS Loan_Amount,
        COALESCE(pd.Pay_Amount, 0) AS Loan_Interest,
        COALESCE(ld.Avg_Interest, 0) AS Loan_Avg_Interest,
        COALESCE(ldp.Amount, 0) AS Deposit_Amount,
        COALESCE(pdd.Pay_Amount, 0) AS Deposit_Interest,
        COALESCE(ldp.Avg_Interest, 0) AS Deposit_Avg_Interest,
        COALESCE(lde.Amount, 0) AS EMI_Amount,
        COALESCE(pde.Pay_Amount, 0) AS EMI_Interest,
        COALESCE(lde.Avg_Interest, 0) AS EMI_Avg_Interest,
        COALESCE(pr.Loan_Principal, 0) AS Loan_Principal,
        COALESCE(pr.Deposit_Principal, 0) AS Deposit_Principal,
        COALESCE(pr.EMI_Principal, 0) AS EMI_Principal
    FROM LoanData ld 
    LEFT JOIN PaymentData pd ON ld.Month = pd.Month
    LEFT JOIN LoanDataDeposit ldp ON ld.Month = ldp.Month
    LEFT JOIN PaymentDataDeposit pdd ON ld.Month = pdd.Month
    LEFT JOIN LoanDataEMI lde ON ld.Month = lde.Month
    LEFT JOIN PaymentDataEMI pde ON ld.Month = pde.Month
    LEFT JOIN PrincipalData pr ON ld.Month = pr.Month
)
SELECT 
    Month,
    SUM(Loan_Interest + EMI_Interest) AS total_credit,
    SUM(Deposit_Interest) AS total_debit,
    SUM(Loan_Interest + EMI_Interest - Deposit_Interest) AS total_balance,
    SUM(Loan_Amount + EMI_Amount) AS total_loan_principal,
    SUM(Deposit_Amount) AS total_deposit_principal,
    SUM(Loan_Amount + EMI_Amount - Deposit_Amount) AS total_principal_balance
FROM CombinedData
GROUP BY Month
ORDER BY Month;

`;
  db.query(
    q,
    [
      req.params.id,
      req.params.id,
      req.params.id,
      req.params.id,
      req.params.id,
      req.params.id,
      req.params.id,
      req.params.id,
      req.params.id,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};

export const getBalanceTotal = (req, res) => {
  const q = `
  WITH LoanData AS (
    SELECT 
        SUM(Amount) AS Total_total_amount,
        SUM(Interest) AS Total_total_interest,
        AVG(Interest) AS Total_avg_interest
    FROM loans 
    WHERE Status='Open' AND YEAR(DOB) = ?
),
PaymentData AS (
    SELECT SUM(Pay_Amount) AS Total_total_interest 
    FROM entries 
    WHERE YEAR(Pay_Date) = ? AND Entry_Type='Interest'
),
DepositLoanData AS (
    SELECT 
        SUM(Amount) AS Total_total_amount,
        SUM(Interest) AS Total_total_interest,
        AVG(Interest) AS Total_avg_interest
    FROM depositloans 
    WHERE Status='Open' AND YEAR(DOB) = ?
),
DepositPaymentData AS (
    SELECT SUM(Pay_Amount) AS Total_total_interest 
    FROM depositentries 
    WHERE YEAR(Pay_Date) = ? AND Entry_Type='Interest'
),
EMILoanData AS (
    SELECT 
        SUM(Amount) AS Total_total_amount,
        SUM(Interest) AS Total_total_interest,
        AVG(Interest) AS Total_avg_interest
    FROM emiloans 
    WHERE Status='Open' AND YEAR(DOB) = ?
),
EMIPaymentData AS (
    SELECT SUM(Pay_Amount) AS Total_total_interest 
    FROM emientries 
    WHERE YEAR(Pay_Date) = ? AND Entry_Type='Interest'
)
SELECT 
    COALESCE(ld.Total_total_amount, 0) + COALESCE(ed.Total_total_amount, 0) AS Total_credits,
    COALESCE(ld.Total_total_amount, 0) AS Total_loans,
    COALESCE(ed.Total_total_amount, 0) AS Total_emis,
    COALESCE(dld.Total_total_amount, 0) AS Total_debits,
    (COALESCE(ld.Total_total_amount, 0) + COALESCE(ed.Total_total_amount, 0) - COALESCE(dld.Total_total_amount, 0)) AS Total_balance
FROM 
    LoanData ld 
    CROSS JOIN EMILoanData ed 
    CROSS JOIN DepositLoanData dld
`;
  db.query(
    q,
    [
      req.params.id,
      req.params.id,
      req.params.id,
      req.params.id,
      req.params.id,
      req.params.id,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};
