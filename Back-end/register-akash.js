const http = require('http');

const BASE_URL = 'http://localhost:5000';

// Akash's account details
const akashAccount = {
  email: 'akashjoel08@gmail.com',
  password: 'akashgoki05',
  displayName: 'Akash Joel',
  role: 'student'
};

// Register Akash's account
async function registerAkash() {
  console.log('🔐 Registering Akash\'s account...\n');
  
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(akashAccount);
    
    const req = http.request(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          if (res.statusCode === 201 || res.statusCode === 200) {
            console.log('✅ Account registered successfully!');
            console.log(`   Email: ${akashAccount.email}`);
            console.log(`   Name: ${akashAccount.displayName}`);
            console.log(`   Role: ${akashAccount.role}`);
            console.log('\n🎉 You can now login with these credentials!');
          } else {
            console.log('⚠️  Registration response:', result.message || 'Unknown error');
          }
          resolve(result);
        } catch (error) {
          console.log('⚠️  Could not parse response:', responseData);
          resolve({ success: false, message: 'Parse error' });
        }
      });
    });
    
    req.on('error', (error) => {
      console.log('❌ Registration failed:', error.message);
      console.log('   Make sure the backend server is running on port 5000');
      reject(error);
    });
    
    req.write(data);
    req.end();
  });
}

// Test login with Akash's credentials
async function testLogin() {
  console.log('\n🔑 Testing login with Akash\'s credentials...\n');
  
  return new Promise((resolve, reject) => {
    const loginData = JSON.stringify({
      email: akashAccount.email,
      password: akashAccount.password
    });
    
    const req = http.request(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    }, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          if (res.statusCode === 200) {
            console.log('✅ Login successful!');
            console.log(`   Welcome back, ${akashAccount.displayName}!`);
            if (result.token) {
              console.log('   JWT Token received');
            }
          } else {
            console.log('⚠️  Login failed:', result.message || 'Unknown error');
          }
          resolve(result);
        } catch (error) {
          console.log('⚠️  Could not parse login response:', responseData);
          resolve({ success: false, message: 'Parse error' });
        }
      });
    });
    
    req.on('error', (error) => {
      console.log('❌ Login test failed:', error.message);
      reject(error);
    });
    
    req.write(loginData);
    req.end();
  });
}

// Main function
async function main() {
  console.log('🚀 Learno AI - Account Setup for Akash\n');
  console.log('📧 Email: akashjoel08@gmail.com');
  console.log('🔒 Password: akashgoki05\n');
  
  try {
    await registerAkash();
    await testLogin();
  } catch (error) {
    console.log('\n❌ Setup failed. Please check:');
    console.log('   1. Backend server is running (npm run dev)');
    console.log('   2. MongoDB is connected');
    console.log('   3. Port 5000 is available');
  }
  
  console.log('\n🎯 Setup complete! You can now use these credentials to login.');
}

// Run the script
main(); 