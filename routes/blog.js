import express from "express";

import checkAuth from "../utils/checkAuth.js";
import {
  createPost,
  deletePost,
  getAllPost,
  getCategotyPost,
  getOnePost,
  getPostsByCategory,
  updatePost,
} from "../controller/PostController.js";

const router = express.Router();

router.get("/categories", getCategotyPost);
router.get("/categories/:category", getPostsByCategory);
router.get("/all", getAllPost);
router.get("/:id", getOnePost);
router.post("/create", checkAuth, createPost);
router.patch("/:id/update", checkAuth, updatePost);
router.delete("/:id", checkAuth, deletePost);

export default router;
