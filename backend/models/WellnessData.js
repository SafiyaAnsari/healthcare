const mongoose = require('mongoose');

// capture simple wellness metrics per user
const wellnessSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    steps: {
      type: Number,
      default: 0,
    },
    sleep: {
      type: Number,
      default: 0,
    },
    activeMinutes: {
      type: Number,
      default: 0,
    },
    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WellnessData', wellnessSchema);

