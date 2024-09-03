const express = require('express');
const connectDB = require('./src/configDB/db');
const authRoutes = require('./src/Routes/authRoutes');
const adminRoutes = require('./src/Routes/adminRoutes');
const categoryRoutes = require("./src/Routes/categoryRoutes");
const Product=require('./src/Routes/productRoutes')
const path = require('path');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json()); // To parse JSON bodies

// const corsOrigin = process.env.CORS_ORIGIN ;
const corsOrigin =  'http://localhost:5173'; // Fallback to localhost in development

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', corsOrigin);
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
  
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', Product);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
