import React, { useState, useEffect, useRef } from 'react';
import './RecipeForm.css';

const RecipeForm = ({ recipe, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: [''],
    instructions: '',
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    servings: '',
    difficulty: 'Easy',
    cuisine: '',
    caloriesPerServing: '',
    tags: [''],
    userId: 'user123', // Default user ID
    image: '',
    rating: ''
  });

  const [errors, setErrors] = useState({});
  const isPopulated = useRef(false);

  // Populate form with existing recipe data when editing
  useEffect(() => {
    console.log('useEffect called with recipe:', recipe);
    if (recipe && recipe._id && !isPopulated.current) {
      console.log('Populating form with recipe data:', recipe);
      setFormData({
        name: recipe.name || '',
        ingredients: recipe.ingredients && recipe.ingredients.length > 0 ? [...recipe.ingredients] : [''],
        instructions: recipe.instructions || '',
        prepTimeMinutes: recipe.prepTimeMinutes !== undefined ? recipe.prepTimeMinutes.toString() : '',
        cookTimeMinutes: recipe.cookTimeMinutes !== undefined ? recipe.cookTimeMinutes.toString() : '',
        servings: recipe.servings !== undefined ? recipe.servings.toString() : '',
        difficulty: recipe.difficulty || 'Easy',
        cuisine: recipe.cuisine || '',
        caloriesPerServing: recipe.caloriesPerServing !== undefined ? recipe.caloriesPerServing.toString() : '',
        tags: recipe.tags && recipe.tags.length > 0 ? [...recipe.tags] : [''],
        userId: recipe.userId || 'user123',
        image: recipe.image || '',
        rating: recipe.rating !== undefined && recipe.rating > 0 ? recipe.rating.toString() : ''
      });
      isPopulated.current = true;
      console.log('Form data populated');
    }
  }, [recipe]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    console.log(`Field ${name} changed to:`, value);
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle array field changes (ingredients, tags)
  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  // Add a new item to an array field
  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  // Remove an item from an array field
  const removeArrayItem = (index, field) => {
    if (formData[field].length > 1) {
      const newArray = [...formData[field]];
      newArray.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        [field]: newArray
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Recipe name is required';
    }

    if (formData.ingredients.some(ingredient => !ingredient.trim())) {
      newErrors.ingredients = 'All ingredients must be filled';
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
    }

    if (!formData.prepTimeMinutes || formData.prepTimeMinutes < 1) {
      newErrors.prepTimeMinutes = 'Prep time must be at least 1 minute';
    }

    if (!formData.cookTimeMinutes || formData.cookTimeMinutes < 1) {
      newErrors.cookTimeMinutes = 'Cook time must be at least 1 minute';
    }

    if (!formData.servings || formData.servings <= 0) {
      newErrors.servings = 'Servings must be a positive number';
    }

    if (!formData.cuisine.trim()) {
      newErrors.cuisine = 'Cuisine is required';
    }

    if (!formData.caloriesPerServing || formData.caloriesPerServing <= 0) {
      newErrors.caloriesPerServing = 'Calories per serving must be a positive number';
    }

    // Validate rating if provided
    if (formData.rating && (formData.rating < 0 || formData.rating > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Build submit data with only the fields we want to send
      const submitData = {
        name: formData.name,
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        prepTimeMinutes: parseInt(formData.prepTimeMinutes),
        cookTimeMinutes: parseInt(formData.cookTimeMinutes),
        servings: parseInt(formData.servings),
        difficulty: formData.difficulty,
        cuisine: formData.cuisine,
        caloriesPerServing: parseInt(formData.caloriesPerServing),
        userId: formData.userId
      };
      
      // Only include tags if there are non-empty ones
      const nonEmptyTags = formData.tags.filter(tag => tag.trim() !== '');
      if (nonEmptyTags.length > 0) {
        submitData.tags = nonEmptyTags;
      }
      
      // Only include rating if it has a value
      if (formData.rating !== '' && formData.rating !== null) {
        submitData.rating = parseFloat(formData.rating);
      }
      
      // Only include image if it has a value
      if (formData.image !== '') {
        submitData.image = formData.image;
      }
      
      console.log('Submitting form data:', submitData);
      onSubmit(submitData);
    }
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Recipe Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="cuisine">Cuisine *</label>
        <input
          type="text"
          id="cuisine"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          className={errors.cuisine ? 'error' : ''}
        />
        {errors.cuisine && <span className="error-message">{errors.cuisine}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="prepTimeMinutes">Prep Time (minutes) *</label>
          <input
            type="number"
            id="prepTimeMinutes"
            name="prepTimeMinutes"
            value={formData.prepTimeMinutes}
            onChange={handleChange}
            className={errors.prepTimeMinutes ? 'error' : ''}
          />
          {errors.prepTimeMinutes && <span className="error-message">{errors.prepTimeMinutes}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cookTimeMinutes">Cook Time (minutes) *</label>
          <input
            type="number"
            id="cookTimeMinutes"
            name="cookTimeMinutes"
            value={formData.cookTimeMinutes}
            onChange={handleChange}
            className={errors.cookTimeMinutes ? 'error' : ''}
          />
          {errors.cookTimeMinutes && <span className="error-message">{errors.cookTimeMinutes}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="servings">Servings *</label>
          <input
            type="number"
            id="servings"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            className={errors.servings ? 'error' : ''}
          />
          {errors.servings && <span className="error-message">{errors.servings}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty *</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="caloriesPerServing">Calories per Serving *</label>
        <input
          type="number"
          id="caloriesPerServing"
          name="caloriesPerServing"
          value={formData.caloriesPerServing}
          onChange={handleChange}
          className={errors.caloriesPerServing ? 'error' : ''}
        />
        {errors.caloriesPerServing && <span className="error-message">{errors.caloriesPerServing}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="ingredients">Ingredients *</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="array-input-group">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
              className={errors.ingredients ? 'error' : ''}
            />
            {formData.ingredients.length > 1 && (
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeArrayItem(index, 'ingredients')}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn-add"
          onClick={() => addArrayItem('ingredients')}
        >
          Add Ingredient
        </button>
        {errors.ingredients && <span className="error-message">{errors.ingredients}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="instructions">Instructions *</label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          rows="6"
          className={errors.instructions ? 'error' : ''}
        ></textarea>
        {errors.instructions && <span className="error-message">{errors.instructions}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        {formData.tags.map((tag, index) => (
          <div key={index} className="array-input-group">
            <input
              type="text"
              value={tag}
              onChange={(e) => handleArrayChange(index, e.target.value, 'tags')}
            />
            {formData.tags.length > 1 && (
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeArrayItem(index, 'tags')}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn-add"
          onClick={() => addArrayItem('tags')}
        >
          Add Tag
        </button>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (0-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            className={errors.rating ? 'error' : ''}
          />
          {errors.rating && <span className="error-message">{errors.rating}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (recipe ? 'Update Recipe' : 'Create Recipe')}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;