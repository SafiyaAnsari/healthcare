const User = require('../models/User');
const Goal = require('../models/Goal');
const Profile = require('../models/Profile');
const { handleServerError } = require('../utils/controllerHelpers');

// list all patients for provider
async function listPatients(_req, res) {
  try {
    const patients = await User.find({ role: 'patient' }).select('-password');
    return res.json(patients);
  } catch (error) {
    return handleServerError(res, 'List patients', error);
  }
}

// fetch a single patient profile
async function getPatientDetails(req, res) {
  try {
    const patient = await User.findOne({ _id: req.params.id, role: 'patient' }).select(
      '-password'
    );

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const profile = await Profile.findOne({ user: patient._id });
    const goals = await Goal.find({ user: patient._id }).sort({ date: -1 });

    return res.json({ patient, profile, goals });
  } catch (error) {
    return handleServerError(res, 'Get patient details', error);
  }
}

// provider evaluates a goal (wraps goalController evaluate but keeps provider route clear)
async function evaluateGoalForPatient(req, res) {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    goal.providerEvaluation = req.body.providerEvaluation || 'review';
    const updatedGoal = await goal.save();
    return res.json(updatedGoal);
  } catch (error) {
    return handleServerError(res, 'Provider evaluate goal', error);
  }
}

module.exports = {
  listPatients,
  getPatientDetails,
  evaluateGoalForPatient,
};


