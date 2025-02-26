import express from "express";
import {
  deleteSlipNoController,
  getDataPartNumberDetailController,
  getDataPartNumberDetailbyDateController,
  getDataPartNumberRangeDetailbyDateController,
  getDataPartNumberRangebyDateController,
} from "../controller/slipListController.js";
const router = express.Router();

router.delete("/delete/:kode_slip", deleteSlipNoController);
router.get("/get/:bu_code", getDataPartNumberDetailController);
router.get(
  "/getData/:bu_code/:create_date",
  getDataPartNumberDetailbyDateController
);
router.get(
  "/getDataRange/:bu_code/:startDate/:endDate",
  getDataPartNumberRangeDetailbyDateController
);

router.get(
  "/getSumRange/:bu_code/:startDate/:endDate",
  getDataPartNumberRangebyDateController
);

export default router;
