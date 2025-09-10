const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Use the MongoDB URI from environment variables or default to local instance
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/recipeapp';
    console.log(`Using MongoDB URI: ${mongoUri}`);
    
    // Add connection options for better reliability
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    
    // If using Atlas connection string, provide specific guidance
    if (process.env.MONGO_URI && process.env.MONGO_URI.includes('mongodb+srv')) {
      console.log('Troubleshooting MongoDB Atlas connection:');
      console.log('1. Check your internet connection');
      console.log('2. Verify your MongoDB Atlas credentials');
      console.log('3. Ensure your IP address is whitelisted in MongoDB Atlas');
      console.log('4. Check if the cluster is paused in MongoDB Atlas');
      console.log('5. Make sure your password does not contain special characters that need URL encoding');
    } else {
      console.log('Troubleshooting local MongoDB connection:');
      console.log('1. Ensure MongoDB is installed on your system');
      console.log('2. Start MongoDB service (mongod)');
      console.log('3. Check if MongoDB is running on port 27017');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;