# Recipe App

A CRUD application for managing recipes built with Node.js, Express, and MongoDB.

## Features

- Create, read, update, and delete recipes
- MongoDB integration using Mongoose
- Data validation using Joi
- Error handling middleware
- Pagination for listing recipes
- RESTful API design
- Modern React frontend with Vite

## Prerequisites

- Node.js v14 or higher
- MongoDB (local or Atlas)
- npm or yarn

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

3. Create a `.env` file in the root directory with the following content:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```
   
   For MongoDB Atlas, your connection string will look like:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster-url/recipeapp?retryWrites=true&w=majority
   ```

4. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

## Running the Application

### Development Mode

To run both frontend and backend in development mode, you have several options:

#### Option 1: Using the startup scripts (Recommended)
- **Windows Command Prompt**: Double-click `start.bat` or run:
  ```cmd
  start.bat
  ```

- **Windows PowerShell**: Run:
  ```powershell
  .\start-dev.ps1
  ```

- **Cross-platform**: Run:
  ```bash
  npm run dev:full
  ```

All these options will start:
- Backend server on http://localhost:3000
- Frontend development server on http://localhost:3001

#### Option 2: Manual start
- Start backend server:
  ```bash
  npm run dev
  ```

- In a separate terminal, start frontend server:
  ```bash
  npm run frontend
  ```

### Running Backend Only
```bash
npm run dev
```

### Running Frontend Only
```bash
npm run frontend
```

## Environment Variable Issues on Windows

If you're experiencing connection issues on Windows, there might be a system environment variable overriding your `.env` file settings:

1. Check if MONGO_URI is set at system level:
   ```cmd
   echo %MONGO_URI%
   ```

2. If it shows a value different from your `.env` file, remove it:
   - Open System Properties (Win + R, type "sysdm.cpl")
   - Go to "Advanced" tab → "Environment Variables"
   - Look for "MONGO_URI" in User or System variables
   - Delete the variable
   - Alternatively, use this command in elevated Command Prompt:
     ```cmd
     setx MONGO_URI ""
     ```

## Testing the API

You can test the API endpoints using the provided test script:
```bash
npm run test-api
```

Or use the Postman collection included in the repository.

## API Endpoints

- `GET /api/v1/recipes` - Get all recipes (with pagination)
- `GET /api/v1/recipes/:id` - Get a specific recipe
- `POST /api/v1/recipes` - Create a new recipe
- `PUT /api/v1/recipes/:id` - Update a recipe
- `DELETE /api/v1/recipes/:id` - Delete a recipe

## Frontend Features

The React frontend includes:
- Home page with introduction
- Recipe listing with pagination
- Recipe detail view
- Create new recipe form
- Edit existing recipe form
- Delete recipe functionality
- Responsive design for all devices

## Project Structure

```
.
├── config
│   └── db.js              # MongoDB connection setup
├── controllers
│   ├── recipeController.js # Recipe business logic
│   └── validation.js       # Joi validation schemas
├── frontend                 # React frontend application
│   ├── src
│       │   ├── components  # Reusable UI components
│       │   ├── pages       # Page components
│       │   ├── services    # API service layer
│       │   ├── hooks       # Custom React hooks
│       │   └── utils       # Utility functions
├── middleware
│   └── errorHandler.js     # Error handling middleware
├── models
│   └── Recipe.js           # Mongoose recipe model
├── routes
│   ├── index.js            # Route registration
│   └── recipeRoutes.js     # Recipe routes
├── .env                    # Environment variables
├── server.js               # Express server setup
├── start.bat               # Windows batch script to start both servers
├── start-dev.ps1           # PowerShell script to start both servers
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Troubleshooting

### MongoDB Connection Issues

1. **Authentication failed**:
   - Check your MongoDB Atlas username and password
   - Ensure your password doesn't contain special characters that need URL encoding
   - Verify your user has proper permissions

2. **IP not whitelisted**:
   - Add your current IP address to the MongoDB Atlas IP whitelist
   - For development, you can temporarily allow access from anywhere (0.0.0.0/0)
   - Remember to remove it after testing for security reasons

3. **Network issues**:
   - Check your internet connection
   - Verify the MongoDB Atlas cluster URL is correct
   - Ensure your cluster is not paused

### Testing Connection

You can test your MongoDB connection directly with:
```bash
npm run test-db
```

## License

ISC