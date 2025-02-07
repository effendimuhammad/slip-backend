import { deleteSlipNoModels } from "../models/slipListModels.js";

export const deleteSlipNoController = async (req, res) => {
  const { kode_slip } = req.params;
  console.log("kode_slip :", kode_slip);
  try {
    await deleteSlipNoModels(kode_slip);
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
