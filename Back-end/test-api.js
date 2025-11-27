const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:5000';
const ENDPOINTS = [
  '/health',
  '/api/docs',
  '/api/courses',
  '/api/mentors',
  '/api/internships'
];

// Test function
function testEndpoint(endpoint) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, BASE_URL);
    
    const req = http.request(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            endpoint,
            status: res.statusCode,
            success: res.statusCode >= 200 && res.statusCode < 300,
            data: jsonData
          });
        } catch (error) {
          resolve({
            endpoint,
            status: res.statusCode,
            success: res.statusCode >= 200 && res.statusCode < 300,
            data: data
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject({
        endpoint,
        error: error.message
      });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject({
        endpoint,
        error: 'Request timeout'
      });
    });
    
    req.end();
  });
}

// Run tests
async function runTests() {
  console.log('🧪 Testing API Endpoints...\n');
  
  for (const endpoint of ENDPOINTS) {
    try {
      const result = await testEndpoint(endpoint);
      
      if (result.success) {
        console.log(`✅ ${endpoint} - Status: ${result.status}`);
        if (result.data && result.data.message) {
          console.log(`   Message: ${result.data.message}`);
        }
      } else {
        console.log(`⚠️  ${endpoint} - Status: ${result.status}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint} - Error: ${error.error}`);
    }
    
    console.log('');
  }
  
  console.log('🎯 API Testing Complete!');
}

// Test authentication endpoints
async function testAuth() {
  console.log('🔐 Testing Authentication Endpoints...\n');
  
  const testUser = {
    email: 'akashjoel08@gmail.com',
    password: 'akashgoki05',
    displayName: 'Akash Joel'
  };
  
  // Test registration
  try {
    const registerData = JSON.stringify(testUser);
    const registerReq = http.request(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(registerData)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log(`✅ Registration - Status: ${res.statusCode}`);
          if (result.success) {
            console.log('   User registered successfully');
          } else {
            console.log(`   Error: ${result.message}`);
          }
        } catch (error) {
          console.log(`⚠️  Registration - Status: ${res.statusCode}`);
        }
      });
    });
    
    registerReq.on('error', (error) => {
      console.log(`❌ Registration - Error: ${error.message}`);
    });
    
    registerReq.write(registerData);
    registerReq.end();
    
  } catch (error) {
    console.log(`❌ Registration - Error: ${error.message}`);
  }
}

// Run all tests
async function main() {
  await runTests();
  await testAuth();
}

// Check if server is running first
testEndpoint('/health').then(() => {
  console.log('🚀 Server is running! Starting tests...\n');
  main();
}).catch((error) => {
  console.log('❌ Server is not running. Please start the server first:');
  console.log('   npm run dev');
  console.log('   or');
  console.log('   node server.js');
}); 