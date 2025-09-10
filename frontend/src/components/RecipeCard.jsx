import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onDelete }) => {
  const {
    _id,
    name,
    cuisine,
    difficulty,
    prepTimeMinutes,
    cookTimeMinutes,
    servings,
    rating,
    image
  } = recipe;

  const totalTime = prepTimeMinutes + cookTimeMinutes;

  return (
    <div className="recipe-card">
      {image && (
        <div className="recipe-image">
          <img src={image} alt={name} onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
      )}
      
      <div className="recipe-content">
        <h3 className="recipe-title">{name}</h3>
        
        <div className="recipe-meta">
          <span className="recipe-cuisine">{cuisine}</span>
          <span className="recipe-difficulty">{difficulty}</span>
        </div>
        
        <div className="recipe-details">
          <div className="recipe-info">
            <span className="info-item">
              <i className="icon">⏱️</i> {totalTime} min
            </span>
            <span className="info-item">
              <i className="icon">👥</i> {servings} servings
            </span>
            {rating > 0 && (
              <span className="info-item">
                <i className="icon">⭐</i> {rating}
              </span>
            )}
          </div>
        </div>
        
        <div className="recipe-actions">
          <Link to={`/recipes/${_id}`} className="btn btn-secondary">
            View Details
          </Link>
          <Link to={`/recipes/${_id}/edit`} className="btn btn-primary">
            Edit
          </Link>
          <button 
            onClick={() => onDelete(_id)} 
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;