const express = require('express');
const {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
} = require('../controllers/reminderController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// reminder list and create
router
  .route('/')
  .get(protect, getReminders)
  .post(protect, authorizeRoles('patient'), createReminder);

// reminder update and delete
router
  .route('/:id')
  .put(protect, authorizeRoles('patient'), updateReminder)
  .delete(protect, authorizeRoles('patient'), deleteReminder);

module.exports = router;

