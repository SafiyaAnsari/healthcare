const express = require('express');
const {
  listPatients,
  getPatientDetails,
  evaluateGoalForPatient,
} = require('../controllers/providerController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// provider views
router.get('/patients', protect, authorizeRoles('provider'), listPatients);
router.get('/patient/:id', protect, authorizeRoles('provider'), getPatientDetails);
router.post('/goal/:id/evaluate', protect, authorizeRoles('provider'), evaluateGoalForPatient);

module.exports = router;


