import {
  getAllPartModels,
  createPartModels,
  updatePartModels,
  deletePartModels,
  getPartBaseOnBuModels,
  getTotalMasterPartModels,
} from "../models/masterPartModels.js";

export const getAllPartController = async (req, res) => {
  const { bu_code } = req.params;
  try {
    const data = (await getAllPartModels(bu_code)).recordset;

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

export const createPartController = async (req, res) => {
  const data = req.body;
  console.log("data", data);

  try {
    await createPartModels(data);
    res.json({
      message: "Create Part Number Success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const updatePartController = async (req, res) => {
  const { partnumber_id } = req.params;
  console.log("bu_id :", partnumber_id);
  try {
    await updatePartModels(req.body, partnumber_id);
    res.json({
      message: "Update Part Number Success",
      data: req.body,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const deletePartController = async (req, res) => {
  const { partnumber_id } = req.params;
  console.log("partnumber_id :", partnumber_id);
  try {
    await deletePartModels(partnumber_id);
    res.json({
      message: "Delete Part Number Success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const getTotalMasterPartController = async (req, res) => {
  const { bu_code } = req.params;

  try {
    const data = await getTotalMasterPartModels(bu_code);
    console.log("data", data);
    const myData = data.recordset;
    res.json({
      message: "GET all Part Number Success",
      data: myData,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const getPartBaseOnBuController = async (req, res) => {
  const { partnumber_id } = req.params;

  try {
    const data = await getPartBaseOnBuModels(partnumber_id);
    console.log("data", data);
    const myData = data.recordset;
    res.json({
      message: "GET all Part Number Success",
      data: myData,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};
