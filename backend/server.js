const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/xp_streak_card_system';
console.log(`[Database] Attempting connection to MongoDB: ${mongoURI}`);

mongoose.connect(mongoURI)
  .then(() => {
    console.log('[Database] MongoDB connected successfully.');
  })
  .catch((err) => {
    console.warn('\n[Database] WARNING: MongoDB connection failed!');
    console.warn(`Error detail: ${err.message}`);
    console.warn('[Database] The server will run in standard in-memory fallback mode.');
    console.warn('[Database] You do NOT need MongoDB running to test the frontend and backend features.\n');
  });

// Setup API Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Fallback to static index.html for undefined routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 XP & Streak Card Engine running on port: ${PORT}`);
  console.log(`🔗 Local Access: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
