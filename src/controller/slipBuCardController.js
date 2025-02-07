import { getAllBuSlipModels } from "../models/slipBuCardModels.js";

export const getAllBuPartSlipController = async (req, res) => {
  const { nim } = req.params;
  try {
    const data = (await getAllBuSlipModels(nim)).recordset;
    console.log("data", data);

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
