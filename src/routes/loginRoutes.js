import express from "express";
import {
  loginController,
  loginControllerNav,
} from "../controller/loginController.js";

const router = express.Router();

//LOGIN
router.post("/login", loginController);
//...
router.get("/:id", loginControllerNav);

export default router;
