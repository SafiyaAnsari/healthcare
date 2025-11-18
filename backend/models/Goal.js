const mongoose = require('mongoose');

// track daily goals for steps, sleep and water
const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    steps: {
      type: Number,
      default: 0,
    },
    sleepHours: {
      type: Number,
      default: 0,
    },
    waterLiters: {
      type: Number,
      default: 0,
    },
    providerEvaluation: {
      type: String,
      enum: ['ok', 'review', 'concern', 'none'],
      default: 'none',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);


