const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables from .env file directly to avoid system variable conflicts
const envPath = path.join(__dirname, '.env');
let MONGO_URI = '';
let PORT = 3000;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  lines.forEach(line => {
    if (line.startsWith('MONGO_URI=')) {
      MONGO_URI = line.substring('MONGO_URI='.length).trim();
      // Remove quotes if present
      if (MONGO_URI.startsWith('"') && MONGO_URI.endsWith('"')) {
        MONGO_URI = MONGO_URI.substring(1, MONGO_URI.length - 1);
      }
    } else if (line.startsWith('PORT=')) {
      PORT = line.substring('PORT='.length).trim();
    }
  });
}

// Set environment variables directly
process.env.MONGO_URI = MONGO_URI;
process.env.PORT = PORT;

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env file');
  console.error('Please check your .env file');
  process.exit(1);
}

console.log(`Using MongoDB URI: ${process.env.MONGO_URI.substring(0, 50)}...`);

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    
    if (process.env.MONGO_URI && process.env.MONGO_URI.includes('mongodb+srv')) {
      console.log('Troubleshooting MongoDB Atlas connection:');
      console.log('1. Check your internet connection');
      console.log('2. Verify your MongoDB Atlas credentials');
      console.log('3. Ensure your IP address is whitelisted in MongoDB Atlas');
      console.log('4. Check if the cluster is paused in MongoDB Atlas');
    } else {
      console.log('Troubleshooting local MongoDB connection:');
      console.log('1. Ensure MongoDB is installed on your system');
      console.log('2. Start MongoDB service (mongod)');
      console.log('3. Check if MongoDB is running on port 27017');
    }
    
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require('./routes');
app.use('/api/v1', routes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Recipe App API is running',
    version: '1.0.0'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

const SERVER_PORT = process.env.PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});

module.exports = app;