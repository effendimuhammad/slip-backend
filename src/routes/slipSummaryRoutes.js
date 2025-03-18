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
//GET SLIP SUMMARY TOTAL FAJAR BAR CHART
router.get("/get/:year", getSlipSummaryController);
//GET SLIP SUMMARY DOUGHNUT CHART
router.get("/getDoughnut/:year", getSlipSummaryDoughnutController);
//GET SLIP SUMMARY BY BU BAR CHART
router.get("/getByBu/:year/:bu_code", getSlipSummaryByBuController);
//GET SLIP SUMMARY BY BU HORIZONTAL BAR CHART
router.get(
  "/getByBuHorizontal/:year/:bu_code",
  getSlipSummaryByHorizontalController
);
//GET SLIP SUMMARY SUMMARY PRICE BY BU
router.get(
  "/getSummaryPriceByBU/:year/:bu_code",
  getSummaryPriceByBUController
);
//GET SLIP SUMMARY STAKED BAR CHART TUMPUK
router.get("/getStakedBar/:year/:bu_code", getStakedBarController);

export default router;
