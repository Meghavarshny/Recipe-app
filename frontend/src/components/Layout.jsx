import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  // Toggle theme and save preference
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">
            <Link to="/">Recipe Manager</Link>
          </h1>
          <nav className="app-nav">
            <ul>
              <li>
                <Link 
                  to="/" 
                  className={location.pathname === '/' ? 'active' : ''}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes" 
                  className={location.pathname === '/recipes' ? 'active' : ''}
                >
                  All Recipes
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/new" 
                  className={location.pathname === '/recipes/new' ? 'active' : ''}
                >
                  Add Recipe
                </Link>
              </li>
            </ul>
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
        </div>
      </header>
      
      <main className="app-main">
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025 Recipe Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;