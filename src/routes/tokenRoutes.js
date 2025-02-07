import express from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = "your_jwt_secret_key";

const router = express.Router();

router.post("/", (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(404)
        .json({ message: "Unauthorized! Token expired or invalid" });
    }
    req.userId = decoded.userId;
    res.status(200).json({ message: "Token valid OK" });
  });
});

export default router;
