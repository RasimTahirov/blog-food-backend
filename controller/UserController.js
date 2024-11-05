import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const register = async (req, res) => {
  {
    try {
      const { name, email, password } = req.body;

      const extringUser = await User.findOne({ email });
      if (extringUser) {
        return res.status(400).json({
          message: "Пользователь с таким email уже существует",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      await user.save();

      res.status(201).json({
        message: "Пользователь зарегистрирован",
        token,
        userId: user._id,
      });
    } catch (error) {
      res.status(500).json({
        message: "Не удалось зарегистрироваться",
        error,
      });
    }
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось войти",
      error,
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: "Пользователь не найден",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Ошибка",
      error,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка",
      error,
    });
  }
};
