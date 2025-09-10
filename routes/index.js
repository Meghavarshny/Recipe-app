const express = require('express');
const router = express.Router();

// Import route modules
const recipeRoutes = require('./recipeRoutes');

// Use route modules
router.use('/recipes', recipeRoutes);

module.exports = router;