import express from "express";
import {
  handleInsertSlipPart,
  getAllPartSlipController,
  getDropDownPartNumberSlipController,
  deleteSlipController,
} from "../controller/slipController.js";

const router = express.Router();

//INSERT SLIP PART NUMBER --> InputSlip.js
router.post("/insertSlip", handleInsertSlipPart);
//GET DATA SLIP NO BY BU --> InputSlip.js
router.get("/getAllPartSlip/:bu_code", getAllPartSlipController);
//GET DROPDOWN PART NUMBER IF INSERT SLIP --> InputSlip.js
router.get(
  "/getDropDownPartNumberSlip/:bu_code",
  getDropDownPartNumberSlipController
);
//DELETE SLIP NO --> InputSlip.js
router.delete("/deleteSlip/:id", deleteSlipController);

export default router;
