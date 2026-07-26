const mongoose = require('mongoose');
const User = require('../models/User');

// Copy only fields that belong to the User model from an incoming request.
const getUserData = (body) => ({
  username: body.username,
  email: body.email,
  password: body.password,
  registrationDate: body.registrationDate,
  ecosystemRole: body.ecosystemRole,
  documentName: body.documentName,
});

// Converts common Mongoose errors into consistent client responses.
const sendDatabaseError = (error, res) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: 'A user with this email already exists' });
  }

  return res.status(500).json({ message: 'Internal server error' });
};

// POST /api/users - create a new user.
const createUser = async (req, res) => {
  try {
    const user = await User.create(getUserData(req.body));
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Create user error:', error.message);
    return sendDatabaseError(error, res);
  }
};

// GET /api/users - return all users.
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ count: users.length, users });
  } catch (error) {
    console.error('Get users error:', error.message);
    return sendDatabaseError(error, res);
  }
};

// GET /api/users/:id - return one user by its MongoDB id.
const getUserById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Get user error:', error.message);
    return sendDatabaseError(error, res);
  }
};

// PUT /api/users/:id - update a user and return the updated document.
const updateUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, getUserData(req.body), {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Update user error:', error.message);
    return sendDatabaseError(error, res);
  }
};

// DELETE /api/users/:id - delete a user by id.
const deleteUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error.message);
    return sendDatabaseError(error, res);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
