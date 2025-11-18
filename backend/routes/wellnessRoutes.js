const express = require('express');
const {
  createWellness,
  getWellness,
  updateWellness,
  deleteWellness,
  healthTip,
} = require('../controllers/wellnessController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// patient wellness records
router
  .route('/')
  .get(protect, getWellness)
  .post(protect, authorizeRoles('patient'), createWellness);

// daily tip endpoint
router.get('/tip/today', protect, healthTip);

// edits and deletes for wellness data
router
  .route('/:id')
  .put(protect, authorizeRoles('patient'), updateWellness)
  .delete(protect, authorizeRoles('patient'), deleteWellness);

module.exports = router;

