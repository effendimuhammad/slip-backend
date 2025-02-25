import {
  getAllPartModels,
  createPartModels,
  updatePartModels,
  deletePartModels,
  getPartBaseOnBuModels,
  getTotalMasterPartModels,
  createMasterPartFileModels,
  insertMasterPartFileModels,
  checkIfDataExists,
  deleteOldData,
} from "../models/masterPartModels.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllPartController = async (req, res) => {
  const { bu_code } = req.params;
  try {
    const data = (await getAllPartModels(bu_code)).recordset;

    res.json({
      message: "GET all Part Number Success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const createPartController = async (req, res) => {
  const data = req.body;
  console.log("data", data);

  try {
    await createPartModels(data);
    res.json({
      message: "Create Part Number Success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const updatePartController = async (req, res) => {
  const { partnumber_id } = req.params;
  console.log("bu_id :", partnumber_id);
  try {
    await updatePartModels(req.body, partnumber_id);
    res.json({
      message: "Update Part Number Success",
      data: req.body,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const deletePartController = async (req, res) => {
  const { partnumber_id } = req.params;
  console.log("partnumber_id :", partnumber_id);
  try {
    await deletePartModels(partnumber_id);
    res.json({
      message: "Delete Part Number Success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const getTotalMasterPartController = async (req, res) => {
  const { bu_code } = req.params;

  try {
    const data = await getTotalMasterPartModels(bu_code);
    console.log("data", data);
    const myData = data.recordset;
    res.json({
      message: "GET all Part Number Success",
      data: myData,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const getPartBaseOnBuController = async (req, res) => {
  const { partnumber_id } = req.params;

  try {
    const data = await getPartBaseOnBuModels(partnumber_id);
    console.log("data", data);
    const myData = data.recordset;
    res.json({
      message: "GET all Part Number Success",
      data: myData,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const createMasterPartFileController = async (req, res) => {
  try {
    const file = req.file;
    console.log("sngkut file", file);

    let filename =
      req.protocol +
      "://" +
      req.get("host") +
      "/static/images/" +
      req.file.filename;
    console.log(filename);

    const data = await createMasterPartFileModels(req.body, filename); // Simpan hasilnya dalam variabel data
    res.json({
      message: "Create Part Number Success",
      data: data, // Gunakan variabel data yang telah didefinisikan
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting data",
      error: err.message,
    });
  }
};

export const insertMasterPartFileController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const file = req.file;
    const workbook = xlsx.readFile(file.path);
    const sheet_name_list = workbook.SheetNames;
    const xlData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );

    const insertedData = [];
    const bu_code = xlData[0].bu_code;
    const bu_name = xlData[0].bu_name;

    console.log(
      `Deleting old data for bu_code: ${bu_code}, bu_name: ${bu_name}`
    );
    await deleteOldData(bu_code, bu_name);

    for (const row of xlData) {
      try {
        const dataExists = await checkIfDataExists(row);
        if (!dataExists) {
          await insertMasterPartFileModels(row);
          insertedData.push(row); // Tambahkan data yang berhasil dimasukkan ke array
        } else {
          console.log("Data already exists:", row);
        }
      } catch (err) {
        console.error("Error inserting row:", err);
      }
    }

    // Simpan informasi file ke dalam tabel database
    const filename = req.file.filename;
    await createMasterPartFileModels({ bu_code, bu_name }, filename);

    // Hapus file setelah selesai
    // Hapus file setelah selesai
    console.log(`Deleting file: ${file.path}`);
    fs.unlinkSync(file.path);

    res.status(200).json({
      message: "File uploaded and data inserted successfully",
      data: insertedData, // Kirim data yang berhasil dimasukkan sebagai bagian dari respons
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send("Error uploading file");
  }
};

export const downloadFile = (req, res) => {
  const filePath = path.join(
    __dirname,
    "../../assets/public/images",
    "1739952832199_master part number ori.xlsx"
  );

  console.log(`Request to download file: ${filePath}`); // Log untuk debugging

  res.setHeader(
    "Content-Disposition",
    'attachment; filename="master part number oiginal.xlsx"'
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error downloading file");
    }
  });
};
