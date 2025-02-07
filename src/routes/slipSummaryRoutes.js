import express from "express";
import {
  getSlipSummaryController,
  getSlipSummaryDoughnutController,
} from "../controller/slipSummaryController.js";

const router = express.Router();

router.get("/get/:year", getSlipSummaryController);
router.get("/getDoughnut", getSlipSummaryDoughnutController);

export default router;
