import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LiveVisualizer from './pages/LiveVisualizer';
import VideoGenerator from './pages/VideoGenerator';
import LearningPaths from './pages/LearningPaths';
import MentorSystem from './pages/MentorSystem';
import Microlearning from './pages/Microlearning';
import Login from './pages/Login';
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
            <Route path="/live-visualizer" element={<LiveVisualizer />} />
            <Route path="/video-generator" element={<VideoGenerator />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/mentor-system" element={<MentorSystem />} />
            <Route path="/microlearning" element={<Microlearning />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;