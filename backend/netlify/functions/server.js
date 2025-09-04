const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('../../routes/auth');
const userRoutes = require('../../routes/users');
const courseRoutes = require('../../routes/courses');
const adminRoutes = require('../../routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CodeHub API is running on Netlify' });
});

module.exports.handler = serverless(app);