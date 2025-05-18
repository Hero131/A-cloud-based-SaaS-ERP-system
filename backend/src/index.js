require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const limiter = require('./middleware/rateLimiter');
const securityMiddleware = require('./middleware/security');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(...securityMiddleware);

// Rate limiting
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Database connection and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');
    
    // Sync database models
    await sequelize.sync({ 
      alter: process.env.NODE_ENV === 'development',
      logging: (msg) => logger.debug(msg)
    });
    logger.info('Database models synchronized.');

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('Unable to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

startServer(); 