const express = require('express');
const { body, validationResult } = require('express-validator');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/payments/create-checkout
// @desc    Create Stripe checkout session
// @access  Private
router.post('/create-checkout', [
  authMiddleware,
  body('priceId')
    .notEmpty()
    .withMessage('Price ID is required'),
  body('successUrl')
    .isURL()
    .withMessage('Success URL must be a valid URL'),
  body('cancelUrl')
    .isURL()
    .withMessage('Cancel URL must be a valid URL')
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

  const { priceId, successUrl, cancelUrl } = req.body;

  // Mock Stripe checkout session creation
  const session = {
    id: 'cs_' + Math.random().toString(36).substr(2, 9),
    url: `https://checkout.stripe.com/pay/${Math.random().toString(36).substr(2, 9)}`,
    amount_total: 2999,
    currency: 'usd',
    status: 'open'
  };

  res.json({
    success: true,
    data: { session }
  });
}));

// @route   POST /api/payments/webhook
// @desc    Handle Stripe webhooks
// @access  Public
router.post('/webhook', asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  // Verify webhook signature (mock)
  // In production, you would verify the signature using Stripe's webhook secret
  
  const event = req.body;
  
  // Handle different event types
  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful payment
      console.log('Payment completed:', event.data.object);
      break;
    case 'customer.subscription.created':
      // Handle subscription creation
      console.log('Subscription created:', event.data.object);
      break;
    case 'customer.subscription.updated':
      // Handle subscription updates
      console.log('Subscription updated:', event.data.object);
      break;
    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      console.log('Subscription cancelled:', event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  
  res.json({ received: true });
}));

// @route   GET /api/payments/subscriptions
// @desc    Get user subscriptions
// @access  Private
router.get('/subscriptions', [
  authMiddleware
], asyncHandler(async (req, res) => {
  // Mock subscription data
  const subscriptions = [
    {
      id: 'sub_123456789',
      status: 'active',
      plan: 'premium',
      currentPeriodStart: '2024-01-01T00:00:00Z',
      currentPeriodEnd: '2024-02-01T00:00:00Z',
      cancelAtPeriodEnd: false,
      amount: 2999,
      currency: 'usd'
    }
  ];

  res.json({
    success: true,
    data: { subscriptions }
  });
}));

// @route   POST /api/payments/cancel-subscription
// @desc    Cancel subscription
// @access  Private
router.post('/cancel-subscription', [
  authMiddleware,
  body('subscriptionId')
    .notEmpty()
    .withMessage('Subscription ID is required')
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

  const { subscriptionId } = req.body;

  // Mock subscription cancellation
  const subscription = {
    id: subscriptionId,
    status: 'canceled',
    cancelAtPeriodEnd: true,
    canceledAt: new Date()
  };

  res.json({
    success: true,
    message: 'Subscription cancelled successfully',
    data: { subscription }
  });
}));

module.exports = router; 