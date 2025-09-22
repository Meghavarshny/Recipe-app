const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing deployed API endpoints...');
    
    // Test base URL
    const baseUrl = 'https://recipe-app-f5hx.onrender.com';
    console.log(`Testing base URL: ${baseUrl}`);
    
    try {
      const baseResponse = await axios.get(`${baseUrl}/`);
      console.log('✓ Base URL accessible:', baseResponse.data);
    } catch (error) {
      console.log('✗ Base URL not accessible:', error.message);
    }
    
    // Test API v1 endpoint
    try {
      const apiResponse = await axios.get(`${baseUrl}/api/v1`);
      console.log('✓ API v1 endpoint accessible:', apiResponse.data);
    } catch (error) {
      console.log('✗ API v1 endpoint not accessible:', error.message);
    }
    
    // Test recipes endpoint
    try {
      const recipesResponse = await axios.get(`${baseUrl}/api/v1/recipes`);
      console.log('✓ Recipes endpoint accessible:', recipesResponse.data);
    } catch (error) {
      console.log('✗ Recipes endpoint not accessible:', error.message);
      if (error.response) {
        console.log('  Status:', error.response.status);
        console.log('  Data:', error.response.data);
      }
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAPI();