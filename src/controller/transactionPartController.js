import {
  getMasterAllPartModels,
  insertSlip,
} from "../models/transactionPartModels.js";

export const getTransactionPartController = async (req, res) => {
  try {
    const data = (await getMasterAllPartModels()).recordset;

    res.json({
      message: "GET all Part Number Success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const insertTransactionPartController = async (req, res) => {
  const { kode_slip, items } = req.body;
  console.log("kode_slip", kode_slip);

  try {
    const result = await insertSlip(kode_slip, items);
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);

    if (err.code === "EREQUEST") {
      res.status(400).json({
        success: false,
        message: "Kesalahan dalam permintaan SQL: " + err.message,
      });
    } else if (err.code === "ECONNCLOSED") {
      res.status(500).json({
        success: false,
        message: "Koneksi ke database terputus: " + err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Kesalahan tidak terduga: " + err.message,
      });
    }
  }
};
