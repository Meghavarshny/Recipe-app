import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Recipe Manager</h1>
        <p>Discover, create, and manage your favorite recipes in one place</p>
        <div className="hero-actions">
          <Link to="/recipes" className="btn btn-primary">View All Recipes</Link>
          <Link to="/recipes/new" className="btn btn-secondary">Add New Recipe</Link>
        </div>
      </div>

      <div className="features-section">
        <div className="feature">
          <div className="feature-icon">📝</div>
          <h3>Create Recipes</h3>
          <p>Easily add your favorite recipes with detailed ingredients and instructions</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">🔍</div>
          <h3>Search & Filter</h3>
          <p>Find recipes by cuisine, difficulty, or cooking time</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">⭐</div>
          <h3>Rate Recipes</h3>
          <p>Rate your recipes and keep track of your favorites</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Start Managing Your Recipes Today</h2>
        <p>Join thousands of home cooks who use Recipe Manager to organize their culinary creations</p>
        <Link to="/recipes/new" className="btn btn-primary">Get Started</Link>
      </div>
    </div>
  );
};

export default Home;