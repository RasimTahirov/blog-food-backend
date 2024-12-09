import express from "express";

import checkAuth from "../utils/checkAuth.js";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipe,
  getCategotyRecipe,
  getOneRecipe,
  getRecipeByCategory,
} from "../controller/RecipeController.js";

const router = express.Router();

router.get("/categories", getCategotyRecipe);
router.get("/categories/:category", getRecipeByCategory);
router.get("/all", getAllRecipe);
router.get("/:id", getOneRecipe);
router.post("/create", checkAuth, createRecipe);
router.delete("/delete/:id", checkAuth, deleteRecipe);



export default router;
