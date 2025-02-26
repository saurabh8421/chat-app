const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');

const User = require("./models/User")
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

dotenv.config()
const PORT  = process.env.PORT || 5000;  // Ensure PORT has a fallback

const app = express();
const server = http.createServer(app); // Attach HTTP server for both Express and Socket.io
const io = socketIo(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// Attach Socket.io authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error'));
      }
      socket.user = decoded; // Attach user info to the socket
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});

// Handle WebSocket Connections
io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.user.id}`);

  // Join a private room based on user ID
  socket.join(socket.user.id);

  // Handle private messages
  socket.on('private message', (data) => {
    const message = {
      sender: socket.user.id,
      content: data.content,
      createdAt: new Date()
    };

    // Emit message to the receiver's room
    io.to(data.receiverId).emit('private message', message);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.user.id}`);
  });
});

// 🚀 Start the server with `server.listen`
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
