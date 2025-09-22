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
    
    // Add database name to the URI if not present
    let mongoUri = process.env.MONGO_URI;
    if (mongoUri && !mongoUri.includes('.mongodb.net/')) {
      mongoUri = mongoUri.replace('.mongodb.net/', '.mongodb.net/recipeapp?');
    }
    
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
      console.log('5. Try using 0.0.0.0/0 in Network Access to allow all IPs (for development only)');
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

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
const routes = require('./routes');
app.use('/api/v1', routes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// Error handling middleware
app.use(errorHandler);

const SERVER_PORT = process.env.PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});

module.exports = app;