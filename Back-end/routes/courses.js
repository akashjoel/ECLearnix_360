const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Course = require('../models/Course');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware, authorize, optionalAuth } = require('../middleware/auth');
const { getCache, setCache } = require('../config/redis');

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('category').optional().isString().withMessage('Category must be a string'),
  query('level').optional().isIn(['beginner', 'intermediate', 'advanced', 'all-levels']).withMessage('Invalid level'),
  query('search').optional().isString().withMessage('Search must be a string'),
  query('sort').optional().isIn(['newest', 'oldest', 'rating', 'price', 'popular']).withMessage('Invalid sort option'),
  query('priceMin').optional().isFloat({ min: 0 }).withMessage('Price min must be a positive number'),
  query('priceMax').optional().isFloat({ min: 0 }).withMessage('Price max must be a positive number')
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
    category,
    level,
    search,
    sort = 'newest',
    priceMin,
    priceMax,
    instructor,
    tags
  } = req.query;

  // Build query
  const query = { status: 'published' };

  if (category) {
    query.category = category;
  }

  if (level && level !== 'all-levels') {
    query.level = level;
  }

  if (instructor) {
    query.instructor = instructor;
  }

  if (tags) {
    query.tags = { $in: tags.split(',') };
  }

  if (priceMin || priceMax) {
    query.price = {};
    if (priceMin) query.price.$gte = parseFloat(priceMin);
    if (priceMax) query.price.$lte = parseFloat(priceMax);
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  // Build sort options
  let sortOptions = {};
  switch (sort) {
    case 'newest':
      sortOptions = { createdAt: -1 };
      break;
    case 'oldest':
      sortOptions = { createdAt: 1 };
      break;
    case 'rating':
      sortOptions = { 'rating.average': -1 };
      break;
    case 'price':
      sortOptions = { price: 1 };
      break;
    case 'popular':
      sortOptions = { 'analytics.totalViews': -1 };
      break;
    default:
      sortOptions = { createdAt: -1 };
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Check cache first
  const cacheKey = `courses:${JSON.stringify({ query, sortOptions, page, limit })}`;
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(cachedData);
  }

  // Execute query
  const courses = await Course.find(query)
    .populate('instructor', 'displayName avatar')
    .sort(sortOptions)
    .skip(skip)
    .limit(parseInt(limit))
    .select('-lessons.content -seo');

  // Get total count
  const total = await Course.countDocuments(query);

  // Calculate pagination info
  const totalPages = Math.ceil(total / parseInt(limit));
  const hasNextPage = parseInt(page) < totalPages;
  const hasPrevPage = parseInt(page) > 1;

  const response = {
    success: true,
    data: {
      courses,
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

  // Cache the response for 5 minutes
  await setCache(cacheKey, response, 300);

  res.json(response);
}));

// @route   GET /api/courses/featured
// @desc    Get featured courses
// @access  Public
router.get('/featured', asyncHandler(async (req, res) => {
  const { limit = 6 } = req.query;

  // Check cache
  const cacheKey = `featured-courses:${limit}`;
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(cachedData);
  }

  const courses = await Course.find({ 
    isFeatured: true, 
    status: 'published' 
  })
  .populate('instructor', 'displayName avatar')
  .sort({ 'rating.average': -1, createdAt: -1 })
  .limit(parseInt(limit))
  .select('-lessons.content -seo');

  const response = {
    success: true,
    data: { courses }
  };

  // Cache for 10 minutes
  await setCache(cacheKey, response, 600);

  res.json(response);
}));

