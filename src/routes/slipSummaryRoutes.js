import express from "express";
import {
  getSlipSummaryController,
  getSlipSummaryDoughnutController,
  getSlipSummaryByBuController,
} from "../controller/slipSummaryController.js";

const router = express.Router();

router.get("/get/:year", getSlipSummaryController);
router.get("/getDoughnut/:year", getSlipSummaryDoughnutController);
router.get("/getByBu/:year/:bu_code", getSlipSummaryDoughnutController);

export default router;
