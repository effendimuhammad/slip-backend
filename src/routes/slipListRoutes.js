import express from "express";
import { deleteSlipNoController } from "../controller/slipListController.js";
const router = express.Router();

router.delete("/delete/:kode_slip", deleteSlipNoController);

export default router;
