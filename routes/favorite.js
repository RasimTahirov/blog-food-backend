import checkAuth from "../utils/checkAuth.js";
import express from "express";

import { addFavoriteRecipe, getFavoriteRecipes, removeFavoriteRecipe } from "../controller/FavoriteController.js";

const router = express.Router();

router.post("/favorites/add", checkAuth, addFavoriteRecipe);
router.post("/favorites/remove", checkAuth, removeFavoriteRecipe);
router.get("/favorites",checkAuth, getFavoriteRecipes);

export default router;
