import db from "../config/db.js";

export const getDetailPartSlipModels = (kode_slip) => {
  const SQLQuery = `
            SELECT 
                    e.id,
                    e.kode_slip,
					e.bu_code,
					e.bu_name,

                    e.partNumber,
                    e.partName,
                    e.quantity,
                    e.price,
                    e.total_price,
                    t.total_price_sum
                FROM 
                    [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SLIP_DETAIL] e
                JOIN (
                    SELECT 
                        kode_slip,
                        SUM(total_price) AS total_price_sum
                    FROM 
                        [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SLIP_DETAIL]
                    GROUP BY 
                        kode_slip
                ) t ON e.kode_slip = t.kode_slip
                WHERE 
                    e.kode_slip = '${kode_slip}';
                `;
  return db.query(SQLQuery);
};

export const getDetailSlipUpdateModels = (id) => {
  const SQLQuery = `SELECT [id]
                        ,[kode_slip]
                        ,[bu_code]
                        ,[bu_name]
                        ,[partNumber]
                        ,[partName]
                        ,[quantity]
                        ,[price]
                        ,[total_price]
                        ,[create_date]
                        ,[update_date]
                    FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SLIP_DETAIL]
                      WHERE id = ${id}`;
  return db.query(SQLQuery);
};
// export const updateDetailSlipModels = (data, id) => {
//   const { kode_slip, bu_code, bu_name, partNumber, partName, quantity, price } =
//     data;
//   const SQLQuery = `UPDATE [dbo].[EXPENSE_T_SLIP_DETAIL]
//                     SET [kode_slip]     = '${kode_slip}'
//                         ,[bu_code]      = '${bu_code}'
//                         ,[bu_name]      = '${bu_name}'
//                         ,[partNumber]   = '${partNumber}'
//                         ,[partName]     = '${partName}'
//                         ,[quantity]     = '${quantity}'
//                         ,[price]        = '${price}
//                     WHERE id = '${id}'`;
//   return db.query(SQLQuery);
// };

export const updateDetailSlipModels = async (data, id) => {
  const { kode_slip, bu_code, bu_name, partNumber, partName, quantity, price } =
    data;
  const total_price = quantity * price; // Hitung
  const SQLQuery = `UPDATE [dbo].[EXPENSE_T_SLIP_DETAIL]
                    SET [kode_slip] = @kode_slip,
                        [bu_code] = @bu_code,
                        [bu_name] = @bu_name,
                        [partNumber] = @partNumber,
                        [partName] = @partName,
                        [quantity] = @quantity,
                        [price] = @price,
                        [total_price] = @total_price
                    WHERE id = @id`;

  try {
    const pool = await db.connect("your-connection-string");
    const result = await pool
      .request()
      .input("kode_slip", db.VarChar, kode_slip)
      .input("bu_code", db.VarChar, bu_code)
      .input("bu_name", db.VarChar, bu_name)
      .input("partNumber", db.VarChar, partNumber)
      .input("partName", db.VarChar, partName)
      .input("quantity", db.Int, quantity)
      .input("price", db.Decimal, price)
      .input("total_price", db.Decimal(18, 2), total_price)
      .input("id", db.Int, id)
      .query(SQLQuery);
    return result;
  } catch (error) {
    console.error("Error updating slip:", error);
    throw error;
  }
};
