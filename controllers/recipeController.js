const Recipe = require('../models/Recipe');
const recipeValidationSchema = require('./validation');

// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = recipeValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details[0].message
      });
    }

    const recipe = new Recipe(value);
    const savedRecipe = await recipe.save();
    
    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: savedRecipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating recipe',
      error: error.message
    });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const recipes = await Recipe.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalRecipes = await Recipe.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Recipes retrieved successfully',
      data: recipes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRecipes / limit),
        totalRecipes,
        hasNext: page < Math.ceil(totalRecipes / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving recipes',
      error: error.message
    });
  }
};

// Get a single recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if id is valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID format'
      });
    }

    const recipe = await Recipe.findById(id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Recipe retrieved successfully',
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving recipe',
      error: error.message
    });
  }
};

// Update a recipe by ID
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if id is valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID format'
      });
    }

    // Validate request body
    const { error, value } = recipeValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details[0].message
      });
    }

    const recipe = await Recipe.findByIdAndUpdate(id, value, {
      new: true,
      runValidators: true
    });
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating recipe',
      error: error.message
    });
  }
};

// Delete a recipe by ID
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if id is valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID format'
      });
    }

    const recipe = await Recipe.findByIdAndDelete(id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting recipe',
      error: error.message
    });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};