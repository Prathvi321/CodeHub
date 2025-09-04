const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  duration: String,
  tags: [String],
  instructor: String,
  rating: { type: Number, default: 0 },
  students: { type: Number, default: 0 },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);