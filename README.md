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

## Prerequisites

- Node.js v14 or higher
- MongoDB (local or Atlas)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd recipe-app
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend && npm install && cd ..
   ```

4. Create a `.env` file in the root directory with the following content:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

5. Start both servers in development mode:
   ```bash
   npm run dev:full
   ```

## MongoDB Atlas Configuration

For MongoDB Atlas connections, you need to whitelist IP addresses:

1. Go to MongoDB Atlas Dashboard
2. Navigate to "Network Access" in the left sidebar
3. Click "Add IP Address"
4. For development, select "Allow access from anywhere" (0.0.0.0/0)
5. For production, add specific IP addresses for security

## Deployment to Render

This application is configured for deployment to Render using the `render.yaml` file:

1. Connect your GitHub repository to Render
2. Render will automatically detect and deploy both the backend API and frontend
3. Set the following environment variables in Render dashboard:
   - MONGO_URI: Your MongoDB connection string

## API Endpoints

- `POST /api/v1/recipes` - Create a new recipe
- `GET /api/v1/recipes` - Get all recipes (with pagination)
- `GET /api/v1/recipes/:id` - Get a specific recipe by ID
- `PUT /api/v1/recipes/:id` - Update a recipe by ID
- `DELETE /api/v1/recipes/:id` - Delete a recipe by ID

## Postman Documentation

The API is fully documented in the included Postman collection file: `Recipe App API.postman_collection.json`

To use the documentation:
1. Open Postman
2. Import the collection file
3. Set the `base_url` variable to your server URL (default: http://localhost:3000)

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

## Troubleshooting

### Common Issues and Solutions

1. **404 Errors on API Endpoints**:
   - Ensure the backend server is running
   - Check that the API routes are correctly configured
   - Verify CORS settings if accessing from a different origin

2. **MongoDB Connection Issues**:
   - Verify your MongoDB URI is correct
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Check that your MongoDB credentials are correct
   - Confirm the MongoDB cluster is not paused

3. **Data Not Persisting**:
   - Verify successful MongoDB connections in server logs
   - Check for validation errors in request payloads
   - Ensure proper error handling in controller functions

4. **Frontend Not Loading**:
   - Check the browser console for network errors
   - Verify the API base URL configuration
   - Ensure the backend server is accessible from the frontend