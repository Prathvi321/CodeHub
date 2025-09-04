const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      joinDate: req.user.joinDate,
      progress: req.user.progress,
      enrolledCourses: req.user.enrolledCourses
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, bio } = req.body;
    
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (bio) user.bio = bio;
    
    await user.save();
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      joinDate: user.joinDate,
      progress: user.progress,
      enrolledCourses: user.enrolledCourses
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in course
router.post('/enroll/:courseId', auth, async (req, res) => {
  try {
    // Return server error for now
    res.status(503).json({ 
      message: 'Course enrollment is temporarily unavailable',
      details: 'We are working on adding course content and payment processing'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;