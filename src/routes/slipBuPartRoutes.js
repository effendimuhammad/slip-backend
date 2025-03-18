import express from "express";
import { getAllBuPartSlipController } from "../controller/slipBuCardController.js";

const router = express.Router();

//GET BU BASED ON NIM USER
router.get("/getSlipBu/:nim", getAllBuPartSlipController);

export default router;
