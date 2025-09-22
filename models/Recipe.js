const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  ingredients: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'A recipe must have at least one ingredient'
    }
  },
  instructions: {
    type: String,
    required: true
  },
  prepTimeMinutes: {
    type: Number,
    required: true,
    min: 1
  },
  cookTimeMinutes: {
    type: Number,
    required: true,
    min: 1
  },
  servings: {
    type: Number,
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  cuisine: {
    type: String,
    required: true,
    trim: true
  },
  caloriesPerServing: {
    type: Number,
    required: true,
    min: 1
  },
  tags: {
    type: [String],
    default: []
  },
  userId: {
    type: String,
    required: false
  },
  image: {
    type: String,
    default: null
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;