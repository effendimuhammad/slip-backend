import db from "../config/db.js";

export const getAllPartModels = (bu_code) => {
  const SQLQuery = `SELECT  [partnumber_id]
                            ,[bu_code]
                            ,[bu_name]
                            ,[partnumber]
                            ,[partname]
                            ,[price]
                            ,[create_by]
                            ,FORMAT(create_date, 'yyyy-MM-dd HH:mm:ss') AS create_date
                            ,[update_by]
                            ,FORMAT(update_date, 'yyyy-MM-dd HH:mm:ss') AS update_date
                        FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_M_PARTNUMBER_SCRAPT]
                        WHERE bu_code = '${bu_code}'
                        ORDER BY create_date DESC`;
  return db.query(SQLQuery);
};

export const createPartModels = (body) => {
  const SQLQuery = `INSERT INTO [dbo].[EXPENSE_M_PARTNUMBER_SCRAPT]
                    ([bu_code], 
                     [bu_name], 
                     [partnumber],
                     [partname],
                     [price],
                     [create_date]                    
                     )
                    VALUES 
                    (
                     '${body.bu_code}',
                     '${body.bu_name}', 
                     '${body.partnumber}', 
                     '${body.partname}', 
                     '${body.price}',
                     CURRENT_TIMESTAMP
                     )`;
  return db.query(SQLQuery);
};

export const updatePartModels = (body, partnumber_id) => {
  const SQLQuery = `UPDATE [dbo].[EXPENSE_M_PARTNUMBER_SCRAPT]
                    SET [bu_code]       = '${body.bu_code}',
                        [bu_name]       = '${body.bu_name}',
                        [partnumber]       = '${body.partnumber}',
                        [partname]     = '${body.partname}',
                        [price]         = '${body.price}',
                        [update_date]   = CURRENT_TIMESTAMP
                    WHERE partnumber_id = ${partnumber_id}`;
  return db.query(SQLQuery);
};

export const deletePartModels = (partnumber_id) => {
  const SQLQuery = `DELETE FROM [dbo].[EXPENSE_M_PARTNUMBER_SCRAPT]
                    WHERE partnumber_id = '${partnumber_id}'`;
  return db.query(SQLQuery);
};

export const getPartBaseOnBuModels = (partnumber_id) => {
  const SQLQuery = `SELECT  [partnumber_id]
                            ,[bu_code]
                            ,[bu_name]
                            ,[partnumber]
                            ,[partname]
                            ,[price]
                            ,[create_by]
                            ,[create_date]
                            ,[update_by]
                            ,[update_date]
                        FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_M_PARTNUMBER_SCRAPT]
	                    WHERE partnumber_id = ${partnumber_id}`;
  return db.query(SQLQuery);
};

export const getTotalMasterPartModels = (bu_code) => {
  const SQLQuery = `  SELECT 
                          [bu_code],
                          [bu_name],
                          COUNT([partnumber]) AS total_partnumbers,
                          SUM([price]) AS total_price
                      FROM 
                          [DX_EXPENSE_PART].[dbo].[EXPENSE_M_PARTNUMBER_SCRAPT]
                        where bu_code = '${bu_code}'
                      GROUP BY 
                          [bu_code],
                          [bu_name]`;
  return db.query(SQLQuery);
};
