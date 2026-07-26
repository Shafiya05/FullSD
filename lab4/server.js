// Load environment variables before importing modules that use them.
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow the frontend to make requests to this API during development.
app.use(cors());

// Parse JSON request bodies. This is ready for future API routes.
app.use(express.json());

// Mount all user CRUD routes under the /api/users base path.
app.use('/api/users', userRoutes);

// Basic endpoint to confirm that the server is available.
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Return a clear response for endpoints that have not been created yet.
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Central error handler for errors passed from future middleware or routes.
app.use((error, req, res, next) => {
  console.error(error.stack || error.message);
  res.status(error.statusCode || 500).json({
    message: error.message || 'Internal server error',
  });
});

// Connect to MongoDB first, then begin accepting requests.
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error.message);
    process.exit(1);
  }
};

startServer();
