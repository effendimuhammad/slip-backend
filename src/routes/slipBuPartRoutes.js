import express from "express";
import { getAllBuPartSlipController } from "../controller/slipBuCardController.js";

const router = express.Router();

router.get("/getSlipBu/:nim", getAllBuPartSlipController);

export default router;
