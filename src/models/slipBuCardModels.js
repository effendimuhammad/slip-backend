import db from "../config/db.js";

//JOIN DENGAN MASTER BU ACCESS LOGIN DENGAN NIM
export const getAllBuSlipModels = (nim) => {
  const SQLQuery = `SELECT 
                      a.bu_code,
                      b.nim,
                      a.bu_name,
                      a.company_code,
                      a.plant_code,
                      a.product,
                      a.dept,
                      a.section,
                        b.create_by,
                        b.create_date
                    FROM 
                        [master].[dbo].[master_bu] a
                    INNER JOIN 
                        [DX_EXPENSE_PART].[dbo].[esm_t_d_access] b
                    ON 
                        a.bu_code = b.bu_code
                    WHERE 
                        b.nim = '${nim}';`;
  return db.query(SQLQuery);
};
