const express = require('express');
const {
  createGoal,
  getGoalById,
  updateGoal,
  deleteGoal,
  evaluateGoal,
} = require('../controllers/goalController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// patients create and manage their own goals
router.post('/', protect, authorizeRoles('patient'), createGoal);
router.get('/:id', protect, getGoalById);
router.put('/:id', protect, authorizeRoles('patient'), updateGoal);
router.delete('/:id', protect, authorizeRoles('patient'), deleteGoal);

// provider evaluation endpoint
router.post('/:id/evaluate', protect, authorizeRoles('provider'), evaluateGoal);

module.exports = router;


