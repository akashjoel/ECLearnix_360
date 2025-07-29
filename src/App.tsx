import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LiveVisualizer from './pages/LiveVisualizer';
import VideoGenerator from './pages/VideoGenerator';
import LearningPaths from './pages/LearningPaths';
import MentorSystem from './pages/MentorSystem';
import Microlearning from './pages/Microlearning';
import Profile from './pages/Profile';
import Login from './components/login';
import Internship from './pages/Internship';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/visualizer" element={<LiveVisualizer />} />
            <Route path="/generator" element={<VideoGenerator />} />
            <Route path="/paths" element={<LearningPaths />} />
            <Route path="/mentors" element={<MentorSystem />} />
            <Route path="/microlearning" element={<Microlearning />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/internship" element={<Internship />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
