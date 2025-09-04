const express = require('express');
const { adminAuth } = require('../middleware/auth');
const User = require('../models/User');
const Course = require('../models/Course');

const router = express.Router();

// Get all users (Admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    
    const usersWithStats = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      joinDate: user.joinDate,
      progress: user.progress,
      enrolledCourses: user.enrolledCourses,
      totalEnrollments: user.enrolledCourses.length,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    }));
    
    res.json(usersWithStats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID (Admin only)
router.get('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      joinDate: user.joinDate,
      progress: user.progress,
      enrolledCourses: user.enrolledCourses,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get admin dashboard stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEnrollments = await User.aggregate([
      { $project: { enrollmentCount: { $size: '$enrolledCourses' } } },
      { $group: { _id: null, total: { $sum: '$enrollmentCount' } } }
    ]);
    
    const recentUsers = await User.find({}, 'name email createdAt')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      totalUsers,
      totalCourses: 7,
      totalEnrollments: totalEnrollments[0]?.total || 0,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search users (Admin only)
router.get('/users/search/:query', adminAuth, async (req, res) => {
  try {
    const { query } = req.params;
    
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    }, '-password').sort({ createdAt: -1 });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;