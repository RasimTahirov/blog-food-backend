import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/recipe.js";
import articleRoutes from "./routes/article.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Подключено"))
  .catch((err) => console.error("Ошибка", err));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({ storage });

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/post", blogRoutes);
app.use("/api/article", articleRoutes);

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/upload/${req.file.filename}`,
  });
});

app.use("/upload", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Сервер запущен. http://localhost:${PORT}`);
});
