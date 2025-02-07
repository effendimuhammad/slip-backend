import db from "../config/db.js";

export const insertSlip = async (kode_slip, bu_code, bu_name) => {
  const pool = await db.connect();
  return pool
    .request()
    .input("kode_slip", db.VarChar, kode_slip)
    .input("bu_code", db.VarChar, bu_code)
    .input("bu_name", db.VarChar, bu_name)
    .query(
      `INSERT INTO EXPENSE_T_SLIP 
                          (kode_slip,
                          bu_code,
                          bu_name, 
                          create_date)
                    VALUES 
                          (@kode_slip,
                          @bu_code,
                          @bu_name,
                          CURRENT_TIMESTAMP)`
    );
};

export const insertItem = async (kode_slip, bu_code, bu_name, item) => {
  const pool = await db.connect();
  const total_price = item.quantity * item.price; // Hitung
  return pool
    .request()
    .input("kode_slip", db.VarChar, kode_slip)
    .input("bu_code", db.VarChar, bu_code)
    .input("bu_name", db.VarChar, bu_name)
    .input("partNumber", db.VarChar, item.partNumber)
    .input("partName", db.VarChar, item.partName)
    .input("quantity", db.Int, item.quantity)
    .input("price", db.Decimal(18, 2), item.price)
    .input("total_price", db.Decimal(18, 2), total_price)
    .query(
      `INSERT INTO EXPENSE_T_SLIP_DETAIL 
                            (kode_slip,
                              bu_code,
                              bu_name,
                             partNumber,
                             partName, 
                             quantity, 
                             price,
                             total_price,
                             create_date,
                             month,
                             year) 
                     VALUES 
                            (@kode_slip,
                              @bu_code,
                              @bu_name,
                              @partNumber, 
                              @partName, 
                              @quantity, 
                              @price, 
                              @total_price,
                              CURRENT_TIMESTAMP,
                              MONTH(CURRENT_TIMESTAMP),
                              YEAR(CURRENT_TIMESTAMP))`
    );
};

export const getAllPartSlipModels = (bu_code) => {
  const SQLQuery = `
                  SELECT 
                      id,
                      kode_slip,
                      FORMAT(create_date, 'yyyy-MM-dd HH:mm:ss') AS create_date,
                      bu_code,
                      bu_name,
                      total_price
                  FROM (
                      SELECT 
                          e.id,
                          d.kode_slip,
                          d.create_date,
                          d.bu_code,
                          d.bu_name,
                          SUM(e.total_price) AS total_price,
                          ROW_NUMBER() OVER (PARTITION BY d.kode_slip ORDER BY d.create_date DESC) AS row_num
                      FROM 
                          EXPENSE_T_SLIP_DETAIL e
                      JOIN 
                          EXPENSE_T_SLIP d ON e.kode_slip = d.kode_slip
                      WHERE 
                                            d.bu_code = ${bu_code}
                      GROUP BY 
                          e.id, d.kode_slip, d.create_date, d.bu_code, d.bu_name
                  ) sub
                  WHERE row_num = 1
                  ORDER BY 
                      create_date DESC;
                `;
  return db.query(SQLQuery);
};

export const getDropDownPartNumberSlipModels = (bu_code) => {
  const SQLQuery = `SELECT [partnumber_id]
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
                    WHERE bu_code = '${bu_code}'`;
  return db.query(SQLQuery);
};

export const deleteSlipModels = (id) => {
  const SQLQuery = `DELETE FROM [dbo].[EXPENSE_T_SLIP_DETAIL] WHERE id = ${id}`;
  return db.query(SQLQuery);
};
