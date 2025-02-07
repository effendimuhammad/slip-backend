import {
  insertSlip,
  insertItem,
  getAllPartSlipModels,
  getDropDownPartNumberSlipModels,
  deleteSlipModels,
} from "../models/slipModels.js";

export const handleInsertSlipPart = async (req, res) => {
  const { kode_slip, bu_code, bu_name, items } = req.body;
  console.log(kode_slip);
  console.log(bu_code);
  console.log(bu_name);
  console.log(items);

  try {
    await insertSlip(kode_slip, bu_code, bu_name);
    for (let item of items) {
      await insertItem(kode_slip, bu_code, bu_name, item);
    }

    res.status(201).send("Data inserted successfully . . . . ..");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const getAllPartSlipController = async (req, res) => {
  try {
    const { bu_code } = req.params;
    const data = (await getAllPartSlipModels(bu_code)).recordset;
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

export const getDropDownPartNumberSlipController = async (req, res) => {
  try {
    const { bu_code } = req.params;
    const data = (await getDropDownPartNumberSlipModels(bu_code)).recordset;
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

export const deleteSlipController = async (req, res) => {
  const { id } = req.params;
  console.log("id :", id);
  try {
    await deleteSlipModels(id);
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
