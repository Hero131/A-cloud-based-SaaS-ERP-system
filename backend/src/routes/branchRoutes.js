const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.use(protect);

router.use(restrictTo('admin', 'manager'));

router
  .route('/')
  .get(branchController.getAllBranches)
  .post(branchController.createBranch);

router
  .route('/:id')
  .get(branchController.getBranch)
  .patch(branchController.updateBranch)
  .delete(branchController.deleteBranch);

router.get('/:id/stats', branchController.getBranchStats);

module.exports = router; 
