import { db } from "../connect.js";

export const getCustomersLoan = (req, res) => {
  const q =
    "SELECT COUNT(l.Cus_ID) as cus_count from loans l INNER JOIN customers c ON l.Cus_ID=c.Cus_ID WHERE Status='Open';";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getSumLoans = (req, res) => {
  const q = `WITH
    LoanData AS (
        SELECT
            SUM(Amount) AS Amount,
            AVG(Interest) AS Interest
        FROM
            loans
        WHERE
            STATUS = 'Open' AND YEAR(DOB) <= ?
    ),
    PaymentData AS (
        SELECT
            SUM(Pay_Amount) AS Entry
        FROM
            entries
        WHERE
            Entry_Type='Interest' AND YEAR(Pay_Date) <= ?
    )
SELECT
    COALESCE(ld.Amount, 0) AS Amount,
    COALESCE(ld.Interest, 0) AS Interest,
    COALESCE(pd.Entry, 0) AS Entry
FROM
    LoanData ld
CROSS JOIN PaymentData pd;`;
  db.query(q, [req.params.id, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getSumDeposit = (req, res) => {
  const q = `
        WITH
    LoanData AS (
        SELECT
            SUM(Amount) AS Amount,
            AVG(Interest) AS Interest
        FROM
            depositloans
        WHERE
            STATUS = 'Open' AND YEAR(DOB) <= ?
    ),
    PaymentData AS (
        SELECT
            SUM(Pay_Amount) AS Entry
        FROM
            depositentries
        WHERE
            Entry_Type='Interest' AND YEAR(Pay_Date) <= ?
    )
SELECT
    COALESCE(ld.Amount, 0) AS Amount,
    COALESCE(ld.Interest, 0) AS Interest,
    COALESCE(pd.Entry, 0) AS Entry
FROM
    LoanData ld
CROSS JOIN PaymentData pd;`;
  db.query(q, [req.params.id, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getSumEMI = (req, res) => {
  const q = `
        WITH
    LoanData AS (
        SELECT
            SUM(Amount) AS Amount,
            AVG(Interest) AS Interest
        FROM
            emiloans
        WHERE
            STATUS = 'Open' AND YEAR(DOB) <= ?
    ),
    PaymentData AS (
        SELECT
            SUM(Pay_Amount) AS Entry
        FROM
            emientries
        WHERE
            Entry_Type='Interest' AND YEAR(Pay_Date) <= ?
    )
SELECT
    COALESCE(ld.Amount, 0) AS Amount,
    COALESCE(ld.Interest, 0) AS Interest,
    COALESCE(pd.Entry, 0) AS Entry
FROM
    LoanData ld
CROSS JOIN PaymentData pd;`;
  db.query(q, [req.params.id, req.params.id], (err, data) => {
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
  const q = `WITH
LoanPrincipal AS(
    SELECT
        MONTH(Pay_Date) AS Month,
        SUM(Pay_Amount) AS Pay_Amount
    FROM
        entries
    WHERE
        YEAR(Pay_Date) = ? AND Entry_Type = 'Principal'
    GROUP BY
        MONTH(Pay_Date)
),
DepositPrincipal AS(
    SELECT
        MONTH(Pay_Date) AS Month,
        SUM(Pay_Amount) AS Pay_Amount
    FROM
        depositentries
    WHERE
        YEAR(Pay_Date) = ? AND Entry_Type = 'Principal'
    GROUP BY
        MONTH(Pay_Date)
),
EMIPrincipal AS(
    SELECT
        MONTH(Pay_Date) AS Month,
        SUM(Pay_Amount) AS Pay_Amount
    FROM
        emientries
    WHERE
        YEAR(Pay_Date) = ? AND Entry_Type = 'Principal'
    GROUP BY
        MONTH(Pay_Date)
),
PaymentData AS(
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
PaymentDataDeposit AS(
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
PaymentDataEMI AS(
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
CombinedData AS(
    SELECT
        COALESCE(
            pd.Month,
            pdd.Month,
            pde.Month
        ) AS Month,
        COALESCE(pd.Pay_Amount, 0) AS Loan_Interest,
        COALESCE(pdd.Pay_Amount, 0) AS Deposit_Interest,
        COALESCE(pde.Pay_Amount, 0) AS EMI_Interest,
    	COALESCE(pril.Pay_Amount,0) AS Loan_Principal,
    	COALESCE(prid.Pay_Amount,0) AS Deposit_Principal,
    	COALESCE(prie.Pay_Amount,0) AS EMI_Principal
    FROM
        PaymentData pd
    LEFT JOIN PaymentDataDeposit pdd ON
        pd.Month = pdd.Month
    LEFT JOIN PaymentDataEMI pde ON
        pd.Month = pde.Month
    LEFT JOIN LoanPrincipal pril ON
    	pd.Month = pril.Month
    LEFT JOIN DepositPrincipal prid ON
    	pd.Month = prid.Month
    LEFT JOIN EMIPrincipal prie ON
    	pd.Month = prie.Month
)
SELECT
    Month,
    SUM(Loan_Interest + EMI_Interest) AS total_credit,
    SUM(Deposit_Interest) AS total_debit,
    SUM(
        Loan_Interest + EMI_Interest - Deposit_Interest
    ) AS total_balance,
    SUM(Loan_Principal + EMI_Principal) AS principal_credit,
    SUM(Deposit_Principal) AS principal_debit,
    SUM(Loan_Principal+EMI_Principal-Deposit_Principal) AS total_principal
FROM
    CombinedData
GROUP BY
    MONTH
ORDER BY
    MONTH;
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

export const tilltBalance = (req, res) => {
  const q = `WITH
    LoanData AS(
    SELECT
        SUM(Amount) AS Total_total_amount,
        SUM(Interest) AS Total_total_interest,
        AVG(Interest) AS Total_avg_interest
    FROM
        loans
    WHERE
STATUS
    = 'Open' AND YEAR(DOB) <= ?
),
PaymentData AS(
    SELECT
        SUM(Pay_Amount) AS Total_total_interest
    FROM
        entries
    WHERE
        YEAR(Pay_Date) <=> ? AND Entry_Type = 'Interest'
),
DepositLoanData AS(
    SELECT
        SUM(Amount) AS Total_total_amount,
        SUM(Interest) AS Total_total_interest,
        AVG(Interest) AS Total_avg_interest
    FROM
        depositloans
    WHERE
STATUS
    = 'Open' AND YEAR(DOB) <= ?
),
DepositPaymentData AS(
    SELECT
        SUM(Pay_Amount) AS Total_total_interest
    FROM
        depositentries
    WHERE
        YEAR(Pay_Date) <= ? AND Entry_Type = 'Interest'
),
EMILoanData AS(
    SELECT
        SUM(Amount) AS Total_total_amount,
        SUM(Interest) AS Total_total_interest,
        AVG(Interest) AS Total_avg_interest
    FROM
        emiloans
    WHERE
STATUS
    = 'Open' AND YEAR(DOB) <= ?
),
EMIPaymentData AS(
    SELECT
        SUM(Pay_Amount) AS Total_total_interest
    FROM
        emientries
    WHERE
        YEAR(Pay_Date) = ? AND Entry_Type = 'Interest'
)
SELECT
    COALESCE(ld.Total_total_amount, 0) + COALESCE(ed.Total_total_amount, 0) AS Total_credits,
    COALESCE(ld.Total_total_amount, 0) AS Total_loans,
    COALESCE(ed.Total_total_amount, 0) AS Total_emis,
    COALESCE(dld.Total_total_amount, 0) AS Total_debits,
    (
        COALESCE(ld.Total_total_amount, 0) + COALESCE(ed.Total_total_amount, 0) - COALESCE(dld.Total_total_amount, 0)
    ) AS Total_balance
FROM
    LoanData ld
CROSS JOIN EMILoanData ed CROSS JOIN DepositLoanData dld`;
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
