const Goal = require('../models/Goal');
const { handleServerError, buildOwnerFilter } = require('../utils/controllerHelpers');

// create a daily goal for the patient
async function createGoal(req, res) {
  try {
    const userId = req.user._id;
    const date = req.body.date ? new Date(req.body.date) : new Date();

    const goal = await Goal.create({
      user: userId,
      date,
      steps: req.body.steps || 0,
      sleepHours: req.body.sleepHours || 0,
      waterLiters: req.body.waterLiters || 0,
    });

    return res.status(201).json(goal);
  } catch (error) {
    return handleServerError(res, 'Create goal', error);
  }
}

// fetch a goal by id (patient or provider with filter)
async function getGoalById(req, res) {
  try {
    const filter = buildOwnerFilter(req);
    filter._id = req.params.id;

    const goal = await Goal.findOne(filter);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    return res.json(goal);
  } catch (error) {
    return handleServerError(res, 'Get goal', error);
  }
}

// update goal fields as the patient
async function updateGoal(req, res) {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    goal.steps = req.body.steps ?? goal.steps;
    goal.sleepHours = req.body.sleepHours ?? goal.sleepHours;
    goal.waterLiters = req.body.waterLiters ?? goal.waterLiters;

    const updatedGoal = await goal.save();
    return res.json(updatedGoal);
  } catch (error) {
    return handleServerError(res, 'Update goal', error);
  }
}

// delete goal as the patient
async function deleteGoal(req, res) {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    return res.json({ message: 'Deleted' });
  } catch (error) {
    return handleServerError(res, 'Delete goal', error);
  }
}

// provider updates the evaluation
async function evaluateGoal(req, res) {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    goal.providerEvaluation = req.body.providerEvaluation || 'review';
    const updatedGoal = await goal.save();
    return res.json(updatedGoal);
  } catch (error) {
    return handleServerError(res, 'Evaluate goal', error);
  }
}

module.exports = {
  createGoal,
  getGoalById,
  updateGoal,
  deleteGoal,
  evaluateGoal,
};


