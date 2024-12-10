import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/recipe.js";
import articleRoutes from "./routes/article.js";
import favoriteRoutes from "./routes/favorite.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Подключено"))
  .catch((err) => console.error("Ошибка", err));

const s3Client = new S3Client({
  endpoint: "https://s3.selectel.ru",
  region: "gis-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
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
app.use("/api/favorite", favoriteRoutes);

app.post("/upload", upload.single("image"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const fileUrl = `https://s3.selectel.ru/${process.env.AWS_BUCKET_NAME}/${params.Key}`;

    res.json({ url: fileUrl });
  } catch (err) {
    console.error("Ошибка при загрузке в S3:", err);
    res.status(500).send("Ошибка при загрузке файла.");
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен. http://localhost:${PORT}`);
});
