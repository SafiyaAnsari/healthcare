const mongoose = require('mongoose');

// basic profile info for patients
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
    },
    heightCm: {
      type: Number,
    },
    weightKg: {
      type: Number,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);


