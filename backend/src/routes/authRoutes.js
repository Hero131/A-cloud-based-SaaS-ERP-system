const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  res.json({
    success: true,
    message: 'Login successful',
    user: { email }
  });
});

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  res.json({
    success: true,
    message: 'Registration successful',
    user: { email }
  });
});

router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router; 
