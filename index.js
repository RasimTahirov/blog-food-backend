import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import blogRoutes from './routes/blog.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Подключено"))
  .catch((err) => console.error("Ошибка", err));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/post", blogRoutes)

app.listen(PORT, () => {
  console.log(`Сервер запущен. http://localhost:${PORT}`);
});
