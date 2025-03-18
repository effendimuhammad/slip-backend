import express from "express";
import {
  getAllPartController,
  createPartController,
  updatePartController,
  deletePartController,
  getPartBaseOnBuController,
  getTotalMasterPartController,
  createMasterPartFileController,
  insertMasterPartFileController,
  downloadFile,
} from "../controller/masterPartController.js";

const router = express.Router();

//GET PART NUMBER  SHOW
router.get("/get/:bu_code", getAllPartController);
//POST ADD CREATE PART
router.post("/create", createPartController);
//UPDATE PART
router.patch("/update/:partnumber_id", updatePartController);
//DELETE PART
router.delete("/delete/:partnumber_id", deletePartController);
//GET PART BASE ON BU
router.get("/getEdit/:partnumber_id", getPartBaseOnBuController);
//GET PART MASTER BASE ON BU
router.get("/getPartMaster/:bu_code", getTotalMasterPartController);
//...
router.post("/createFile", createMasterPartFileController);
//POST MASTER DOCUMENT EXCEL
router.post("/insertFile", insertMasterPartFileController);
//GET MASTER DOCUMENT EXCEL
router.get("/downloadFile", downloadFile);

export default router;
