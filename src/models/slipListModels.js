import db from "../config/db.js";

export const deleteSlipNoModels = (kode_slip) => {
  const SQLQuery = `DELETE FROM [dbo].[EXPENSE_T_SLIP] WHERE kode_slip = '${kode_slip}'`;
  return db.query(SQLQuery);
};

export const deleteSlipDetailModels = (kode_slip) => {
  const SQLQuery = `DELETE FROM [dbo].[EXPENSE_T_SLIP_DETAIL] WHERE kode_slip = '${kode_slip}'`;
  return db.query(SQLQuery);
};

export const getDataPartNumberDetailModels = (bu_code) => {
  const SQLQuery = `SELECT 
                      [id],
                      [kode_slip],
                      [bu_code],
                      [bu_name],
                      [partNumber],
                      [partName],
                      [quantity],
                      [price],
                      [total_price],
                      FORMAT(create_date, 'yyyy-MM-dd HH:mm:ss') AS create_date,
                      [update_date],
                      [month],
                      [year]
                    FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SLIP_DETAIL]
                    WHERE bu_code = '${bu_code}'
                    ORDER BY create_date DESC`;
  return db.query(SQLQuery);
};

export const getDataPartNumberDetailbyDateModels = (bu_code, create_date) => {
  const SQLQuery = `SELECT 
                        SUM(total_price) AS total_price_sum
                    FROM
                        [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SLIP_DETAIL] 
                    WHERE 
                        bu_code = '${bu_code}' 
                    AND LEFT(CONVERT(VARCHAR, create_date, 120), 10) = '${create_date}'`;
  return db.query(SQLQuery);
};

export const getDataPartNumberRangeDetailbyDateModels = (
  bu_code,
  startDate,
  endDate
) => {
  const SQLQuery = `SELECT 
                      [id],
                      [kode_slip],
                      [bu_code],
                      [bu_name],
                      [partNumber],
                      [partName],
                      [quantity],
                      [price],
                      [total_price],
                      FORMAT(create_date, 'yyyy-MM-dd HH:mm:ss') AS create_date,
                      [update_date],
                      [month],
                      [year]
                    FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SLIP_DETAIL]
                    WHERE bu_code = '${bu_code}'
                      AND create_date >= '${startDate}' 
                      AND create_date <= '${endDate} 23:59:59'
                    ORDER BY create_date DESC;`;
  return db.query(SQLQuery);
};

export const getDataPartNumberRangebyDateModels = (
  bu_code,
  startDate,
  endDate
) => {
  const SQLQuery = `SELECT 
                      SUM(total_price) AS total_price_sum
                    FROM
                      [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SLIP_DETAIL] 
                    WHERE 
                      bu_code = '${bu_code}' 
                      AND create_date BETWEEN '${startDate}' AND '${endDate}'`;
  return db.query(SQLQuery);
};
