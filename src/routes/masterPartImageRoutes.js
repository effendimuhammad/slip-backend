import express from "express";
import {
  createPartImageController,
  getFilesController,
} from "../controller/masterPartImageController.js";

const router = express.Router();

//POST MASTER DOCUMENT EXCEL ,PDF ,PPT, JPG, ETC
router.post("/create", createPartImageController);
//GET MASTER DOCUMENT EXCEL ,PDF ,PPT, JPG, ETC
router.get("/files", getFilesController);

export default router;
