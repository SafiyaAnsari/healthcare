const express = require('express');
const {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
} = require('../controllers/appointmentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorizeRoles('patient'), createAppointment);
router.get('/mine', protect, authorizeRoles('patient'), getMyAppointments);
router.get('/doctor', protect, authorizeRoles('provider'), getDoctorAppointments);
router.put('/:id', protect, authorizeRoles('provider'), updateAppointmentStatus);

module.exports = router;


