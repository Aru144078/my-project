// Experiment-20/backend/server.js

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const PORT = 5000;

// Setup CORS for Socket.io and Express
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // Allow connection from your React development server
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// --- Socket.io Connection Handling ---
io.on('connection', (socket) => {
  console.log(`✅ User Connected: ${socket.id}`);

  // Handle incoming messages from a client
  socket.on('sendMessage', (data) => {
    // Log the received message
    console.log(`[${data.user}] sent: ${data.message}`);

    // Broadcast the message to ALL connected clients (including the sender)
    io.emit('receiveMessage', data);
  });

  // Handle a user disconnecting
  socket.on('disconnect', () => {
    console.log(`❌ User Disconnected: ${socket.id}`);
  });
});

// Start the server (listening on the HTTP server)
server.listen(PORT, () => {
  console.log(`🔥 Socket.io Server running on http://localhost:${PORT}`);
});