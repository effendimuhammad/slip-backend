import express from "express";
import {
  getTransactionPartController,
  insertTransactionPartController,
} from "../controller/transactionPartController.js";

const router = express.Router();

//GET TRANSACTION PART
router.get("/get", getTransactionPartController);

//POST TRANSACTION PART
router.post("/create", insertTransactionPartController);

export default router;
