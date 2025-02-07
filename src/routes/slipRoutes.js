import express from "express";
import {
  handleInsertSlipPart,
  getAllPartSlipController,
  getDropDownPartNumberSlipController,
  deleteSlipController,
} from "../controller/slipController.js";

const router = express.Router();

router.post("/insertSlip", handleInsertSlipPart);
router.get("/getAllPartSlip/:bu_code", getAllPartSlipController);
router.get(
  "/getDropDownPartNumberSlip/:bu_code",
  getDropDownPartNumberSlipController
);
router.delete("/deleteSlip/:id", deleteSlipController);

export default router;
