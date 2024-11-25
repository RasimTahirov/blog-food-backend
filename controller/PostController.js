import Post from "../models/Post.js";

export const createPost = async (req, res) => {
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
};

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить статьи",
      error,
    });
  }
};

export const getCategotyPost = async (req, res) => {
  try {
    const categories = await Post.distinct("categories");

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить категории",
      error,
    });
  }
};

export const getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await Post.find({ categories: category });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить посты по категории",
      error,
    });
  }
};

export const getOnePost = async (req, res) => {
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
};

export const updatePost = async (req, res) => {
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
};

export const deletePost = async (req, res) => {
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
};
