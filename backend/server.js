const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

// Pass Socket.io instance to routes via Express app
app.set('io', io);

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
    console.warn('[Database] You do NOT need MongoDB running to test all features.\n');
  });

// Socket.io Real-Time Synchronization Engine
io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  // Join shared room for instant partner & co-op syncing
  socket.join('streak_lobby');

  // When a player performs an action, trigger real-time tether shockwave for all connected clients
  socket.on('tether_pulse', (data) => {
    socket.to('streak_lobby').emit('tether_pulse', data);
  });

  // When a player strikes the raid boss
  socket.on('boss_strike', (data) => {
    io.to('streak_lobby').emit('boss_damaged', data);
  });

  // When a player sends a high-five or cheer
  socket.on('partner_high_five', (data) => {
    socket.to('streak_lobby').emit('partner_high_five', data);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// Setup API Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Fallback to static index.html for undefined routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start Server with Socket.io enabled
server.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 XP & Streak Card Engine (v2.0) running on port: ${PORT}`);
  console.log(`⚡ Real-Time Socket.io Enabled & Active`);
  console.log(`🔗 Local Access: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
