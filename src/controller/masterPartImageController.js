import {
  createPartImageModels,
  getPartImageModels,
} from "../models/masterPartImageModels.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPartImageController = async (req, res) => {
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

    const data = await createPartImageModels(req.body, filename); // Simpan hasilnya dalam variabel data
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

// Fungsi untuk mendapatkan daftar file
// Fungsi untuk mendapatkan daftar file
export const getFilesController = async (req, res) => {
  const directoryPath = path.join(__dirname, "../../assets/public/images");

  try {
    const dbData = await getPartImageModels();

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).send({
          message: "Gagal mendapatkan daftar file.",
          error: err.message,
        });
      }

      const fileList = files
        .map((file, index) => {
          const dbEntry = dbData.find((entry) => entry.file.includes(file));
          return dbEntry &&
            dbEntry.bu_code !== "Unknown" &&
            dbEntry.bu_name !== "Unknown"
            ? {
                id: index + 1,
                bu_code: dbEntry.bu_code,
                bu_name: dbEntry.bu_name,
                file: `http://localhost:4100/static/images/${file}`,
              }
            : null;
        })
        .filter((item) => item !== null);

      res.send(fileList);
    });
  } catch (err) {
    res.status(500).send({
      message: "Gagal mendapatkan data dari database.",
      error: err.message,
    });
  }
};
