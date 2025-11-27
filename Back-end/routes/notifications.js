const express = require('express');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/notifications
// @desc    Get user notifications
// @access  Private
router.get('/', [
  authMiddleware
], asyncHandler(async (req, res) => {
  // Mock notifications
  const notifications = [
    {
      id: '1',
      type: 'course_completed',
      title: 'Course Completed!',
      message: 'Congratulations! You have completed React Fundamentals.',
      read: false,
      createdAt: '2024-01-15T10:30:00Z',
      actionUrl: '/courses/react-fundamentals'
    },
    {
      id: '2',
      type: 'mentor_session',
      title: 'Mentor Session Reminder',
      message: 'Your session with John Doe starts in 30 minutes.',
      read: false,
      createdAt: '2024-01-15T09:00:00Z',
      actionUrl: '/mentors/session/123'
    },
    {
      id: '3',
      type: 'new_course',
      title: 'New Course Available',
      message: 'Advanced JavaScript Patterns is now available.',
      read: true,
      createdAt: '2024-01-14T15:00:00Z',
      actionUrl: '/courses/advanced-javascript'
    }
  ];

  res.json({
    success: true,
    data: { notifications }
  });
}));

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.put('/:id/read', [
  authMiddleware
], asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Mock mark as read
  const notification = {
    id,
    read: true,
    readAt: new Date()
  };

  res.json({
    success: true,
    message: 'Notification marked as read',
    data: { notification }
  });
}));

// @route   PUT /api/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.put('/read-all', [
  authMiddleware
], asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'All notifications marked as read'
  });
}));

module.exports = router; 