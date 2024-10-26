import { body } from "express-validator";

export const registerValidation = [
  body("name").notEmpty().withMessage("Имя обязательное"),
  body("email").isEmail().withMessage("Некорректный email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен содержать минимум 6 символов"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Некорректный email"),
  body("password").notEmpty().withMessage("Пароль обязателен"),
];
