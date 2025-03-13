import express from "express";
import { sendEmailRev } from "../middleware/email.js";

const router = express.Router();

// Rute untuk mengatur data email
router.post("/send-email", sendEmailRev);

export default router;
