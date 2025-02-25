import express from "express";
import {
  createPartImageController,
  getFilesController,
} from "../controller/masterPartImageController.js";

const router = express.Router();

//CREATE PART
router.post("/create", createPartImageController);
router.get("/files", getFilesController);

export default router;
