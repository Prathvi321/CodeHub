import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Star, 
  ArrowRight, 
  Code, 
  Database, 
  Cloud,
  Network
} from 'lucide-react';
import { courses, topics } from '../data/courses';

const Home = () => {
  const featuredCourses = courses.slice(0, 3);
  const stats = [
    { label: 'Active Students', value: '12,450+', icon: Users },
    { label: 'Courses Available', value: '7', icon: BookOpen },
    { label: 'Certificates Issued', value: '8,920+', icon: Trophy },
    { label: 'Average Rating', value: '4.8/5', icon: Star },
  ];

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cream-100 via-white to-cream-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-dark-900 dark:text-cream-50 mb-6">
              Learn to <span className="text-transparent bg-clip-text bg-gradient-to-r from-dark-600 to-dark-900 dark:from-cream-400 dark:to-cream-600">Code</span>
            </h1>
            <p className="text-xl md:text-2xl text-dark-600 dark:text-cream-300 mb-8 max-w-3xl mx-auto">
              Master programming languages, explore technical topics, and build your career with CodeHub's comprehensive learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses" className="btn-primary text-lg px-8 py-4">
                Start Learning
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/topics" className="btn-secondary text-lg px-8 py-4">
                Explore Topics
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-dark-100 to-dark-200 dark:from-dark-700 dark:to-dark-600 rounded-full mb-4">
                    <Icon className="text-dark-700 dark:text-cream-200" size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-dark-900 dark:text-cream-50 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-dark-600 dark:text-cream-300">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-cream-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-dark-900 dark:text-cream-50 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-dark-600 dark:text-cream-300">
              Start your learning journey with our most popular courses
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {featuredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="card hover:shadow-xl transition-all duration-300"
              >
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
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-dark-500 dark:text-cream-400 text-sm">
                    {course.students.toLocaleString()} students
                  </span>
                  <span className="text-dark-500 dark:text-cream-400 text-sm">
                    {course.duration}
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
                
                <Link
                  to={`/course/${course.id}`}
                  className="btn-primary w-full text-center"
                >
                  Start Course
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/courses" className="btn-secondary">
              View All Courses
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-dark-900 dark:text-cream-50 mb-4">
              Explore Topics
            </h2>
            <p className="text-xl text-dark-600 dark:text-cream-300">
              Dive deep into various programming languages and technical concepts
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {topics.slice(0, 4).map((topic) => (
              <motion.div
                key={topic.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="card text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-lg font-semibold text-dark-900 dark:text-cream-50 mb-2">
                  {topic.title}
                </h3>
                <p className="text-dark-600 dark:text-cream-300 text-sm mb-4">
                  {topic.description}
                </p>
                <div className="text-xs text-dark-500 dark:text-cream-400">
                  {topic.subtopics.length} subtopics
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/topics" className="btn-secondary">
              Explore All Topics
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark-900 to-dark-700 dark:from-cream-600 dark:to-cream-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-cream-50 dark:text-dark-900 mb-4">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-xl text-cream-200 dark:text-dark-700 mb-8">
              Join thousands of students who are already learning and building amazing projects.
            </p>
            <Link
              to="/register"
              className="bg-cream-50 dark:bg-dark-900 text-dark-900 dark:text-cream-50 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cream-100 dark:hover:bg-dark-800 transition-colors duration-200 inline-flex items-center"
            >
              Get Started for Free
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;