import {
  getUserModels,
  getUserUpdateModels,
  updateUserUpdateModels,
  createUserModels,
  deleteUserModels,
} from "../models/userModels.js";
import bcrypt from "bcryptjs";

export const getUserController = async (req, res) => {
  try {
    const data = await getUserModels();
    console.log("data", data);

    const myData = data.recordset;
    res.json({
      message: "GET all user success",
      data: myData,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const getUserUpdateController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = (await getUserUpdateModels(id)).recordset;
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

export const updateUserUpdateController = async (req, res) => {
  const { id } = req.params;
  try {
    await updateUserUpdateModels(req.body, id).recordset;
    res.json({
      message: "update user success",
      data: {
        id: id,
        ...req.body,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const addNewUserController = async (req, res) => {
  const { username, nim, password, email } = req.body;

  console.log(username, nim, password, email);

  const encryptsPassword = bcrypt.hashSync(password);
  await createUserModels(username, nim, encryptsPassword, email);

  res.status(200).json({
    msg: "register success",
    data: { username, nim, email },
  });
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserModels(id);
    res.json({
      message: "DELETE user success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      message: "Server error",
      serverMessage: error,
    });
  }
};
