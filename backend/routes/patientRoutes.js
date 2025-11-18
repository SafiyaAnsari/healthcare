const express = require('express');
const {
  getProfileForPatient,
  updateProfileForPatient,
  getGoalsSummary,
} = require('../controllers/patientController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// profile for logged in patient
router.get('/profile', protect, authorizeRoles('patient'), getProfileForPatient);
router.put('/profile', protect, authorizeRoles('patient'), updateProfileForPatient);

// placeholder goals summary
router.get('/goals', protect, authorizeRoles('patient'), getGoalsSummary);

module.exports = router;


