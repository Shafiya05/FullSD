const mongoose = require('mongoose');

// Defines the registration data saved for each EV ecosystem user.
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    registrationDate: {
      type: String,
      required: [true, 'Registration date is required'],
    },
    ecosystemRole: {
      type: String,
      required: [true, 'Ecosystem role is required'],
      trim: true,
    },
    documentName: {
      type: String,
      required: [true, 'Supporting document name is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
