# Recipe Manager Frontend

A modern React frontend for the Recipe Manager application built with Vite.

## Features

- Create, read, update, and delete recipes
- Responsive design that works on desktop and mobile
- Form validation for recipe data
- Pagination for recipe listings
- Detailed recipe view with ingredients and instructions

## Tech Stack

- React 18
- Vite
- React Router v6
- Axios for API calls
- CSS Modules for styling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- The Recipe Manager backend must be running on port 3000

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to http://localhost:3001

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/               # Page components
├── services/            # API service layer
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── App.jsx             # Main App component
└── main.jsx            # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Integration

The frontend communicates with the backend API running on port 3000 through a proxy configured in `vite.config.js`.