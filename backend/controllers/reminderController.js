const Reminder = require('../models/Reminder');
const { handleServerError, buildOwnerFilter } = require('../utils/controllerHelpers');

// create a new reminder for the patient
async function createReminder(req, res) {
  try {
    const { title, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const reminder = await Reminder.create({
      user: req.user._id,
      title,
      date,
    });

    return res.status(201).json(reminder);
  } catch (error) {
    return handleServerError(res, 'Create reminder', error);
  }
}

// list reminders (provider can filter by patient)
async function getReminders(req, res) {
  try {
    const filter = buildOwnerFilter(req);
    const reminders = await Reminder.find(filter).sort({ date: 1 });
    return res.json(reminders);
  } catch (error) {
    return handleServerError(res, 'Get reminders', error);
  }
}

// update fields on an existing reminder
async function updateReminder(req, res) {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    reminder.title = req.body.title ?? reminder.title;
    reminder.date = req.body.date ?? reminder.date;
    reminder.completed = req.body.completed ?? reminder.completed;

    const updatedReminder = await reminder.save();
    return res.json(updatedReminder);
  } catch (error) {
    return handleServerError(res, 'Update reminder', error);
  }
}

// delete a reminder owned by the patient
async function deleteReminder(req, res) {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    return res.json({ message: 'Deleted' });
  } catch (error) {
    return handleServerError(res, 'Delete reminder', error);
  }
}

module.exports = {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
};

