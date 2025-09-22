# Recipe App API

A complete CRUD (Create, Read, Update, Delete) application for managing recipes using Node.js, Express.js, and Mongoose. The application follows the MVC pattern and includes comprehensive API documentation using Postman.

## Features

- Create, read, update, and delete recipes
- MongoDB integration using Mongoose
- Data validation using Joi
- Error handling middleware
- Pagination for listing recipes
- RESTful API design

## Tech Stack

- Node.js
- Express.js
- Mongoose (MongoDB)
- Joi (Validation)
- Postman (API Documentation)

## API Endpoints

- `POST /api/v1/recipes` - Create a new recipe
- `GET /api/v1/recipes` - Get all recipes (with pagination)
- `GET /api/v1/recipes/:id` - Get a specific recipe by ID
- `PUT /api/v1/recipes/:id` - Update a recipe by ID
- `DELETE /api/v1/recipes/:id` - Delete a recipe by ID

## Deployment to Render

This application consists of two parts that need to be deployed separately:

### 1. Backend API Service
- Create a new Web Service in Render
- Connect it to your GitHub repository
- Set the following configuration:
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Environment Variables:
    - `MONGO_URI`: Your MongoDB connection string
    - `PORT`: 3000 (or let Render auto-assign)

### 2. Frontend Static Site
- Create a new Static Site in Render
- Connect it to your GitHub repository
- Set the following configuration:
  - Build Command: `npm install && cd frontend && npm install && npm run build`
  - Publish Directory: `frontend/dist`
  - Environment Variables:
    - `VITE_API_BASE_URL`: The URL of your deployed backend API

### Important Notes
- The frontend and backend must be deployed as separate services
- Make sure to set the `VITE_API_BASE_URL` environment variable in the frontend to point to your backend API URL
- Ensure your MongoDB Atlas cluster has the correct IP whitelisting for Render

## Postman Documentation

The API is fully documented in the included Postman collection file: `Recipe App API.postman_collection.json`

## Project Structure

```
.
├── config
│   └── db.js              # MongoDB connection setup
├── controllers
│   ├── recipeController.js # Recipe business logic
│   └── validation.js       # Joi validation schemas
├── middleware
│   └── errorHandler.js     # Error handling middleware
├── models
│   └── Recipe.js           # Mongoose recipe model
├── routes
│   ├── index.js            # Route registration
│   └── recipeRoutes.js     # Recipe routes
├── .env                    # Environment variables
├── server.js               # Express server setup
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## MVC Pattern

This application follows the Model-View-Controller (MVC) pattern:

- **Models**: Define the data structure and interact with the database (`models/Recipe.js`)
- **Views**: The API responses act as views in this backend-only application
- **Controllers**: Handle the business logic and HTTP requests (`controllers/recipeController.js`)

## Validation

All recipe data is validated using Joi schemas before being processed or saved to the database.

## Error Handling

The application includes comprehensive error handling for:
- Invalid recipe IDs
- Missing or invalid data
- Database connection issues
- Validation errors
- Resource not found errors

## License

ISC