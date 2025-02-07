import db from "../config/db.js";

export const getSlipSummaryModels = (year) => {
  const SQLQuery = `SELECT
                        CASE WHEN B.[1] IS NULL THEN 0 ELSE B.[1] END AS January,
                        CASE WHEN B.[2] IS NULL THEN 0 ELSE B.[2] END AS February,
                        CASE WHEN B.[3] IS NULL THEN 0 ELSE B.[3] END AS March,
                        CASE WHEN B.[4] IS NULL THEN 0 ELSE B.[4] END AS April,
                        CASE WHEN B.[5] IS NULL THEN 0 ELSE B.[5] END AS May,
                        CASE WHEN B.[6] IS NULL THEN 0 ELSE B.[6] END AS June,
                        CASE WHEN B.[7] IS NULL THEN 0 ELSE B.[7] END AS July,
                        CASE WHEN B.[8] IS NULL THEN 0 ELSE B.[8] END AS August,
                        CASE WHEN B.[9] IS NULL THEN 0 ELSE B.[9] END AS September,
                        CASE WHEN B.[10] IS NULL THEN 0 ELSE B.[10] END AS October,
                        CASE WHEN B.[11] IS NULL THEN 0 ELSE B.[11] END AS November,
                        CASE WHEN B.[12] IS NULL THEN 0 ELSE B.[12] END AS December
                    FROM
                        (SELECT
                            MONTH(create_date) AS month_result,
                            CONVERT(float, total_price) AS total_price
                        FROM
                            [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SLIP_DETAIL]
                        WHERE year(create_date) = ${year}) A
                    PIVOT
                        (SUM(total_price) FOR month_result IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])) B;`;
  return db.query(SQLQuery);
};

export const getSlipSummaryDoughnutModels = (year) => {
  const SQLQuery = `SELECT TOP (1000)
                        bu_code,
                        bu_name,
                        SUM(total_price) AS Total_Price
                    FROM 
                        [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SLIP_DETAIL]
                    WHERE
                        bu_code IS NOT NULL
                        AND bu_name IS NOT NULL
                        AND year = ${year}
                    GROUP BY 
                        bu_code,
                        bu_name
                    ORDER BY 
                        Total_Price DESC;`;
  return db.query(SQLQuery);
};

export const getSlipSummaryByBuModels = (year, bu_code) => {
  const SQLQuery = `SELECT
                        CASE WHEN B.[1] IS NULL THEN 0 ELSE B.[1] END AS January,
                        CASE WHEN B.[2] IS NULL THEN 0 ELSE B.[2] END AS February,
                        CASE WHEN B.[3] IS NULL THEN 0 ELSE B.[3] END AS March,
                        CASE WHEN B.[4] IS NULL THEN 0 ELSE B.[4] END AS April,
                        CASE WHEN B.[5] IS NULL THEN 0 ELSE B.[5] END AS May,
                        CASE WHEN B.[6] IS NULL THEN 0 ELSE B.[6] END AS June,
                        CASE WHEN B.[7] IS NULL THEN 0 ELSE B.[7] END AS July,
                        CASE WHEN B.[8] IS NULL THEN 0 ELSE B.[8] END AS August,
                        CASE WHEN B.[9] IS NULL THEN 0 ELSE B.[9] END AS September,
                        CASE WHEN B.[10] IS NULL THEN 0 ELSE B.[10] END AS October,
                        CASE WHEN B.[11] IS NULL THEN 0 ELSE B.[11] END AS November,
                        CASE WHEN B.[12] IS NULL THEN 0 ELSE B.[12] END AS December
                    FROM
                        (SELECT
                            MONTH(create_date) AS month_result,
                            CONVERT(float, total_price) AS total_price
                        FROM
                            [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SLIP_DETAIL]
                        WHERE year(create_date) = ${year}
                        AND bu_code = ${bu_code}) A
                    PIVOT
                        (SUM(total_price) FOR month_result IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])) B;`;
  return db.query(SQLQuery);
};
