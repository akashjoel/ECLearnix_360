const express = require('express');
const { body, validationResult } = require('express-validator');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/internships
// @desc    Get internship opportunities
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  // Mock internship data
  const internships = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Remote',
      duration: '6 months',
      stipend: '$3000/month',
      description: 'Join our frontend team and work on cutting-edge web applications.',
      requirements: ['React', 'JavaScript', 'CSS', 'Git'],
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      deadline: '2024-03-15',
      positions: 5,
      applications: 23
    },
    {
      id: '2',
      title: 'Data Science Intern',
      company: 'DataAI',
      location: 'New York, NY',
      type: 'Hybrid',
      duration: '3 months',
      stipend: '$4000/month',
      description: 'Work on machine learning projects and data analysis.',
      requirements: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
      deadline: '2024-02-28',
      positions: 3,
      applications: 15
    }
  ];

  res.json({
    success: true,
    data: { internships }
  });
}));

// @route   POST /api/internships/apply
// @desc    Submit internship application
// @access  Private
router.post('/apply', [
  authMiddleware,
  authorize('student', 'professional'),
  body('internshipId')
    .notEmpty()
    .withMessage('Internship ID is required'),
  body('coverLetter')
    .trim()
    .isLength({ min: 100, max: 1000 })
    .withMessage('Cover letter must be between 100 and 1000 characters'),
  body('resume')
    .notEmpty()
    .withMessage('Resume is required'),
  body('portfolio')
    .optional()
    .isURL()
    .withMessage('Portfolio must be a valid URL')
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

  const { internshipId, coverLetter, resume, portfolio, transcript } = req.body;

  // Mock application creation
  const application = {
    id: Math.random().toString(36).substr(2, 9),
    internshipId,
    userId: req.user._id,
    coverLetter,
    resume,
    portfolio,
    transcript,
    status: 'pending',
    submittedAt: new Date()
  };

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully',
    data: { application }
  });
}));

// @route   GET /api/internships/applications
// @desc    Get user's internship applications
// @access  Private
router.get('/applications', [
  authMiddleware
], asyncHandler(async (req, res) => {
  // Mock applications data
  const applications = [
    {
      id: '1',
      internshipTitle: 'Frontend Developer Intern',
      company: 'TechCorp',
      status: 'pending',
      submittedAt: '2024-01-15',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      internshipTitle: 'Data Science Intern',
      company: 'DataAI',
      status: 'reviewed',
      submittedAt: '2024-01-10',
      lastUpdated: '2024-01-12'
    }
  ];

  res.json({
    success: true,
    data: { applications }
  });
}));

module.exports = router; 