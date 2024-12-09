import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

export const getFavoriteRecipes = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("favorites");

    res.json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка получения избранных рецептов" });
  }
};

export const addFavoriteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Рецепт не найден" });
    }

    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }

    const updatedUser = await User.findById(userId).populate("favorites");
    res.status(200).json({
      message: "Рецепт добавлен в избранное",
      favorites: updatedUser.favorites,
    });
  } catch (error) {
    console.error("Ошибка добавления в избранное:", error);
    res.status(500).json({ message: "Ошибка добавления в избранное", error });
  }
};

export const removeFavoriteRecipe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    user.favorites = user.favorites.filter((id) => id.toString() !== recipeId);
    await user.save();

    res
      .status(200)
      .json({
        message: "Рецепт удален из избранного",
        favorites: user.favorites,
      });
  } catch (error) {
    res.status(500).json({ message: "Ошибка удаления из избранного", error });
  }
};
