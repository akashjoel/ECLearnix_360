import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';

import LiveVisualizer from './pages/LiveVisualizer';
import VideoGenerator from './pages/VideoGenerator';
import LearningPaths from './pages/LearningPaths';
import MentorSystem from './pages/MentorSystem';
import Profile from './pages/Profile';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import Internship from './pages/Internship';
import Courses from './pages/Courses';
import Microlearning from './pages/Microlearning';
import Checkout from './pages/Checkout';
import Quiz from './pages/Quiz';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />

            <Route path="/visualizer" element={<LiveVisualizer />} />
            <Route path="/generator" element={<VideoGenerator />} />
            <Route path="/paths" element={<LearningPaths />} />
            <Route path="/mentors" element={<MentorSystem />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/microlearning" element={<Microlearning />} />
            <Route path="/checkout/:courseId" element={<Checkout />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/:courseId" element={<Quiz />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/internship" element={<Internship />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
