import express from "express";
import {
  getSlipSummaryController,
  getSlipSummaryDoughnutController,
  getSlipSummaryByBuController,
  getSlipSummaryByHorizontalController,
  getSummaryPriceByBUController,
  getStakedBarController,
} from "../controller/slipSummaryController.js";

const router = express.Router();

router.get("/get/:year", getSlipSummaryController);
router.get("/getDoughnut/:year", getSlipSummaryDoughnutController);
router.get("/getByBu/:year/:bu_code", getSlipSummaryByBuController);
router.get(
  "/getByBuHorizontal/:year/:bu_code",
  getSlipSummaryByHorizontalController
);
router.get(
  "/getSummaryPriceByBU/:year/:bu_code",
  getSummaryPriceByBUController
);
router.get("/getStakedBar/:year/:bu_code", getStakedBarController);

export default router;
