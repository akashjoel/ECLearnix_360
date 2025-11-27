const express = require('express');
const { body, validationResult, query } = require('express-validator');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware, authorize } = require('../middleware/auth');
const { getCache, setCache } = require('../config/redis');

const router = express.Router();

// @route   GET /api/mentors
// @desc    Get all mentors with filtering
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('skills').optional().isString().withMessage('Skills must be a string'),
  query('location').optional().isString().withMessage('Location must be a string'),
  query('availability').optional().isString().withMessage('Availability must be a string'),
  query('sort').optional().isIn(['rating', 'experience', 'price', 'newest']).withMessage('Invalid sort option')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const {
    page = 1,
    limit = 12,
    skills,
    location,
    availability,
    sort = 'rating'
  } = req.query;

  // Build query
  const query = { 
    role: 'mentor', 
    status: 'active' 
  };

  if (skills) {
    query['professional.skills'] = { $in: skills.split(',').map(skill => new RegExp(skill.trim(), 'i')) };
  }

  if (location) {
    query.location = new RegExp(location, 'i');
  }

  // Build sort options
  let sortOptions = {};
  switch (sort) {
    case 'rating':
      sortOptions = { 'rating.average': -1 };
      break;
    case 'experience':
      sortOptions = { 'professional.experience': -1 };
      break;
    case 'price':
      sortOptions = { 'mentorProfile.hourlyRate': 1 };
      break;
    case 'newest':
      sortOptions = { createdAt: -1 };
      break;
    default:
      sortOptions = { 'rating.average': -1 };
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Check cache
  const cacheKey = `mentors:${JSON.stringify({ query, sortOptions, page, limit })}`;
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(cachedData);
  }

  // Execute query
  const mentors = await User.find(query)
    .select('-password -loginAttempts -lockUntil -passwordResetToken -passwordResetExpires -emailVerificationToken -emailVerificationExpires')
    .sort(sortOptions)
    .skip(skip)
    .limit(parseInt(limit));

  // Get total count
  const total = await User.countDocuments(query);

  // Calculate pagination info
  const totalPages = Math.ceil(total / parseInt(limit));
  const hasNextPage = parseInt(page) < totalPages;
  const hasPrevPage = parseInt(page) > 1;

  const response = {
    success: true,
    data: {
      mentors,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      }
    }
  };

  // Cache for 5 minutes
  await setCache(cacheKey, response, 300);

  res.json(response);
}));

// @route   GET /api/mentors/featured
// @desc    Get featured mentors
// @access  Public
router.get('/featured', asyncHandler(async (req, res) => {
  const { limit = 6 } = req.query;

  // Check cache
  const cacheKey = `featured-mentors:${limit}`;
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(cachedData);
  }

  const mentors = await User.find({ 
    role: 'mentor', 
    status: 'active',
    'mentorProfile.isFeatured': true
  })
  .select('-password -loginAttempts -lockUntil -passwordResetToken -passwordResetExpires -emailVerificationToken -emailVerificationExpires')
  .sort({ 'rating.average': -1, 'professional.experience': -1 })
  .limit(parseInt(limit));

  const response = {
    success: true,
    data: { mentors }
  };

  // Cache for 10 minutes
  await setCache(cacheKey, response, 600);

  res.json(response);
}));

// @route   GET /api/mentors/:id
// @desc    Get mentor by ID
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check cache
  const cacheKey = `mentor:${id}`;
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(cachedData);
  }

  const mentor = await User.findOne({ 
    _id: id, 
    role: 'mentor', 
    status: 'active' 
  })
  .select('-password -loginAttempts -lockUntil -passwordResetToken -passwordResetExpires -emailVerificationToken -emailVerificationExpires');

  if (!mentor) {
    return res.status(404).json({
      success: false,
      message: 'Mentor not found'
    });
  }

  const response = {
    success: true,
    data: { mentor }
  };

  // Cache for 5 minutes
  await setCache(cacheKey, response, 300);

  res.json(response);
}));

// @route   GET /api/mentors/:id/availability
// @desc    Get mentor availability
// @access  Private
router.get('/:id/availability', [
  authMiddleware
], asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  const mentor = await User.findOne({ 
    _id: id, 
    role: 'mentor', 
    status: 'active' 
  });

  if (!mentor) {
    return res.status(404).json({
      success: false,
      message: 'Mentor not found'
    });
  }

  // This would typically fetch from a separate availability model
  // For now, we'll return a mock availability
  const availability = {
    mentorId: id,
    date: date || new Date().toISOString().split('T')[0],
    slots: [
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: false },
      { time: '12:00', available: true },
      { time: '13:00', available: true },
      { time: '14:00', available: false },
      { time: '15:00', available: true },
      { time: '16:00', available: true },
      { time: '17:00', available: true }
    ]
  };

  res.json({
    success: true,
    data: { availability }
  });
}));

