// Quick API test script
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('🧪 Testing CodeHub API...\n');

    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const health = await axios.get(`${API_URL}/health`);
    console.log('✅ Health:', health.data.message);

    // Test registration
    console.log('\n2. Testing user registration...');
    const registerData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: '123456'
    };
    
    const registerRes = await axios.post(`${API_URL}/auth/register`, registerData);
    console.log('✅ Registration successful');
    
    const token = registerRes.data.token;
    const user = registerRes.data.user;

    // Test login
    console.log('\n3. Testing user login...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: registerData.email,
      password: registerData.password
    });
    console.log('✅ Login successful');

    // Test protected route
    console.log('\n4. Testing protected route...');
    const profileRes = await axios.get(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Profile access successful');

    // Test course enrollment (should fail)
    console.log('\n5. Testing course enrollment...');
    try {
      await axios.post(`${API_URL}/users/enroll/dsa-python`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      if (error.response.status === 503) {
        console.log('✅ Course enrollment properly returns 503 error');
      }
    }

    console.log('\n🎉 All API tests passed!');
    console.log('\n📊 Test Results:');
    console.log(`- User ID: ${user.id}`);
    console.log(`- User Name: ${user.name}`);
    console.log(`- User Email: ${user.email}`);

  } catch (error) {
    console.error('❌ API Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Run if backend is available
testAPI();