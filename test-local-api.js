const axios = require('axios');

async function testLocalAPI() {
  try {
    console.log('Testing local API endpoints...');
    
    const baseUrl = 'http://localhost:3000';
    
    // Test what's at the root URL
    console.log(`\n1. Testing root URL: ${baseUrl}`);
    try {
      const rootResponse = await axios.get(baseUrl);
      console.log('   Status:', rootResponse.status);
      console.log('   Response:', rootResponse.data);
    } catch (error) {
      console.log('   Error:', error.message);
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Response:', error.response.data);
      }
    }
    
    // Test the API v1 recipes endpoint
    console.log(`\n2. Testing API v1 recipes endpoint: ${baseUrl}/api/v1/recipes`);
    try {
      const recipesResponse = await axios.get(`${baseUrl}/api/v1/recipes`);
      console.log('   Status:', recipesResponse.status);
      console.log('   Response:', JSON.stringify(recipesResponse.data, null, 2));
    } catch (error) {
      console.log('   Error:', error.message);
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Response:', error.response.data);
      }
    }
    
  } catch (error) {
    console.error('Local API test failed:', error.message);
  }
}

testLocalAPI();