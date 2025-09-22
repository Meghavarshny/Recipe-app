import axios from 'axios';

// Create an axios instance with default configuration
// Use environment variable for API base URL, with fallback to relative path for proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Recipe API methods
export const recipeService = {
  // Get all recipes
  getAllRecipes: (page = 1, limit = 10) => {
    return api.get(`/recipes?page=${page}&limit=${limit}`);
  },

  // Get recipe by ID
  getRecipeById: (id) => {
    return api.get(`/recipes/${id}`);
  },

  // Create a new recipe
  createRecipe: (recipeData) => {
    return api.post('/recipes', recipeData);
  },

  // Update a recipe
  updateRecipe: (id, recipeData) => {
    return api.put(`/recipes/${id}`, recipeData);
  },

  // Delete a recipe
  deleteRecipe: (id) => {
    return api.delete(`/recipes/${id}`);
  },
};

export default api;