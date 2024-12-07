import Article from "../models/Article.js";

export const createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({
      message: "Не удалось создать статью",
      error,
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const articleId = await Article.findByIdAndDelete(req.params.id);
    if (!articleId) {
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

export const getAllArticle = async (req, res) => {
  try {
    const article = await Article.find();

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось загрузить статьи",
      error,
    });
  }
};

export const getOneArticle = async (req, res) => {
  try {
    const articleId = await Article.findById(req.params.id);
    if (!articleId) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.status(200).json(articleId);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось загрузить статью",
      error,
    });
  }
};
