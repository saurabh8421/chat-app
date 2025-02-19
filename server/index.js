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
const PORT  = process.env.PORT

const app = express()



const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' } // Adjust CORS as needed for your frontend
});


io.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return next(new Error('Authentication error'));
        }
        socket.user = decoded; // Attach the decoded token to the socket object
        next();
      });
    } else {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.id}`);
  
    // Join a room based on user id so you can target private messages
    socket.join(socket.user.id);
  
    // Listen for private messages
    socket.on('private message', (data) => {
      // Expected data: { receiverId, content }
      const message = {
        sender: socket.user.id,
        content: data.content,
        createdAt: new Date()
      };
  
      // Emit message to the specific receiver's room
      io.to(data.receiverId).emit('private message', message);
    });
  
    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.id}`);
    });
  });




app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes);
app.use('/chat',chatRoutes)

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("DB Connected"))


app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})