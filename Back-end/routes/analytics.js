const express = require('express');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/analytics/dashboard
// @desc    Get user dashboard analytics
// @access  Private
router.get('/dashboard', [
  authMiddleware
], asyncHandler(async (req, res) => {
  // Mock dashboard analytics
  const analytics = {
    overview: {
      totalCoursesEnrolled: 12,
      totalCoursesCompleted: 8,
      totalHoursLearned: 156,
      currentStreak: 7,
      longestStreak: 21,
      completionRate: 67
    },
    recentActivity: [
      {
        type: 'course_completed',
        title: 'React Fundamentals',
        date: '2024-01-15',
        timeSpent: 45
      },
      {
        type: 'lesson_watched',
        title: 'JavaScript Advanced',
        date: '2024-01-14',
        timeSpent: 30
      }
    ],
    progress: {
      weekly: [65, 70, 75, 80, 85, 90, 95],
      monthly: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115]
    }
  };

  res.json({
    success: true,
    data: { analytics }
  });
}));

// @route   GET /api/analytics/progress
// @desc    Get learning progress
// @access  Private
router.get('/progress', [
  authMiddleware
], asyncHandler(async (req, res) => {
  // Mock progress data
  const progress = {
    courses: [
      {
        id: '1',
        title: 'React Fundamentals',
        progress: 100,
        completedLessons: 12,
        totalLessons: 12,
        lastAccessed: '2024-01-15'
      },
      {
        id: '2',
        title: 'JavaScript Advanced',
        progress: 75,
        completedLessons: 9,
        totalLessons: 12,
        lastAccessed: '2024-01-14'
      }
    ],
    skills: [
      {
        name: 'JavaScript',
        level: 'Advanced',
        progress: 85
      },
      {
        name: 'React',
        level: 'Intermediate',
        progress: 70
      }
    ]
  };

  res.json({
    success: true,
    data: { progress }
  });
}));

// @route   GET /api/analytics/recommendations
// @desc    Get course recommendations
// @access  Private
router.get('/recommendations', [
  authMiddleware
], asyncHandler(async (req, res) => {
  // Mock recommendations
  const recommendations = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      reason: 'Based on your strong React fundamentals',
      confidence: 0.95
    },
    {
      id: '2',
      title: 'Node.js Backend Development',
      reason: 'Complement your frontend skills',
      confidence: 0.88
    }
  ];

  res.json({
    success: true,
    data: { recommendations }
  });
}));

module.exports = router; 