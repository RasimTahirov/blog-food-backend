import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import AWS from "aws-sdk";

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

const s3 = new AWS.S3({
  endpoint: "https://s3.selectel.ru",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "gis-1",
  signatureVersion: "v4",
});

const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   destination: (_, __, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (_, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extension = file.originalname.split(".").pop();
//     cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
//   },
// });

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

app.post("/upload", upload.single("image"), (req, res) => {
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

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Ошибка при загрузке в S3:", err);
      return res.status(500).send("Ошибка при загрузке файла.");
    }

    res.json({
      url: data.Location,
    });
  });
});

app.use("/upload", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Сервер запущен. http://localhost:${PORT}`);
});
