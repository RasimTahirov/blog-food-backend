import express from "express";
import bctypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import {
  loginValidation,
  registerValidation,
} from "../validation/authValidation.js";
import validationErrors from "../utils/validationErrors.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validationErrors,
  async (req, res) => {
    try {
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
    } catch (error) {
      res.status(500).json({
        message: "Не удалось зарегистрироваться",
      });
    }
  }
);

router.post("/login", loginValidation, validationErrors, async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      message: "Не удалось войти",
    });
  }
});

export default router;
