import express from "express";
import {
  getDetailPartSlipController,
  getDetailSlipUpdateController,
  updateDetailSlipController,
} from "../controller/slipDetailController.js";

const router = express.Router();

//GET DETAIL SLIP FOR MODAL DETAIL --> InputSlip.js
router.get("/detail/:kode_slip", getDetailPartSlipController);
//GET DETAIL SLIP UPDATE FOR MODAL DETAIL --> DetailSlip.js
router.get("/getUpdateSlip/:id", getDetailSlipUpdateController);
//UPDATE DETAIL SLIP FOR MODAL DETAIL --> DetailSlip.js
router.patch("/update/:id", updateDetailSlipController);

export default router;
