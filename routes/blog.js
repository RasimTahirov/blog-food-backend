import express from "express";

import Post from "../models/Post.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

// Создание статьи
router.post("/create", checkAuth, async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({
      message: "Не удалось создать статью",
      error,
    });
  }
});

// Получение всех статьей
router.get("/all", async (req, res) => {
  try {
    const post = await Post.find();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить статьи",
      error,
    });
  }
});

// Получение статьи по id
router.get("/:id", async (req, res) => {
  try {
    const postId = await Post.findById(req.params.id);
    if (!postId) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.status(200).json(postId);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить статью",
      error,
    });
  }
});

router.patch("/:id/update", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось изменить статью",
      error,
    });
  }
});

// Удаление статьи
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const postId = await Post.findByIdAndDelete(req.params.id);
    if (!postId) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.status(200).json({
      message: "Статья удалена",
    });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось удалить статью",
      error,
    });
  }
});

export default router;
