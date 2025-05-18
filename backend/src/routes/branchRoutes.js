const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

// Restrict branch management to admin and manager roles
router.use(restrictTo('admin', 'manager'));

// Branch routes
router
  .route('/')
  .get(branchController.getAllBranches)
  .post(branchController.createBranch);

router
  .route('/:id')
  .get(branchController.getBranch)
  .patch(branchController.updateBranch)
  .delete(branchController.deleteBranch);

// Branch statistics
router.get('/:id/stats', branchController.getBranchStats);

module.exports = router; 