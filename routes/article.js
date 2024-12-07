import express from "express";

import {
  createArticle,
  deleteArticle,
  getAllArticle,
  getOneArticle,
} from "../controller/ArticleController.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/create", checkAuth, createArticle);
router.get("/all", getAllArticle);
router.get("/:id", getOneArticle);
router.delete("/delete/:id", checkAuth, deleteArticle);

export default router;
