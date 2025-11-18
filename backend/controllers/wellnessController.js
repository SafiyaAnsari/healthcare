const WellnessData = require('../models/WellnessData');
const { handleServerError, buildOwnerFilter } = require('../utils/controllerHelpers');

function pickDailyTip() {
  const tips = [
    'Take a 5-minute stretch break every hour.',
    'Drink a glass of water when you wake up.',
    'Aim for 7-8 hours of sleep tonight.',
    'Add a serving of leafy greens to your meals.',
  ];
  return tips[new Date().getDate() % tips.length];
}

// create a new wellness record for the logged in patient
async function createWellness(req, res) {
  try {
    const steps = Number(req.body.steps) || 0;
    const sleep = Number(req.body.sleep) || 0;
    const activeMinutes = Number(req.body.activeMinutes) || 0;

    const entry = await WellnessData.create({
      user: req.user._id,
      steps,
      sleep,
      activeMinutes,
    });

    return res.status(201).json(entry);
  } catch (error) {
    return handleServerError(res, 'Create wellness', error);
  }
}

// list wellness history (patient sees own data, provider can pass userId)
async function getWellness(req, res) {
  try {
    const filter = buildOwnerFilter(req);
    const entries = await WellnessData.find(filter).sort({ createdAt: -1 });
    return res.json(entries);
  } catch (error) {
    return handleServerError(res, 'Get wellness', error);
  }
}

// edit an existing record owned by the patient
async function updateWellness(req, res) {
  try {
    const entry = await WellnessData.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({ message: 'Record not found' });
    }

    entry.steps = req.body.steps ?? entry.steps;
    entry.sleep = req.body.sleep ?? entry.sleep;
    entry.activeMinutes = req.body.activeMinutes ?? entry.activeMinutes;

    const updatedEntry = await entry.save();
    return res.json(updatedEntry);
  } catch (error) {
    return handleServerError(res, 'Update wellness', error);
  }
}

// remove a record owned by the patient
async function deleteWellness(req, res) {
  try {
    const entry = await WellnessData.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({ message: 'Record not found' });
    }

    return res.json({ message: 'Deleted' });
  } catch (error) {
    return handleServerError(res, 'Delete wellness', error);
  }
}

// return a static health tip for the day
function healthTip(_req, res) {
  return res.json({ tip: pickDailyTip() });
}

module.exports = {
  createWellness,
  getWellness,
  updateWellness,
  deleteWellness,
  healthTip,
};

