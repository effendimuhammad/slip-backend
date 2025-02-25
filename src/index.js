import express from "express";
import userRoutes from "./routes/userRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import masterPartRoutes from "./routes/masterPartRoutes.js";
import transactionPartRoutes from "./routes/transactionPartRoutes.js";
import slipRoutes from "./routes/slipRoutes.js";
import slipListRoutes from "./routes/slipListRoutes.js";
import detailRoutes from "./routes/slipDetailRoutes.js";
import buCardRoutes from "./routes/slipBuPartRoutes.js";
import summaryRoutes from "./routes/slipSummaryRoutes.js";
import cors from "cors";
import path from "path"; // Add this line
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import upload from "./middleware/multer.js";
import masterPartImageRoutes from "./routes/masterPartImageRoutes.js";

// Middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/static", express.static(path.join(__dirname, "../assets/public")));
app.use(express.static(path.join(__dirname, "../public")));

//userRoutes
app.use("/", userRoutes);
app.use("/users", userRoutes);
app.use("/create", userRoutes);
app.use("/update", userRoutes);
app.use("/register", userRoutes);
app.use("/delete", userRoutes);

//loginRoutes
app.use("/auth", loginRoutes);
app.use("/nav", loginRoutes);
//tokenRoutes
app.use("/token", tokenRoutes);

//partName
app.use("/api/partnumber", masterPartRoutes);
app.use("/api/master", upload.single("file"), masterPartRoutes);

//summary
app.use("/api/summary", summaryRoutes);

//transaction
app.use("/api/trans", transactionPartRoutes);

//slip
app.use("/api/slip", slipRoutes);
app.use("/api/slip", detailRoutes);
app.use("/api/slip", slipListRoutes);

//buCard
app.use("/api/buCard", buCardRoutes);

//upload
app.use("/upload", upload.single("file"), masterPartImageRoutes);
app.use("/file", masterPartImageRoutes);

const PORT = 4100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
