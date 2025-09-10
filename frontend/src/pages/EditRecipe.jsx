import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import RecipeForm from '../components/RecipeForm';
import './EditRecipe.css';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchRecipeById, updateRecipe, loading, error } = useRecipes();
  const [recipe, setRecipe] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [recipeError, setRecipeError] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const loadRecipe = async () => {
      // Only show loading indicator on initial load
      if (!recipe) {
        setLoadingRecipe(true);
      }
      setRecipeError(null);
      try {
        const data = await fetchRecipeById(id);
        if (isMounted.current) {
          if (data) {
            setRecipe(data);
          } else {
            setRecipeError('Recipe not found');
          }
        }
      } catch (err) {
        if (isMounted.current) {
          setRecipeError('Failed to load recipe');
        }
      } finally {
        if (isMounted.current) {
          setLoadingRecipe(false);
        }
      }
    };

    loadRecipe();
    
    // Only depend on id
  }, [id, fetchRecipeById]);

  const handleSubmit = async (recipeData) => {
    try {
      const updatedRecipe = await updateRecipe(id, recipeData);
      if (updatedRecipe) {
        alert('Recipe updated successfully!');
        navigate(`/recipes/${id}`);
      }
    } catch (err) {
      // Error is handled in the hook
    }
  };

  const handleCancel = () => {
    navigate(`/recipes/${id}`);
  };

  // Show loading only on initial load
  if (loadingRecipe && !recipe) {
    return (
      <div className="edit-recipe-page">
        <div className="loading">Loading recipe...</div>
      </div>
    );
  }

  if (recipeError || !recipe) {
    return (
      <div className="edit-recipe-page">
        <div className="error-message">
          {recipeError || 'Recipe not found'}
          <button onClick={() => navigate('/recipes')} className="btn btn-primary">
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-recipe-page">
      <div className="page-header">
        <h1>Edit Recipe</h1>
        <p>Update your recipe details</p>
      </div>
      
      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}
      
      <RecipeForm 
        recipe={recipe}
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};

export default EditRecipe;