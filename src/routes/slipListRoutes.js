import express from "express";
import {
  deleteSlipNoController,
  getDataPartNumberDetailController,
  getDataPartNumberDetailbyDateController,
} from "../controller/slipListController.js";
const router = express.Router();

router.delete("/delete/:kode_slip", deleteSlipNoController);
router.get("/get/:bu_code", getDataPartNumberDetailController);
router.get(
  "/getData/:bu_code/:create_date",
  getDataPartNumberDetailbyDateController
);

export default router;
