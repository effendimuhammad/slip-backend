import express from "express";
import { sendEmailRev } from "../middleware/email.js";

const router = express.Router();

//SEND EMAIL
router.post("/send-email", sendEmailRev);

export default router;