// @route   POST /api/mentors/:id/book
// @desc    Book a mentor session
// @access  Private
router.post('/:id/book', [
  authMiddleware,
  authorize('student', 'professional'),
  body('date')
    .isISO8601()
    .withMessage('Date must be a valid ISO date'),
  body('time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time must be in HH:MM format'),
  body('duration')
    .isInt({ min: 30, max: 180 })
    .withMessage('Duration must be between 30 and 180 minutes'),
  body('topic')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Topic must be between 5 and 200 characters'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes must be less than 500 characters')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { id } = req.params;
  const { date, time, duration, topic, notes } = req.body;

  const mentor = await User.findOne({ 
    _id: id, 
    role: 'mentor', 
    status: 'active' 
  });

  if (!mentor) {
    return res.status(404).json({
      success: false,
      message: 'Mentor not found'
    });
  }

  // Check if mentor is available
  const sessionDate = new Date(`${date}T${time}`);
  const now = new Date();
  
  if (sessionDate <= now) {
    return res.status(400).json({
      success: false,
      message: 'Session time must be in the future'
    });
  }

  // This would typically create a booking record in the database
  // For now, we'll return a success response
  const booking = {
    id: Math.random().toString(36).substr(2, 9),
    mentorId: id,
    studentId: req.user._id,
    date: date,
    time: time,
    duration: duration,
    topic: topic,
    notes: notes,
    status: 'confirmed',
    createdAt: new Date(),
    sessionUrl: `https://meet.learnoai.com/${Math.random().toString(36).substr(2, 9)}`
  };

  // Send confirmation email to mentor and student
  // This would typically be handled by a notification service

  res.status(201).json({
    success: true,
    message: 'Session booked successfully',
    data: { booking }
  });
}));

// @route   POST /api/mentors/profile
// @desc    Create/Update mentor profile
// @access  Private (Mentors)
router.post('/profile', [
  authMiddleware,
  authorize('mentor'),
  body('bio')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Bio must be between 10 and 1000 characters'),
  body('hourlyRate')
    .isFloat({ min: 10, max: 500 })
    .withMessage('Hourly rate must be between $10 and $500'),
  body('specializations')
    .isArray({ min: 1, max: 10 })
    .withMessage('Must have between 1 and 10 specializations'),
  body('availability')
    .isObject()
    .withMessage('Availability must be an object'),
  body('languages')
    .isArray({ min: 1 })
    .withMessage('Must specify at least one language')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const {
    bio,
    hourlyRate,
    specializations,
    availability,
    languages,
    isFeatured,
    videoIntroduction
  } = req.body;

  // Update user with mentor profile
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      bio,
      'mentorProfile.hourlyRate': hourlyRate,
      'mentorProfile.specializations': specializations,
      'mentorProfile.availability': availability,
      'mentorProfile.languages': languages,
      'mentorProfile.isFeatured': isFeatured || false,
      'mentorProfile.videoIntroduction': videoIntroduction
    },
    { new: true, runValidators: true }
  ).select('-password');

  // Clear mentor caches
  await Promise.all([
    getCache('featured-mentors:6'),
    getCache('featured-mentors:12')
  ].map(cache => cache && cache.clear()));

  res.json({
    success: true,
    message: 'Mentor profile updated successfully',
    data: { mentor: updatedUser }
  });
}));

// @route   GET /api/mentors/:id/reviews
// @desc    Get mentor reviews
// @access  Public
router.get('/:id/reviews', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 20 }).withMessage('Limit must be between 1 and 20')
], asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const mentor = await User.findOne({ 
    _id: id, 
    role: 'mentor', 
    status: 'active' 
  });

  if (!mentor) {
    return res.status(404).json({
      success: false,
      message: 'Mentor not found'
    });
  }

  // This would typically fetch from a reviews model
  // For now, we'll return mock reviews
  const reviews = [
    {
      id: '1',
      studentName: 'John Doe',
      rating: 5,
      comment: 'Excellent mentor! Very knowledgeable and patient.',
      date: new Date('2024-01-15')
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      rating: 4,
      comment: 'Great session, learned a lot about React development.',
      date: new Date('2024-01-10')
    }
  ];

  const total = reviews.length;
  const totalPages = Math.ceil(total / parseInt(limit));

  res.json({
    success: true,
    data: {
      reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
        limit: parseInt(limit)
      }
    }
  });
}));

// @route   POST /api/mentors/:id/review
// @desc    Add review for mentor
// @access  Private
router.post('/:id/review', [
  authMiddleware,
  authorize('student', 'professional'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Comment must be between 10 and 500 characters')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { id } = req.params;
  const { rating, comment } = req.body;

  const mentor = await User.findOne({ 
    _id: id, 
    role: 'mentor', 
    status: 'active' 
  });

  if (!mentor) {
    return res.status(404).json({
      success: false,
      message: 'Mentor not found'
    });
  }

  // Check if user has had a session with this mentor
  // This would typically check against a sessions model

  // This would typically create a review record in the database
  const review = {
    id: Math.random().toString(36).substr(2, 9),
    mentorId: id,
    studentId: req.user._id,
    studentName: req.user.displayName,
    rating,
    comment,
    date: new Date()
  };

  res.status(201).json({
    success: true,
    message: 'Review added successfully',
    data: { review }
  });
}));

module.exports = router; 