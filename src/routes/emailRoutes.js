import express from "express";
import sendEmailController from "../controller/emailController.js";

const router = express.Router();

// Rute untuk mengatur data email
router.post("/set-email-data", sendEmailController);

export default router;
