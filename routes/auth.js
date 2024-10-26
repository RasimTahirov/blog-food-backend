import express from "express";
import bctypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const extringUser = await User.findOne({ email });
  if (extringUser) {
    return res.status(400).json({
      message: "Пользователь с таким email уже существует",
    });
  }

  const hashedPassword = await bctypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.status(201).json({
    message: "Пользователь зарегистрирован",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Неверный логин или пароль",
    });
  }

  const isPasswordValid = await bctypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Неверный логин или пароль",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

export default router;
