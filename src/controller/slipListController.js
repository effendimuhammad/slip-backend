import {
  deleteSlipNoModels,
  deleteSlipDetailModels,
  getDataPartNumberDetailModels,
  getDataPartNumberDetailbyDateModels,
} from "../models/slipListModels.js";

export const deleteSlipNoController = async (req, res) => {
  const { kode_slip } = req.params;
  console.log("kode_slip :", kode_slip);
  try {
    // Delete from both tables
    await deleteSlipDetailModels(kode_slip);
    await deleteSlipNoModels(kode_slip);

    res.json({
      message: "Delete Slip Success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error deleting data",
      error: err.message,
    });
  }
};

export const getDataPartNumberDetailController = async (req, res) => {
  const { bu_code } = req.params;
  try {
    const result = await getDataPartNumberDetailModels(bu_code);
    const data = result.recordset;

    console.log("data", data);

    res.json({
      message: "GET detail Part Number Success",
      data: data,
    });
  } catch (err) {
    console.error("Error getting data:", err);
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const getDataPartNumberDetailbyDateController = async (req, res) => {
  const { bu_code, create_date } = req.params;
  console.log("create_date", create_date);
  console.log("bu_code", bu_code);

  try {
    const result = await getDataPartNumberDetailbyDateModels(
      bu_code,
      create_date
    );
    const data = result.recordset;
    res.json({
      message: "GET detail Part Number Success",
      data: data,
    });
  } catch (err) {
    console.error("Error getting data:", err);
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};
