import {
  getDetailPartSlipModels,
  getDetailSlipUpdateModels,
  updateDetailSlipModels,
} from "../models/slipDetailModels.js";

export const getDetailPartSlipController = async (req, res) => {
  const { kode_slip } = req.params;
  try {
    const data = (await getDetailPartSlipModels(kode_slip)).recordset;
    console.log("data", data);

    res.json({
      message: "GET detail Part Number Success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const getDetailSlipUpdateController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = (await getDetailSlipUpdateModels(id)).recordset;
    res.json({
      message: "GET all user success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const updateDetailSlipController = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;
  console.log("id :", id);

  try {
    const data = await updateDetailSlipModels(formData, id).recordset;
    console.log("update", req.body);

    res.json({
      message: "update user success",
      data: data,
      data: {
        data: data,
        ...req.body,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};
