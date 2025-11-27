const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { setCache } = require('../config/redis');
const { sendEmail } = require('../utils/email');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('displayName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Display name must be between 2 and 50 characters'),
  body('role')
    .optional()
    .isIn(['student', 'mentor', 'professional'])
    .withMessage('Invalid role')
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

  const { email, password, displayName, role = 'student', firstName, lastName } = req.body;

  // Check if user already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  // Create new user
  const user = new User({
    email,
    password,
    displayName,
    role,
    firstName,
    lastName
  });

  await user.save();

  // Generate verification token
  const verificationToken = user.generateEmailVerificationToken();
  await user.save();

  // Send verification email
  if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
    try {
      await sendEmail({
        to: email,
        subject: 'Verify your email address',
        template: 'emailVerification',
        data: {
          name: displayName,
          verificationUrl: `${process.env.BASE_URL}/verify-email?token=${verificationToken}`
        }
      });
    } catch (error) {
      console.error('Email verification failed:', error);
    }
  }

  // Generate JWT token
  const token = generateToken(user._id, user.role);

  // Set token in cache for blacklist functionality
  await setCache(`token:${token}`, { userId: user._id, role: user.role }, 7 * 24 * 60 * 60);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
      token
    }
  });
}));

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
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

  const { email, password } = req.body;

  // Find user by email
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Check if account is locked
  if (user.isLocked) {
    return res.status(401).json({
      success: false,
      message: 'Account is temporarily locked due to multiple failed login attempts'
    });
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    // Increment login attempts
    await user.incrementLoginAttempts();
    
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Reset login attempts on successful login
  await user.resetLoginAttempts();

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate JWT token
  const token = generateToken(user._id, user.role);

  // Set token in cache
  await setCache(`token:${token}`, { userId: user._id, role: user.role }, 7 * 24 * 60 * 60);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        avatar: user.avatar,
        subscription: user.subscription
      },
      token
    }
  });
}));

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', authMiddleware, asyncHandler(async (req, res) => {
  const { token } = req;

  // Blacklist the token
  await setCache(`blacklist:${token}`, true, 7 * 24 * 60 * 60);

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
}));

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
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

  const { email } = req.body;

  // Find user by email
  const user = await User.findByEmail(email);
  if (!user) {
    // Don't reveal if user exists or not
    return res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent'
    });
  }

  // Generate password reset token
  const resetToken = user.generatePasswordResetToken();
  await user.save();

  // Send password reset email
  if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
    try {
      await sendEmail({
        to: email,
        subject: 'Reset your password',
        template: 'passwordReset',
        data: {
          name: user.displayName,
          resetUrl: `${process.env.BASE_URL}/reset-password?token=${resetToken}`
        }
      });
    } catch (error) {
      console.error('Password reset email failed:', error);
    }
  }

  res.json({
    success: true,
    message: 'If an account with that email exists, a password reset link has been sent'
  });
}));

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
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

  const { token, password } = req.body;

  // Find user by reset token
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired reset token'
    });
  }

  // Update password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.lastPasswordChange = new Date();
  await user.save();

  // Send confirmation email
  if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password reset successful',
        template: 'passwordResetSuccess',
        data: {
          name: user.displayName
        }
      });
    } catch (error) {
      console.error('Password reset confirmation email failed:', error);
    }
  }

  res.json({
    success: true,
    message: 'Password reset successful'
  });
}));

// @route   POST /api/auth/verify-email
// @desc    Verify email with token
// @access  Public
router.post('/verify-email', [
  body('token')
    .notEmpty()
    .withMessage('Verification token is required')
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

  const { token } = req.body;

  // Find user by verification token
  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired verification token'
    });
  }

  // Verify email
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  res.json({
    success: true,
    message: 'Email verified successfully'
  });
}));

// @route   POST /api/auth/resend-verification
// @desc    Resend email verification
// @access  Private
router.post('/resend-verification', authMiddleware, asyncHandler(async (req, res) => {
  const { user } = req;

  if (user.isEmailVerified) {
    return res.status(400).json({
      success: false,
      message: 'Email is already verified'
    });
  }

  // Generate new verification token
  const verificationToken = user.generateEmailVerificationToken();
  await user.save();

  // Send verification email
  if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        template: 'emailVerification',
        data: {
          name: user.displayName,
          verificationUrl: `${process.env.BASE_URL}/verify-email?token=${verificationToken}`
        }
      });
    } catch (error) {
      console.error('Email verification failed:', error);
    }
  }

  res.json({
    success: true,
    message: 'Verification email sent successfully'
  });
}));

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authMiddleware, asyncHandler(async (req, res) => {
  const { user } = req;

  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
        subscription: user.subscription,
        progress: user.progress,
        notifications: user.notifications,
        createdAt: user.createdAt
      }
    }
  });
}));

// @route   POST /api/auth/refresh-token
// @desc    Refresh JWT token
// @access  Private
router.post('/refresh-token', authMiddleware, asyncHandler(async (req, res) => {
  const { user } = req;

  // Generate new token
  const newToken = generateToken(user._id, user.role);

  // Blacklist old token
  const { token } = req;
  await setCache(`blacklist:${token}`, true, 7 * 24 * 60 * 60);

  // Set new token in cache
  await setCache(`token:${newToken}`, { userId: user._id, role: user.role }, 7 * 24 * 60 * 60);

  res.json({
    success: true,
    message: 'Token refreshed successfully',
    data: {
      token: newToken
    }
  });
}));

module.exports = router; 