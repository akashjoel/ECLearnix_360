# 🔗 Frontend Integration Guide

## 📋 Overview

This guide will help you integrate your React frontend with the Learno AI backend API.

## 🚀 Quick Start

### 1. Update Frontend API Configuration

Create or update your API configuration file:

```javascript
// src/config/api.js
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

export default API_CONFIG;
```

### 2. Create API Service

```javascript
// src/services/api.js
import API_CONFIG from '../config/api';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.headers = API_CONFIG.HEADERS;
  }

  // Helper method to add auth token
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      ...this.headers,
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST'
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Course methods
  async getCourses(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/courses?${queryString}`);
  }

  async getCourse(id) {
    return this.request(`/courses/${id}`);
  }

  async enrollInCourse(courseId) {
    return this.request(`/courses/${courseId}/enroll`, {
      method: 'POST'
    });
  }

  // Mentor methods
  async getMentors(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/mentors?${queryString}`);
  }

  async getMentor(id) {
    return this.request(`/mentors/${id}`);
  }

  // Internship methods
  async getInternships() {
    return this.request('/internships');
  }

  async applyForInternship(internshipId, applicationData) {
    return this.request(`/internships/${internshipId}/apply`, {
      method: 'POST',
      body: JSON.stringify(applicationData)
    });
  }

  // Payment methods
  async createCheckoutSession(priceId, successUrl, cancelUrl) {
    return this.request('/payments/create-checkout', {
      method: 'POST',
      body: JSON.stringify({ priceId, successUrl, cancelUrl })
    });
  }

  // AI methods
  async chatWithAI(message, context = {}) {
    return this.request('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context })
    });
  }

  // Analytics methods
  async getDashboardAnalytics() {
    return this.request('/analytics/dashboard');
  }

  // User profile methods
  async updateProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  async changePassword(passwordData) {
    return this.request('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData)
    });
  }
}

export default new ApiService();
```

### 3. Create Authentication Context

```javascript
// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await apiService.getCurrentUser();
        setUser(userData.data.user);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await apiService.login(credentials);
      
      if (response.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        return response;
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await apiService.register(userData);
      
      if (response.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        return response;
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 4. Update Your App Component

```javascript
// src/App.js
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Mentors from './components/Mentors';
import Internships from './components/Internships';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route path="/courses" element={<Courses />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

### 5. Example Component Usage

```javascript
// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <h2>Login to Learno AI</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
```

### 6. Example Course Component

```javascript
// src/components/Courses.js
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCourses();
      setCourses(response.data.courses);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await apiService.enrollInCourse(courseId);
      alert('Successfully enrolled in course!');
      fetchCourses(); // Refresh the list
    } catch (error) {
      alert('Failed to enroll: ' + error.message);
    }
  };

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="courses-container">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <img src={course.thumbnail} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.shortDescription}</p>
            <div className="course-meta">
              <span>Level: {course.level}</span>
              <span>Duration: {course.duration} min</span>
              <span>Price: ${course.price}</span>
            </div>
            <button onClick={() => handleEnroll(course._id)}>
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
```

## 🔧 Environment Variables

Create a `.env` file in your frontend root:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## 🚀 Testing the Integration

1. Start your backend server: `npm run dev`
2. Start your frontend: `npm start`
3. Navigate to `http://localhost:3000`
4. Try registering a new user
5. Test the login functionality
6. Browse courses and other features

## 📱 Socket.IO Integration

For real-time features, add Socket.IO to your frontend:

```bash
npm install socket.io-client
```

```javascript
// src/services/socket.js
import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(token) {
    this.socket = io('http://localhost:5000', {
      auth: { token }
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }
}

export default new SocketService();
```

## 🎯 Next Steps

1. Implement all the components using the API service
2. Add error handling and loading states
3. Implement real-time features with Socket.IO
4. Add form validation
5. Style your components
6. Test all functionality
7. Deploy to production 