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

## Deployment to Render (Single Deployment)

This application uses a single deployment approach where the Express backend serves both the API and the React frontend:

### 1. Single Web Service Deployment
- Create a new Web Service in Render
- Connect it to your GitHub repository
- Set the following configuration:
  - Build Command: `npm install && cd frontend && npm install && npm run build && cd ..`
  - Start Command: `npm start`
  - Environment Variables:
    - `MONGO_URI`: Your MongoDB connection string
    - `PORT`: 3000 (or let Render auto-assign)

### How it Works
- The Express server handles API requests at `/api/v1/*` endpoints
- All other requests are served the React frontend application
- This allows both the frontend and backend to run from the same domain

### Important Notes
- Ensure your MongoDB Atlas cluster has the correct IP whitelisting for Render
- The frontend build output is served statically by the Express server

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