const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

let io = null;

const setupSocketIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com', 'https://www.yourdomain.com']
        : ['http://localhost:3000', 'http://localhost:3001'],
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling']
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization;
      
      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      socket.userRole = decoded.role;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.userId}`);

    // Join user to their personal room
    socket.join(`user:${socket.userId}`);

    // Join user to role-based rooms
    if (socket.userRole === 'mentor') {
      socket.join('mentors');
    }
    if (socket.userRole === 'student') {
      socket.join('students');
    }

    // Handle live session joins
    socket.on('join-session', (sessionId) => {
      socket.join(`session:${sessionId}`);
      socket.to(`session:${sessionId}`).emit('user-joined-session', {
        userId: socket.userId,
        timestamp: new Date()
      });
    });

    // Handle live session leaves
    socket.on('leave-session', (sessionId) => {
      socket.leave(`session:${sessionId}`);
      socket.to(`session:${sessionId}`).emit('user-left-session', {
        userId: socket.userId,
        timestamp: new Date()
      });
    });

    // Handle chat messages
    socket.on('send-message', (data) => {
      const { sessionId, message, type = 'text' } = data;
      
      socket.to(`session:${sessionId}`).emit('new-message', {
        userId: socket.userId,
        message,
        type,
        timestamp: new Date()
      });
    });

    // Handle typing indicators
    socket.on('typing', (data) => {
      const { sessionId, isTyping } = data;
      
      socket.to(`session:${sessionId}`).emit('user-typing', {
        userId: socket.userId,
        isTyping,
        timestamp: new Date()
      });
    });

    // Handle screen sharing
    socket.on('screen-share-start', (sessionId) => {
      socket.to(`session:${sessionId}`).emit('screen-share-started', {
        userId: socket.userId,
        timestamp: new Date()
      });
    });

    socket.on('screen-share-stop', (sessionId) => {
      socket.to(`session:${sessionId}`).emit('screen-share-stopped', {
        userId: socket.userId,
        timestamp: new Date()
      });
    });

    // Handle video/audio controls
    socket.on('toggle-video', (sessionId) => {
      socket.to(`session:${sessionId}`).emit('video-toggled', {
        userId: socket.userId,
        timestamp: new Date()
      });
    });

    socket.on('toggle-audio', (sessionId) => {
      socket.to(`session:${sessionId}`).emit('audio-toggled', {
        userId: socket.userId,
        timestamp: new Date()
      });
    });

    // Handle whiteboard collaboration
    socket.on('whiteboard-draw', (data) => {
      const { sessionId, drawingData } = data;
      
      socket.to(`session:${sessionId}`).emit('whiteboard-updated', {
        userId: socket.userId,
        drawingData,
        timestamp: new Date()
      });
    });

    // Handle file sharing
    socket.on('share-file', (data) => {
      const { sessionId, fileData } = data;
      
      socket.to(`session:${sessionId}`).emit('file-shared', {
        userId: socket.userId,
        fileData,
        timestamp: new Date()
      });
    });

    // Handle notifications
    socket.on('mark-notification-read', (notificationId) => {
      // Update notification status in database
      // This would typically involve a database call
      console.log(`Notification ${notificationId} marked as read by ${socket.userId}`);
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log(`🔌 User disconnected: ${socket.userId} - Reason: ${reason}`);
      
      // Notify all sessions the user was in
      socket.rooms.forEach((room) => {
        if (room.startsWith('session:')) {
          socket.to(room).emit('user-disconnected', {
            userId: socket.userId,
            timestamp: new Date()
          });
        }
      });
    });
  });

  console.log('✅ Socket.IO setup complete');
};

// Utility functions for emitting events from other parts of the application
const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(`user:${userId}`).emit(event, data);
  }
};

const emitToSession = (sessionId, event, data) => {
  if (io) {
    io.to(`session:${sessionId}`).emit(event, data);
  }
};

const emitToRole = (role, event, data) => {
  if (io) {
    io.to(role + 's').emit(event, data);
  }
};

const emitToAll = (event, data) => {
  if (io) {
    io.emit(event, data);
  }
};

module.exports = {
  setupSocketIO,
  emitToUser,
  emitToSession,
  emitToRole,
  emitToAll
}; 