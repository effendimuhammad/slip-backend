import db from "../config/db.js";

export const deleteSlipNoModels = (kode_slip) => {
  const SQLQuery = `DELETE FROM [dbo].[EXPENSE_T_SLIP] WHERE kode_slip = '${kode_slip}'`;
  return db.query(SQLQuery);
};
