import db from "../config/db.js";
import sql from "mssql";

export const getMasterAllPartModels = () => {
  const SQLQuery = `SELECT [id_summaryPart]
                        ,[kode_slip]
                        ,[datedoc]
                        ,[partNumber]
                        ,[partName]
                        ,[quantity]
                        ,[price]
                        ,[totalPrice]
                        ,[create_by]
                        ,[create_date]
                        ,[update_by]
                        ,[update_date]
                    FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SUMMARY]`;
  return db.query(SQLQuery);
};

export const createPartModels = (body) => {
  const SQLQuery = `INSERT INTO [dbo].[EXPENSE_T_SUMMARY]
                        ([kode_slip]
                        ,[datedoc]
                        ,[partNumber]
                        ,[partName]
                        ,[quantity]
                        ,[price]
                        ,[totalPrice]
                        ,[create_date]
                        ,[update_date]
                        )
                    VALUES
                        ('c852',
                        '2023-07-04 00:00:00.000',
                        'JK053431-7502'
                        ,'BOBBIN'
                        ,'35'
                        ,'1967.06'
                        ,'5000'
                        )`;
  return db.query(SQLQuery);
};

// Insert Slip dan Barang ke Database
export const insertSlip = async (kode_slip, items) => {
  const transaction = new sql.Transaction();

  try {
    await sql.connect(db);
    await transaction.begin();

    // Insert ke tabel Slip
    const slipQuery = `
      INSERT INTO [dbo].[EXPENSE_T_SLIP]
           ([kode_slip], [tanggal])
      VALUES
           ("${kode_slip}", CURRENT_TIMESTAMP)
    `;
    const slipRequest = transaction.request();
    slipRequest.input("kode_slip", sql.VarChar, kode_slip);
    await slipRequest.query(slipQuery);

    // Insert ke tabel Slip_Detail
    const detailQuery = `
      INSERT INTO [dbo].[EXPENSE_T_SLIP_DETAIL]
           ([kode_slip], [partNumber], [partName], [quantity], [price])
      VALUES
           ("${kode_slip}", "${partNumber}", "${partName}", "${quantity}", "${price}")
    `;
    for (let item of items) {
      const detailRequest = transaction.request();
      detailRequest.input("kode_slip", sql.VarChar, kode_slip);
      detailRequest.input("partNumber", sql.VarChar, item.partNumber);
      detailRequest.input("partName", sql.VarChar, item.partName);
      detailRequest.input("quantity", sql.Int, item.quantity);
      detailRequest.input("price", sql.Int, item.price);
      await detailRequest.query(detailQuery);
    }

    await transaction.commit();
    return { success: true };
  } catch (err) {
    await transaction.rollback();
    console.error(err.message);

    // Menangani kesalahan spesifik
    if (err.code === "EREQUEST") {
      return {
        success: false,
        message: "Kesalahan dalam permintaan SQL: " + err.message,
      };
    } else if (err.code === "ECONNCLOSED") {
      return {
        success: false,
        message: "Koneksi ke database terputus: " + err.message,
      };
    } else {
      return {
        success: false,
        message: "Kesalahan tidak terduga: " + err.message,
      };
    }
  }
};
