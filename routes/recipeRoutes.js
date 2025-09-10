const express = require('express');
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');

// Create a new recipe
router.post('/', createRecipe);

// Get all recipes
router.get('/', getAllRecipes);

// Get a single recipe by ID
router.get('/:id', getRecipeById);

// Update a recipe by ID
router.put('/:id', updateRecipe);

// Delete a recipe by ID
router.delete('/:id', deleteRecipe);

module.exports = router;