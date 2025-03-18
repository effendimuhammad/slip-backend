import express from "express";
import {
  deleteSlipNoController,
  getDataPartNumberDetailController,
  getDataPartNumberDetailbyDateController,
  getDataPartNumberRangeDetailbyDateController,
  getDataPartNumberRangebyDateController,
} from "../controller/slipListController.js";
const router = express.Router();

//DELETE SLIP NO --> inputSlip.js
router.delete("/delete/:kode_slip", deleteSlipNoController);
//GET DATA SLIP NO BY BU --> chartdata.js
router.get("/get/:bu_code", getDataPartNumberDetailController);
//GET DATA SLIP NO BY BU SEARCH DATE--> chartdata.js
router.get(
  "/getData/:bu_code/:create_date",
  getDataPartNumberDetailbyDateController
);
//GET DATA SLIP NO BY BU SEARCH RANGE DATE--> chartdata.js
router.get(
  "/getDataRange/:bu_code/:startDate/:endDate",
  getDataPartNumberRangeDetailbyDateController
);
//GET DATA SLIP NO BY BU SUM RANGE DATE--> chartdata.js
router.get(
  "/getSumRange/:bu_code/:startDate/:endDate",
  getDataPartNumberRangebyDateController
);

export default router;
