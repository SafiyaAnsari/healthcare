const Profile = require('../models/Profile');
const { handleServerError } = require('../utils/controllerHelpers');

// get or create a profile for current patient
async function getProfileForPatient(req, res) {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      profile = await Profile.create({ user: req.user._id });
    }

    return res.json(profile);
  } catch (error) {
    return handleServerError(res, 'Get patient profile', error);
  }
}

// update basic profile fields
async function updateProfileForPatient(req, res) {
  try {
    const { dateOfBirth, heightCm, weightKg, notes } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { dateOfBirth, heightCm, weightKg, notes },
      { new: true, upsert: true }
    );

    return res.json(profile);
  } catch (error) {
    return handleServerError(res, 'Update patient profile', error);
  }
}

// simple endpoint to show that profile goals could be extended
async function getGoalsSummary(_req, res) {
  return res.json({ message: 'Goals summary not implemented yet' });
}

module.exports = {
  getProfileForPatient,
  updateProfileForPatient,
  getGoalsSummary,
};


