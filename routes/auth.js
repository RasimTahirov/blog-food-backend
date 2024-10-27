import express from "express";
import validationErrors from "../utils/validationErrors.js";

import {
  loginValidation,
  registerValidation,
} from "../validation/authValidation.js";
import {
  getAllUser,
  getOneUser,
  login,
  register,
} from "../controller/UserController.js";

const router = express.Router();

router.get("/user/:id", getOneUser);
router.get("/users", getAllUser);
router.post("/register", registerValidation, validationErrors, register);
router.post("/login", loginValidation, validationErrors, login);

export default router;
