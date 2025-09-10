import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import './App.css';
import './theme.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/new" element={<AddRecipe />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;