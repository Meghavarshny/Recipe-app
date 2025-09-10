const Joi = require('joi');

const recipeValidationSchema = Joi.object({
  name: Joi.string().trim().max(100).required(),
  ingredients: Joi.array().items(Joi.string()).min(1).required(),
  instructions: Joi.string().required(),
  prepTimeMinutes: Joi.number().min(1).required(),
  cookTimeMinutes: Joi.number().min(1).required(),
  servings: Joi.number().min(1).required(),
  difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
  cuisine: Joi.string().trim().required(),
  caloriesPerServing: Joi.number().min(1).required(),
  tags: Joi.array().items(Joi.string()).default([]),
  userId: Joi.string().optional(),  // Make userId optional
  image: Joi.string().uri().allow(null).default(null),
  rating: Joi.number().min(0).max(5).default(0)
});

module.exports = recipeValidationSchema;