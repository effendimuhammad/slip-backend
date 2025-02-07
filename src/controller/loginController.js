import bcrypt from "bcryptjs";
import { loginModel, loginModelNav } from "../models/loginModel.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = "your_jwt_secret_key";

export const loginController = async (req, res) => {
  const { nim, password } = req.body;

  try {
    // Ambil user dari database berdasarkan username
    const result = await loginModel(nim);

    // Cek apakah recordset ada dan memiliki setidaknya satu hasil
    const user = result.recordset && result.recordset[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Bandingkan password yang dimasukkan dengan password yang di-hash
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user.id, nim: user.nim }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Login berhasil, kirimkan respons sukses
    res.json({
      message: "Login successful",
      user: { nim: user.nim, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

export const loginControllerNav = async (req, res) => {
  const { id } = req.params;
  try {
    const data = (await loginModelNav(id)).recordset;
    res.json({
      message: "GET all user success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};
