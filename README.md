# Recipe App API

A complete CRUD (Create, Read, Update, Delete) application for managing recipes using Node.js, Express.js, and Mongoose.

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

## API Endpoints

- `POST /api/v1/recipes` - Create a new recipe
- `GET /api/v1/recipes` - Get all recipes (with pagination)
- `GET /api/v1/recipes/:id` - Get a specific recipe by ID
- `PUT /api/v1/recipes/:id` - Update a recipe by ID
- `DELETE /api/v1/recipes/:id` - Delete a recipe by ID

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd recipe-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Testing

Run the test scripts to verify the application:

```bash
# Test route definitions
npm run test-routes

# Test MongoDB connection (requires valid MONGO_URI in .env)
npm run test-db
```

## Deployment to Render

1. Create a new Web Service in Render
2. Connect it to your GitHub repository
3. Set the following configuration:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     - `MONGO_URI`: Your MongoDB connection string
     - `PORT`: 3000 (or let Render auto-assign)

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

## API Documentation

The API is fully documented in the included Postman collection file: `Recipe App API.postman_collection.json`

## License

ISC