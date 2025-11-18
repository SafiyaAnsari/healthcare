const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { handleServerError } = require('../utils/controllerHelpers');

// patient creates appointment with doctor
async function createAppointment(req, res) {
  try {
    const { doctor, dateTime, reason } = req.body;

    if (!doctor || !dateTime) {
      return res.status(400).json({ message: 'Doctor and dateTime are required' });
    }

    const doctorUser = await User.findOne({ _id: doctor, role: 'provider' });
    if (!doctorUser) {
      return res.status(400).json({ message: 'Doctor not found' });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      dateTime,
      reason,
    });

    return res.status(201).json(appointment);
  } catch (error) {
    return handleServerError(res, 'Create appointment', error);
  }
}

async function getMyAppointments(req, res) {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate('doctor', 'name email')
      .sort({ dateTime: 1 });
    return res.json(appointments);
  } catch (error) {
    return handleServerError(res, 'List patient appointments', error);
  }
}

async function getDoctorAppointments(req, res) {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id })
      .populate('patient', 'name email')
      .sort({ dateTime: 1 });
    return res.json(appointments);
  } catch (error) {
    return handleServerError(res, 'List doctor appointments', error);
  }
}

async function updateAppointmentStatus(req, res) {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      doctor: req.user._id,
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status || appointment.status;
    const updated = await appointment.save();
    return res.json(updated);
  } catch (error) {
    return handleServerError(res, 'Update appointment', error);
  }
}

module.exports = {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
};


