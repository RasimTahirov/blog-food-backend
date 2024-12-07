import Recipe from "../models/Recipe.js";

export const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({
      message: "Не удалось создать рецепт",
      error,
    });
  }
};

export const getAllRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.find();

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось загрузить рецепты",
      error,
    });
  }
};

export const getCategotyRecipe = async (req, res) => {
  try {
    const categories = await Recipe.distinct("categories");

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось загрузить категории",
      error,
    });
  }
};

export const getRecipeByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const recipe = await Recipe.find({ categories: category });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось загрузить категории",
      error,
    });
  }
};

export const getOneRecipe = async (req, res) => {
  try {
    const recipeId = await Recipe.findById(req.params.id);
    if (!recipeId) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.status(200).json(recipeId);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось загрузить рецепт",
      error,
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipeId = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipeId) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.status(200).json({
      message: "Статья удалена",
    });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось удалить рецепт",
      error,
    });
  }
};
