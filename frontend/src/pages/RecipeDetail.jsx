import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchRecipeById, deleteRecipe } = useRecipes();
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await deleteRecipe(id);
        navigate('/recipes');
      } catch (err) {
        alert('Failed to delete recipe');
      }
    }
  };

  // Show loading only on initial load
  if (loadingRecipe && !recipe) {
    return (
      <div className="recipe-detail-page">
        <div className="loading">Loading recipe...</div>
      </div>
    );
  }

  if (recipeError || !recipe) {
    return (
      <div className="recipe-detail-page">
        <div className="error-message">
          {recipeError || 'Recipe not found'}
          <Link to="/recipes" className="btn btn-primary">Back to Recipes</Link>
        </div>
      </div>
    );
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="recipe-detail-page">
      <div className="recipe-header">
        <Link to="/recipes" className="btn btn-secondary">← Back to Recipes</Link>
        <div className="recipe-actions">
          <Link to={`/recipes/${id}/edit`} className="btn btn-primary">Edit Recipe</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete Recipe</button>
        </div>
      </div>

      <div className="recipe-content">
        {recipe.image && (
          <div className="recipe-image">
            <img src={recipe.image} alt={recipe.name} onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
        )}

        <div className="recipe-info">
          <h1 className="recipe-title">{recipe.name}</h1>
          
          <div className="recipe-meta">
            <span className="meta-item">
              <i className="icon">🌍</i> {recipe.cuisine}
            </span>
            <span className="meta-item">
              <i className="icon">🏆</i> {recipe.difficulty}
            </span>
            {recipe.rating > 0 && (
              <span className="meta-item">
                <i className="icon">⭐</i> {recipe.rating}
              </span>
            )}
          </div>

          <div className="recipe-stats">
            <div className="stat">
              <span className="stat-value">{totalTime}</span>
              <span className="stat-label">Minutes</span>
            </div>
            <div className="stat">
              <span className="stat-value">{recipe.servings}</span>
              <span className="stat-label">Servings</span>
            </div>
            <div className="stat">
              <span className="stat-value">{recipe.caloriesPerServing}</span>
              <span className="stat-label">Calories</span>
            </div>
          </div>

          {recipe.tags && recipe.tags.length > 0 && (
            <div className="recipe-tags">
              {recipe.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="recipe-details">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          <div className="instructions">
            {recipe.instructions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;