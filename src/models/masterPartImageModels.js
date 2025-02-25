import db from "../config/db.js";

export const createPartImageModels = async (body, filename) => {
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

export const getPartImageModels = async () => {
  const SQLQuery = `SELECT  [id]
                            ,[bu_code]
                            ,[bu_name]
                            ,[file]
                            ,[upload_date]
                        FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_M_IMAGE_PARTNUMBER]`;

  try {
    const result = await db.query(SQLQuery);
    return result.recordset; // Mengembalikan data dari database
  } catch (err) {
    throw new Error("Error fetching data: " + err.message);
  }
};
