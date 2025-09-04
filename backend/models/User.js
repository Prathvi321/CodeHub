const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  progress: {
    coursesEnrolled: { type: Number, default: 0 },
    coursesCompleted: { type: Number, default: 0 },
    totalLessons: { type: Number, default: 0 },
    completedLessons: { type: Number, default: 0 },
    certificates: { type: Number, default: 0 },
    streak: { type: Number, default: 0 }
  },
  enrolledCourses: [{
    courseId: String,
    enrolledAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    completedLessons: [String]
  }],
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);