import db from "../config/db.js";

//MASTER PART NUMBER
//GET ALL
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

//INSERT
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

//PATCH
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

//DELETE
export const deletePartModels = (partnumber_id) => {
  const SQLQuery = `DELETE FROM [dbo].[EXPENSE_M_PARTNUMBER_SCRAPT]
                    WHERE partnumber_id = '${partnumber_id}'`;
  return db.query(SQLQuery);
};

//GET BY BU
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

//GET TOTAL COUNT & SUM PART NUMBER
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

//INSERT DENGAN FILE NAME FORMAT (FORM KOSONG EXCEL)
export const createMasterPartFileModels = async (body, filename) => {
  console.log("body:", body);
  console.log("filename:", filename);

  const bu_code = body.bu_code || "";
  const bu_name = body.bu_name || "";

  const SQLQuery = `INSERT INTO [dbo].[EXPENSE_M_IMAGE_PARTNUMBER]
                    ([bu_code], 
                     [bu_name], 
                     [file],
                     [upload_date]                    
                     )
                    OUTPUT INSERTED.*
                    VALUES 
                    (
                     '${body.bu_code}',
                     '${body.bu_name}', 
                     '${filename}',
                     CURRENT_TIMESTAMP
                     )`;
  try {
    const result = await db.query(SQLQuery);
    return result.recordset[0]; // Mengembalikan data yang baru saja dimasukkan
  } catch (err) {
    throw new Error("Error inserting data: " + err.message);
  }
};

//INSERT FILE EXCEL MASTER PART NUMBER
export const insertMasterPartFileModels = async (body) => {
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

export const deleteOldData = (bu_code, bu_name) => {
  const SQLQuery = `DELETE FROM [dbo].[EXPENSE_M_PARTNUMBER_SCRAPT]
                    WHERE bu_code = '${bu_code}' AND bu_name = '${bu_name}'`;
  return db.query(SQLQuery);
};

export const checkIfDataExists = async (body) => {
  const SQLQuery = `SELECT COUNT(*) as count FROM [dbo].[EXPENSE_M_PARTNUMBER_SCRAPT]
                    WHERE bu_code = '${body.bu_code}' 
                    AND bu_name = '${body.bu_name}' 
                    AND partnumber = '${body.partnumber}'`;
  const result = await db.query(SQLQuery);
  return result.recordset[0].count > 0;
};
