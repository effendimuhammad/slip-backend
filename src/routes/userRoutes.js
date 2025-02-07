import express from "express";
import {
  getUserController,
  getUserUpdateController,
  updateUserUpdateController,
  addNewUserController,
  deleteUserController,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/user", verifyToken, getUserController);
router.get("/:id", getUserUpdateController);
router.patch("/:id", updateUserUpdateController);
router.post("/", addNewUserController);
router.delete("/:id", deleteUserController);

export default router;
