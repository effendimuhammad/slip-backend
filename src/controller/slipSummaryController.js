import {
  getSlipSummaryModels,
  getSlipSummaryDoughnutModels,
} from "../models/slipSummaryModel.js";

export const getSlipSummaryController = async (req, res) => {
  const { year } = req.params;
  try {
    const data = (await getSlipSummaryModels(year)).recordset;
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

export const getSlipSummaryDoughnutController = async (req, res) => {
  try {
    const data = (await getSlipSummaryDoughnutModels()).recordset;
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
