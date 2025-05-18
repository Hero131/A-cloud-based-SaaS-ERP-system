const express = require('express');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  res.json({
    success: true,
    users: [
      { id: 1, email: 'user1@example.com', name: 'User One' },
      { id: 2, email: 'user2@example.com', name: 'User Two' }
    ]
  });
});

// Get user by ID
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.params.id,
      email: 'user@example.com',
      name: 'Example User'
    }
  });
});

// Create user
router.post('/', (req, res) => {
  const { email, name } = req.body;
  res.json({
    success: true,
    message: 'User created successfully',
    user: { email, name }
  });
});

// Update user
router.put('/:id', (req, res) => {
  const { email, name } = req.body;
  res.json({
    success: true,
    message: 'User updated successfully',
    user: { id: req.params.id, email, name }
  });
});

// Delete user
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

module.exports = router; 