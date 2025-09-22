const axios = require('axios');

async function debugDeployment() {
  try {
    console.log('Debugging deployed application...');
    
    const baseUrl = 'https://recipe-app-f5hx.onrender.com';
    
    // Test what's at the root URL
    console.log(`\n1. Testing root URL: ${baseUrl}`);
    try {
      const rootResponse = await axios.get(baseUrl);
      console.log('   Status:', rootResponse.status);
      console.log('   Content-Type:', rootResponse.headers['content-type']);
      console.log('   Response preview:', rootResponse.data.substring(0, 200) + '...');
    } catch (error) {
      console.log('   Error:', error.message);
      if (error.response) {
        console.log('   Status:', error.response.status);
      }
    }
    
    // Test the recipes endpoint
    console.log(`\n2. Testing recipes endpoint: ${baseUrl}/recipes`);
    try {
      const recipesResponse = await axios.get(`${baseUrl}/recipes`);
      console.log('   Status:', recipesResponse.status);
      console.log('   Content-Type:', recipesResponse.headers['content-type']);
      console.log('   Response preview:', recipesResponse.data.toString().substring(0, 200) + '...');
    } catch (error) {
      console.log('   Error:', error.message);
      if (error.response) {
        console.log('   Status:', error.response.status);
        if (error.response.data) {
          console.log('   Response preview:', error.response.data.toString().substring(0, 200) + '...');
        }
      }
    }
    
    // Test with page parameters
    console.log(`\n3. Testing recipes with pagination: ${baseUrl}/recipes?page=1&limit=10`);
    try {
      const paginatedResponse = await axios.get(`${baseUrl}/recipes?page=1&limit=10`);
      console.log('   Status:', paginatedResponse.status);
      console.log('   Content-Type:', paginatedResponse.headers['content-type']);
      console.log('   Response preview:', paginatedResponse.data.toString().substring(0, 200) + '...');
    } catch (error) {
      console.log('   Error:', error.message);
      if (error.response) {
        console.log('   Status:', error.response.status);
        if (error.response.data) {
          console.log('   Response preview:', error.response.data.toString().substring(0, 200) + '...');
        }
      }
    }
    
  } catch (error) {
    console.error('Debug failed:', error.message);
  }
}

debugDeployment();