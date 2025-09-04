const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = [
      {
        id: 'dsa-python',
        title: 'DSA in Python',
        description: 'Master Data Structures and Algorithms using Python',
        difficulty: 'Intermediate',
        duration: '8 weeks',
        tags: ['Python', 'DSA', 'Algorithms'],
        instructor: 'Dr. Sarah Johnson',
        rating: 4.8,
        students: 15420,
        price: 99,
        isActive: false
      },
      {
        id: 'dsa-javascript',
        title: 'DSA in JavaScript',
        description: 'Learn Data Structures and Algorithms with JavaScript',
        difficulty: 'Intermediate',
        duration: '7 weeks',
        tags: ['JavaScript', 'DSA', 'Web Development'],
        instructor: 'Mike Chen',
        rating: 4.7,
        students: 12350,
        price: 89,
        isActive: false
      },
      {
        id: 'web-development',
        title: 'Web Development',
        description: 'Complete web development course from basics to advanced',
        difficulty: 'Beginner',
        duration: '12 weeks',
        tags: ['HTML', 'CSS', 'JavaScript', 'React'],
        instructor: 'Emma Wilson',
        rating: 4.9,
        students: 25680,
        price: 129,
        isActive: false
      },
      {
        id: 'cpp-game-dev',
        title: 'C++ for Game Development',
        description: 'Build games using C++ and popular game engines',
        difficulty: 'Advanced',
        duration: '10 weeks',
        tags: ['C++', 'Game Development', 'Graphics'],
        instructor: 'Alex Rodriguez',
        rating: 4.6,
        students: 8920,
        price: 149,
        isActive: false
      },
      {
        id: 'python-libraries',
        title: 'Popular Python Libraries',
        description: 'Explore essential Python libraries for various applications',
        difficulty: 'Intermediate',
        duration: '6 weeks',
        tags: ['Python', 'Libraries', 'NumPy', 'Pandas'],
        instructor: 'Dr. Lisa Park',
        rating: 4.8,
        students: 18750,
        price: 79,
        isActive: false
      },
      {
        id: 'data-science-python',
        title: 'Data Science with Python',
        description: 'Complete data science workflow using Python',
        difficulty: 'Intermediate',
        duration: '14 weeks',
        tags: ['Python', 'Data Science', 'Pandas', 'Matplotlib'],
        instructor: 'Dr. Robert Kim',
        rating: 4.9,
        students: 22100,
        price: 159,
        isActive: false
      },
      {
        id: 'ai-ml-course',
        title: 'AI/ML Course',
        description: 'Introduction to Artificial Intelligence and Machine Learning',
        difficulty: 'Advanced',
        duration: '16 weeks',
        tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow'],
        instructor: 'Dr. Maria Garcia',
        rating: 4.7,
        students: 14200,
        price: 199,
        isActive: false
      }
    ];
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    // Return course not available for now
    res.status(503).json({ 
      message: 'Course content is temporarily unavailable',
      details: 'Course content will be available soon'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;