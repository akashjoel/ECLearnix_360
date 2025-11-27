const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  emailVerification: {
    subject: 'Verify your email address',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Learno AI!</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for registering with Learno AI. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.verificationUrl}" 
             style="background-color: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${data.verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The Learno AI Team</p>
      </div>
    `
  },
  
  passwordReset: {
    subject: 'Reset your password',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi ${data.name},</p>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.resetUrl}" 
             style="background-color: #EF4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this password reset, you can safely ignore this email.</p>
        <p>This link will expire in 10 minutes.</p>
        <p>Best regards,<br>The Learno AI Team</p>
      </div>
    `
  },
  
  passwordResetSuccess: {
    subject: 'Password reset successful',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Successful</h2>
        <p>Hi ${data.name},</p>
        <p>Your password has been successfully reset. You can now log in with your new password.</p>
        <p>If you didn't make this change, please contact our support team immediately.</p>
        <p>Best regards,<br>The Learno AI Team</p>
      </div>
    `
  },
  
  welcomeEmail: {
    subject: 'Welcome to Learno AI!',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Learno AI!</h2>
        <p>Hi ${data.name},</p>
        <p>Welcome to Learno AI! We're excited to have you on board.</p>
        <p>Here are some things you can do to get started:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Browse our course catalog</li>
          <li>Connect with mentors</li>
          <li>Start your learning journey</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.dashboardUrl}" 
             style="background-color: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Go to Dashboard
          </a>
        </div>
        <p>Best regards,<br>The Learno AI Team</p>
      </div>
    `
  },
  
  courseEnrollment: {
    subject: 'Course Enrollment Confirmation',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Course Enrollment Confirmation</h2>
        <p>Hi ${data.name},</p>
        <p>You have successfully enrolled in <strong>${data.courseTitle}</strong>.</p>
        <p>Course details:</p>
        <ul>
          <li><strong>Duration:</strong> ${data.duration}</li>
          <li><strong>Lessons:</strong> ${data.lessons}</li>
          <li><strong>Level:</strong> ${data.level}</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.courseUrl}" 
             style="background-color: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Start Learning
          </a>
        </div>
        <p>Best regards,<br>The Learno AI Team</p>
      </div>
    `
  },
  
  courseCompletion: {
    subject: 'Course Completion Certificate',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Congratulations!</h2>
        <p>Hi ${data.name},</p>
        <p>Congratulations! You have successfully completed <strong>${data.courseTitle}</strong>.</p>
        <p>Your certificate is ready for download.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.certificateUrl}" 
             style="background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Download Certificate
          </a>
        </div>
        <p>Keep up the great work!</p>
        <p>Best regards,<br>The Learno AI Team</p>
      </div>
    `
  },
  
  mentorBooking: {
    subject: 'Mentor Session Booking Confirmation',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Mentor Session Confirmed</h2>
        <p>Hi ${data.name},</p>
        <p>Your mentor session with <strong>${data.mentorName}</strong> has been confirmed.</p>
        <p>Session details:</p>
        <ul>
          <li><strong>Date:</strong> ${data.date}</li>
          <li><strong>Time:</strong> ${data.time}</li>
          <li><strong>Duration:</strong> ${data.duration}</li>
          <li><strong>Topic:</strong> ${data.topic}</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.sessionUrl}" 
             style="background-color: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Join Session
          </a>
        </div>
        <p>Best regards,<br>The Learno AI Team</p>
      </div>
    `
  },
  
  internshipApplication: {
    subject: 'Internship Application Received',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Application Received</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for applying to our internship program!</p>
        <p>We have received your application and will review it within 5-7 business days.</p>
        <p>Application details:</p>
        <ul>
          <li><strong>Position:</strong> ${data.position}</li>
          <li><strong>Start Date:</strong> ${data.startDate}</li>
          <li><strong>Duration:</strong> ${data.duration}</li>
        </ul>
        <p>We'll notify you via email once we've reviewed your application.</p>
        <p>Best regards,<br>The Learno AI Team</p>
      </div>
    `
  }
};

// Send email function
const sendEmail = async ({ to, subject, template, data, attachments = [] }) => {
  try {
    const transporter = createTransporter();
    
    // Get template
    const emailTemplate = emailTemplates[template];
    if (!emailTemplate) {
      throw new Error(`Email template '${template}' not found`);
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject: subject || emailTemplate.subject,
      html: emailTemplate.html(data),
      attachments
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      to,
      subject: mailOptions.subject,
      template
    });

    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Send bulk emails
const sendBulkEmail = async (emails) => {
  const results = [];
  
  for (const email of emails) {
    try {
      const result = await sendEmail(email);
      results.push({ success: true, email: email.to, messageId: result.messageId });
    } catch (error) {
      results.push({ success: false, email: email.to, error: error.message });
    }
  }
  
  return results;
};

// Send newsletter
const sendNewsletter = async (subscribers, newsletterData) => {
  const emails = subscribers.map(subscriber => ({
    to: subscriber.email,
    subject: newsletterData.subject,
    template: 'newsletter',
    data: {
      name: subscriber.name,
      ...newsletterData
    }
  }));
  
  return sendBulkEmail(emails);
};

// Send notification email
const sendNotification = async (user, notification) => {
  return sendEmail({
    to: user.email,
    subject: notification.title,
    template: 'notification',
    data: {
      name: user.displayName,
      title: notification.title,
      message: notification.message,
      actionUrl: notification.actionUrl
    }
  });
};

module.exports = {
  sendEmail,
  sendBulkEmail,
  sendNewsletter,
  sendNotification,
  emailTemplates
}; 