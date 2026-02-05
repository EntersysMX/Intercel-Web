/**
 * Intercel API Server
 * Main entry point for the backend API
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');

// Import routes
const authRoutes = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');
const plansRoutes = require('./routes/plans');
const configRoutes = require('./routes/config');
const publicRoutes = require('./routes/public');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://intercel.entersys.mx',
    'https://admin.intercel.entersys.mx',
  ],
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json());

// Make prisma available in routes
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Public API routes (no auth required)
app.use('/api/public', publicRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

// Protected API routes (auth required)
app.use('/api/categories', categoriesRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/config', configRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Intercel API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
