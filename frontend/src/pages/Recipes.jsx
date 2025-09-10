import React, { useEffect, useState } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';
import './Recipes.css';

const Recipes = () => {
  const { recipes, loading, error, pagination, fetchRecipes, deleteRecipe } = useRecipes();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRecipes(currentPage, 10);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      await deleteRecipe(id);
      // Refresh the recipes list after deletion
      fetchRecipes(currentPage, 10);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading && recipes.length === 0) {
    return (
      <div className="recipes-page">
        <div className="page-header">
          <h1>All Recipes</h1>
        </div>
        <div className="loading">Loading recipes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recipes-page">
        <div className="page-header">
          <h1>All Recipes</h1>
        </div>
        <div className="error-message">
          Error: {error}
          <button onClick={() => fetchRecipes(currentPage, 10)} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipes-page">
      <div className="page-header">
        <h1>All Recipes</h1>
        <p>{pagination.totalRecipes} recipes found</p>
      </div>

      {recipes.length === 0 ? (
        <div className="no-recipes">
          <p>No recipes found. Create your first recipe!</p>
        </div>
      ) : (
        <>
          <div className="recipes-grid">
            {recipes.map(recipe => (
              <RecipeCard 
                key={recipe._id} 
                recipe={recipe} 
                onDelete={handleDelete} 
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrev}
                className="btn btn-secondary"
              >
                Previous
              </button>
              
              <span className="page-info">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNext}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Recipes;