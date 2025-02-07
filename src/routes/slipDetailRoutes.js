import express from "express";
import {
  getDetailPartSlipController,
  getDetailSlipUpdateController,
  updateDetailSlipController,
} from "../controller/slipDetailController.js";

const router = express.Router();

router.get("/detail/:kode_slip", getDetailPartSlipController);
router.get("/getUpdateSlip/:id", getDetailSlipUpdateController);
router.patch("/update/:id", updateDetailSlipController);

export default router;
