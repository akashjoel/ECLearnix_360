const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['video', 'text', 'quiz', 'assignment', 'interactive'],
    default: 'video'
  },
  content: {
    videoUrl: String,
    videoDuration: Number, // in seconds
    textContent: String,
    attachments: [{
      name: String,
      url: String,
      type: String,
      size: Number
    }]
  },
  quiz: {
    questions: [{
      question: String,
      type: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'short-answer', 'essay'],
        default: 'multiple-choice'
      },
      options: [String],
      correctAnswer: String,
      points: {
        type: Number,
        default: 1
      },
      explanation: String
    }],
    passingScore: {
      type: Number,
      default: 70
    },
    timeLimit: Number // in minutes
  },
  order: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  estimatedDuration: Number, // in minutes
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  }
}, {
  timestamps: true
});

const courseSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    maxlength: 200,
    trim: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  banner: String,
  category: {
    type: String,
    required: true,
    enum: [
      'programming', 'design', 'business', 'marketing', 'data-science',
      'artificial-intelligence', 'cybersecurity', 'cloud-computing',
      'mobile-development', 'web-development', 'game-development',
      'digital-marketing', 'finance', 'healthcare', 'education'
    ]
  },
  subcategory: String,
  tags: [String],

  // Course Details
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coInstructors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels'],
    default: 'beginner'
  },
  language: {
    type: String,
    default: 'en'
  },
  duration: {
    type: Number, // total duration in minutes
    required: true
  },
  lessons: [lessonSchema],
  totalLessons: {
    type: Number,
    default: 0
  },

  // Pricing and Access
  price: {
    type: Number,
    default: 0
  },
  originalPrice: Number,
  currency: {
    type: String,
    default: 'USD'
  },
  isFree: {
    type: Boolean,
    default: true
  },
  accessType: {
    type: String,
    enum: ['free', 'premium', 'subscription', 'one-time'],
    default: 'free'
  },
  enrollmentLimit: Number,
  currentEnrollments: {
    type: Number,
    default: 0
  },

  // Course Status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'scheduled'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isCertified: {
    type: Boolean,
    default: false
  },
  certificateTemplate: String,

  // Learning Objectives
  learningObjectives: [String],
  prerequisites: [String],
  targetAudience: [String],

  // Course Structure
  sections: [{
    title: String,
    description: String,
    order: Number,
    lessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    }]
  }],

  // Resources
  resources: [{
    title: String,
    description: String,
    type: {
      type: String,
      enum: ['document', 'video', 'link', 'download']
    },
    url: String,
    fileSize: Number,
    isPublic: {
      type: Boolean,
      default: false
    }
  }],

  // Reviews and Ratings
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    distribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 }
    }
  },

  // Analytics
  analytics: {
    totalViews: {
      type: Number,
      default: 0
    },
    totalCompletions: {
      type: Number,
      default: 0
    },
    averageCompletionTime: Number, // in days
    dropOffRate: Number, // percentage
    engagementScore: Number // calculated score
  },

  // SEO and Marketing
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    canonicalUrl: String
  },

  // Settings
  settings: {
    allowReviews: {
      type: Boolean,
      default: true
    },
    allowDownloads: {
      type: Boolean,
      default: false
    },
    requireEnrollment: {
      type: Boolean,
      default: false
    },
    autoProgress: {
      type: Boolean,
      default: true
    },
    showProgress: {
      type: Boolean,
      default: true
    }
  },

  // Publishing
  publishedAt: Date,
  scheduledAt: Date,
  archivedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
courseSchema.index({ slug: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ isFeatured: 1 });
courseSchema.index({ 'rating.average': -1 });
courseSchema.index({ createdAt: -1 });
courseSchema.index({ tags: 1 });

// Virtuals
courseSchema.virtual('completionRate').get(function() {
  if (this.analytics.totalViews === 0) return 0;
  return Math.round((this.analytics.totalCompletions / this.analytics.totalViews) * 100);
});

courseSchema.virtual('isEnrollmentFull').get(function() {
  return this.enrollmentLimit && this.currentEnrollments >= this.enrollmentLimit;
});

courseSchema.virtual('discountPercentage').get(function() {
  if (!this.originalPrice || this.originalPrice <= this.price) return 0;
  return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
});

// Pre-save middleware
courseSchema.pre('save', function(next) {
  // Generate slug if not provided
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  // Update total lessons count
  this.totalLessons = this.lessons.length;

  // Set published date
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Static methods
courseSchema.statics.findByCategory = function(category, limit = 10) {
  return this.find({ 
    category, 
    status: 'published' 
  })
  .sort({ 'rating.average': -1, createdAt: -1 })
  .limit(limit);
};

courseSchema.statics.findFeatured = function(limit = 10) {
  return this.find({ 
    isFeatured: true, 
    status: 'published' 
  })
  .sort({ 'rating.average': -1, createdAt: -1 })
  .limit(limit);
};

courseSchema.statics.search = function(query, filters = {}) {
  const searchQuery = {
    status: 'published',
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ]
  };

  if (filters.category) {
    searchQuery.category = filters.category;
  }

  if (filters.level) {
    searchQuery.level = filters.level;
  }

  if (filters.priceRange) {
    searchQuery.price = {
      $gte: filters.priceRange.min || 0,
      $lte: filters.priceRange.max || Number.MAX_VALUE
    };
  }

  return this.find(searchQuery)
    .sort({ 'rating.average': -1, createdAt: -1 });
};

// Instance methods
courseSchema.methods.incrementEnrollment = function() {
  this.currentEnrollments += 1;
  return this.save();
};

courseSchema.methods.decrementEnrollment = function() {
  if (this.currentEnrollments > 0) {
    this.currentEnrollments -= 1;
  }
  return this.save();
};

courseSchema.methods.updateRating = function(newRating) {
  const oldRating = this.rating.average;
  const oldCount = this.rating.count;
  
  this.rating.count += 1;
  this.rating.average = ((oldRating * oldCount) + newRating) / this.rating.count;
  
  // Update rating distribution
  const ratingKey = Math.floor(newRating);
  if (this.rating.distribution[ratingKey] !== undefined) {
    this.rating.distribution[ratingKey] += 1;
  }
  
  return this.save();
};

module.exports = mongoose.model('Course', courseSchema); 