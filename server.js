const express = require('express');
const connectDB = require('./src/configDB/db');
const authRoutes = require('./src/Routes/authRoutes');
const adminRoutes = require('./src/Routes/adminRoutes');
const categoryRoutes = require("./src/Routes/categoryRoutes");
const Product = require('./src/Routes/productRoutes');
const messageRoute = require("./src/Routes/messagesRoute");
const path = require('path');
const socket = require("socket.io");
const User = require('./src/Models/userModel');
const orderRoutes = require("./src/Routes/orderRoutes");
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json()); // To parse JSON bodies

// Remove CORS configuration
// No need to use `cors` middleware for this

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', Product);
app.use("/api/messages", messageRoute);
app.use("/api/orders", orderRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});

// chat setup
const io = socket(server, {
  // Remove CORS config from the socket as well
  cors: false, // This line is optional, default is no CORS configuration
});

global.onlineUsers = new Map();
let onlineUserIds = {};

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    onlineUserIds[userId] = true;
    io.emit("online-users", onlineUserIds);
  });

  socket.on("send-msg", async (data) => {
    const userData = await User.findById(data.from);
    const date = new Date();
    userData.lastMessage = date;
    await userData.save();
    const allUserdata = await User.find({}).sort({ lastMessage: -1 });
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message, allUserdata);
    }
  });

  socket.on("logout", (userId) => {
    onlineUserIds[userId] = false;
    io.emit("online-users", onlineUserIds);
  });
});
