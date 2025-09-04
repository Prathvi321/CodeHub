import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Users, Filter, Grid, List } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { courses } from '../data/courses';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');

  const filters = ['Beginner', 'Intermediate', 'Advanced', 'Python', 'JavaScript', 'C++', 'Web Development', 'AI/ML', 'DSA'];

  const filteredCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilters = activeFilters.length === 0 || 
                            activeFilters.some(filter => 
                              course.difficulty === filter || 
                              course.tags.includes(filter)
                            );
      
      return matchesSearch && matchesFilters;
    });

    // Sort courses
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming courses array is already in newest first order
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, activeFilters, sortBy]);

  const handleSearch = (query, filters) => {
    setSearchQuery(query);
    setActiveFilters(filters);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const CourseCard = ({ course, isListView = false }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`card hover:shadow-xl transition-all duration-300 ${
        isListView ? 'flex flex-col md:flex-row md:items-center' : ''
      }`}
    >
      <div className={isListView ? 'md:flex-1' : ''}>
        <div className="flex items-center justify-between mb-4">
          <span className="bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-cream-200 px-3 py-1 rounded-full text-sm font-medium">
            {course.difficulty}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className="text-dark-600 dark:text-cream-300 text-sm">
              {course.rating}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-dark-900 dark:text-cream-50 mb-2">
          {course.title}
        </h3>
        <p className="text-dark-600 dark:text-cream-300 mb-4">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mb-4 text-sm text-dark-500 dark:text-cream-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
          </div>
          <span className="font-semibold text-dark-700 dark:text-cream-200">
            ${course.price}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-cream-100 dark:bg-dark-800 text-dark-600 dark:text-cream-300 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-dark-600 dark:text-cream-300 text-sm">
            By {course.instructor}
          </span>
          <Link
            to={`/course/${course.id}`}
            className="btn-primary"
          >
            View Course
          </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-dark-900 dark:text-cream-50 mb-4">
            All Courses
          </h1>
          <p className="text-xl text-dark-600 dark:text-cream-300 max-w-2xl mx-auto">
            Discover our comprehensive collection of programming courses designed to take your skills to the next level.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <SearchBar
            placeholder="Search courses by name, difficulty, or tags..."
            onSearch={handleSearch}
            filters={filters}
            className="mb-6"
          />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-auto"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              
              <span className="text-dark-600 dark:text-cream-300 text-sm">
                {filteredCourses.length} courses found
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-dark-100 dark:bg-dark-700 text-dark-900 dark:text-cream-50'
                    : 'text-dark-600 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-dark-800'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-dark-100 dark:bg-dark-700 text-dark-900 dark:text-cream-50'
                    : 'text-dark-600 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-dark-800'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === 'grid'
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }
        >
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isListView={viewMode === 'list'}
            />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-dark-900 dark:text-cream-50 mb-2">
              No courses found
            </h3>
            <p className="text-dark-600 dark:text-cream-300 mb-6">
              Try adjusting your search criteria or filters to find more courses.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilters([]);
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;