// @route   GET /api/courses/categories
// @desc    Get course categories with counts
// @access  Public
router.get('/categories', asyncHandler(async (req, res) => {
  // Check cache
  const cacheKey = 'course-categories';
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(cachedData);
  }

  const categories = await Course.aggregate([
    { $match: { status: 'published' } },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        averageRating: { $avg: '$rating.average' },
        averagePrice: { $avg: '$price' }
      }
    },
    { $sort: { count: -1 } }
  ]);

  const response = {
    success: true,
    data: { categories }
  };

  // Cache for 1 hour
  await setCache(cacheKey, response, 3600);

  res.json(response);
}));

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check cache
  const cacheKey = `course:${id}`;
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(cachedData);
  }

  const course = await Course.findById(id)
    .populate('instructor', 'displayName avatar bio professional')
    .populate('coInstructors', 'displayName avatar');

  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }

  // Increment view count
  course.analytics.totalViews += 1;
  await course.save();

  const response = {
    success: true,
    data: { course }
  };

  // Cache for 5 minutes
  await setCache(cacheKey, response, 300);

  res.json(response);
}));

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private (Instructors/Admins)
router.post('/', [
  authMiddleware,
  authorize('mentor', 'admin'),
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('category')
    .isIn([
      'programming', 'design', 'business', 'marketing', 'data-science',
      'artificial-intelligence', 'cybersecurity', 'cloud-computing',
      'mobile-development', 'web-development', 'game-development',
      'digital-marketing', 'finance', 'healthcare', 'education'
    ])
    .withMessage('Invalid category'),
  body('level')
    .isIn(['beginner', 'intermediate', 'advanced', 'all-levels'])
    .withMessage('Invalid level'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer')
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
    title,
    description,
    shortDescription,
    category,
    level,
    price,
    duration,
    thumbnail,
    banner,
    tags,
    learningObjectives,
    prerequisites,
    targetAudience,
    isFree,
    accessType
  } = req.body;

  // Create course
  const course = new Course({
    title,
    description,
    shortDescription,
    category,
    level,
    price: isFree ? 0 : price,
    duration,
    thumbnail,
    banner,
    tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    learningObjectives: learningObjectives ? learningObjectives.split(',').map(obj => obj.trim()) : [],
    prerequisites: prerequisites ? prerequisites.split(',').map(prereq => prereq.trim()) : [],
    targetAudience: targetAudience ? targetAudience.split(',').map(audience => audience.trim()) : [],
    instructor: req.user._id,
    isFree: isFree || price === 0,
    accessType: accessType || (isFree ? 'free' : 'one-time')
  });

  await course.save();

  // Clear related caches
  await Promise.all([
    getCache('course-categories'),
    getCache('featured-courses:6'),
    getCache('featured-courses:12')
  ].map(cache => cache && cache.clear()));

  res.status(201).json({
    success: true,
    message: 'Course created successfully',
    data: { course }
  });
}));

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private (Course owner/Admin)
router.put('/:id', [
  authMiddleware,
  authorize('mentor', 'admin'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters')
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
  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }

  // Check ownership
  if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this course'
    });
  }

  // Update course
  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  ).populate('instructor', 'displayName avatar');

  // Clear caches
  await Promise.all([
    getCache(`course:${id}`),
    getCache('course-categories'),
    getCache('featured-courses:6'),
    getCache('featured-courses:12')
  ].map(cache => cache && cache.clear()));

  res.json({
    success: true,
    message: 'Course updated successfully',
    data: { course: updatedCourse }
  });
}));

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private (Course owner/Admin)
router.delete('/:id', [
  authMiddleware,
  authorize('mentor', 'admin')
], asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }

  // Check ownership
  if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this course'
    });
  }

  await Course.findByIdAndDelete(id);

  // Clear caches
  await Promise.all([
    getCache(`course:${id}`),
    getCache('course-categories'),
    getCache('featured-courses:6'),
    getCache('featured-courses:12')
  ].map(cache => cache && cache.clear()));

  res.json({
    success: true,
    message: 'Course deleted successfully'
  });
}));

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in a course
// @access  Private
router.post('/:id/enroll', [
  authMiddleware,
  authorize('student', 'professional')
], asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }

  if (course.status !== 'published') {
    return res.status(400).json({
      success: false,
      message: 'Course is not available for enrollment'
    });
  }

  // Check if enrollment is full
  if (course.isEnrollmentFull) {
    return res.status(400).json({
      success: false,
      message: 'Course enrollment is full'
    });
  }

  // Check if user is already enrolled
  // This would typically check against an enrollment model
  // For now, we'll just increment the enrollment count
  course.currentEnrollments += 1;
  await course.save();

  res.json({
    success: true,
    message: 'Successfully enrolled in course',
    data: { course }
  });
}));

// @route   POST /api/courses/:id/review
// @desc    Add review to course
// @access  Private
router.post('/:id/review', [
  authMiddleware,
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
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

  const course = await Course.findById(id);
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }

  // Update course rating
  await course.updateRating(rating);

  // Clear caches
  await Promise.all([
    getCache(`course:${id}`),
    getCache('featured-courses:6'),
    getCache('featured-courses:12')
  ].map(cache => cache && cache.clear()));

  res.json({
    success: true,
    message: 'Review added successfully',
    data: { course }
  });
}));

module.exports = router; 