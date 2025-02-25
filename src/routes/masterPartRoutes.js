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

//GET PART
router.get("/get/:bu_code", getAllPartController);
//CREATE PART
router.post("/create", createPartController);
//UPDATE PART
router.patch("/update/:partnumber_id", updatePartController);
//DELETE PART
router.delete("/delete/:partnumber_id", deletePartController);
//GET PART BASE ON BU
router.get("/getEdit/:partnumber_id", getPartBaseOnBuController);

//GET PART MASTER BASE ON BU
router.get("/getPartMaster/:bu_code", getTotalMasterPartController);

router.post("/createFile", createMasterPartFileController);

router.post("/insertFile", insertMasterPartFileController);

router.get("/downloadFile", downloadFile);

export default router;
