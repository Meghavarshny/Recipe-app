import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import RecipeForm from '../components/RecipeForm';
import './AddRecipe.css';

const AddRecipe = () => {
  const navigate = useNavigate();
  const { createRecipe, loading, error } = useRecipes();

  const handleSubmit = async (recipeData) => {
    try {
      const newRecipe = await createRecipe(recipeData);
      if (newRecipe) {
        alert('Recipe created successfully!');
        navigate(`/recipes/${newRecipe._id}`);
      }
    } catch (err) {
      // Error is handled in the hook
    }
  };

  const handleCancel = () => {
    navigate('/recipes');
  };

  return (
    <div className="add-recipe-page">
      <div className="page-header">
        <h1>Add New Recipe</h1>
        <p>Create a new delicious recipe to share with others</p>
      </div>
      
      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}
      
      <RecipeForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};

export default AddRecipe;