import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../index.css'; // Ensure Tailwind or your styling is loaded

const exampleUsers = [
  {
    email: 'alice@student.com',
    password: 'student123',
    user: {
      name: 'Alice Student',
      email: 'alice@student.com',
      role: 'student',
      grade: '10th',
    },
  },
  {
    email: 'bob@mentor.com',
    password: 'mentor123',
    user: {
      name: 'Bob Mentor',
      email: 'bob@mentor.com',
      role: 'mentor',
      expertise: ['AI', 'Math'],
    },
  },
  {
    email: 'carol@pro.com',
    password: 'pro123',
    user: {
      name: 'Carol Professional',
      email: 'carol@pro.com',
      role: 'professional',
      company: 'TechCorp',
    },
  },
];

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = exampleUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );
    if (found) {
      login(found.user);
      navigate('/');
    } else {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Spline animation panel */}
      <div className="w-1/2 hidden lg:block relative">
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.37/build/spline-viewer.js"></script>
        <spline-viewer
          url="https://prod.spline.design/JennMB6i2t05MPeM/scene.splinecode"
          style={{
            width: '100%',
            height: '100vh',
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        ></spline-viewer>
      </div>

      {/* Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-md"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-md"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;