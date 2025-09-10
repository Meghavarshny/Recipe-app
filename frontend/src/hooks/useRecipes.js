import { useState, useEffect } from 'react';
import { recipeService } from '../services/api';

// Custom hook for managing recipes
export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecipes: 0,
    hasNext: false,
    hasPrev: false,
  });

  // Fetch all recipes
  const fetchRecipes = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await recipeService.getAllRecipes(page, limit);
      setRecipes(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single recipe by ID
  const fetchRecipeById = async (id) => {
    // Don't set global loading state for single recipe fetch
    setError(null);
    try {
      const response = await recipeService.getRecipeById(id);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch recipe');
      return null;
    }
  };

  // Create a new recipe
  const createRecipe = async (recipeData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await recipeService.createRecipe(recipeData);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create recipe');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a recipe
  const updateRecipe = async (id, recipeData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await recipeService.updateRecipe(id, recipeData);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update recipe');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a recipe
  const deleteRecipe = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await recipeService.deleteRecipe(id);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete recipe');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    recipes,
    loading,
    error,
    pagination,
    fetchRecipes,
    fetchRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  };
};