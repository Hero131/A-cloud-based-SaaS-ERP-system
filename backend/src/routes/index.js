const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const branchRoutes = require('./branchRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/branches', branchRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router; 
