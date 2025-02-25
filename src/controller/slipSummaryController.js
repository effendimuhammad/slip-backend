import {
  getSlipSummaryModels,
  getSlipSummaryDoughnutModels,
  getSlipSummaryByBuModels,
  getSlipSummaryByBuHorizontalModels,
  getSummaryPriceByBUModels,
  gerStakedBarModels,
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
  const { year } = req.params;
  try {
    const data = (await getSlipSummaryDoughnutModels(year)).recordset;
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

export const getSlipSummaryByBuController = async (req, res) => {
  const { year } = req.params;
  const { bu_code } = req.params;

  try {
    const data = (await getSlipSummaryByBuModels(year, bu_code)).recordset;
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

export const getSlipSummaryByHorizontalController = async (req, res) => {
  const { year } = req.params;
  const { bu_code } = req.params;

  try {
    const data = (await getSlipSummaryByBuHorizontalModels(year, bu_code))
      .recordset;
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

export const getSummaryPriceByBUController = async (req, res) => {
  const { year } = req.params;
  const { bu_code } = req.params;

  try {
    const data = (await getSummaryPriceByBUModels(year, bu_code)).recordset;
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

export const getStakedBarController = async (req, res) => {
  const { year } = req.params;
  const { bu_code } = req.params;

  try {
    const data = (await gerStakedBarModels(year, bu_code)).recordset;
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
