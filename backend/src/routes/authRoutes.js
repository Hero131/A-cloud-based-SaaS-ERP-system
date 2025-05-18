const express = require('express');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // For demo purposes, just return success
  res.json({
    success: true,
    message: 'Login successful',
    user: { email }
  });
});

// Register route
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  // For demo purposes, just return success
  res.json({
    success: true,
    message: 'Registration successful',
    user: { email }
  });
});

// Logout route
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router; 