import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  BookOpen,
  Trophy,
  Clock,
  Target,
  TrendingUp,
  Award,
  Calendar,
  Play,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for charts
  const weeklyProgress = [
    { day: 'Mon', lessons: 3 },
    { day: 'Tue', lessons: 5 },
    { day: 'Wed', lessons: 2 },
    { day: 'Thu', lessons: 7 },
    { day: 'Fri', lessons: 4 },
    { day: 'Sat', lessons: 6 },
    { day: 'Sun', lessons: 3 },
  ];

  const courseProgress = [
    { name: 'DSA in Python', progress: 75, color: '#3B82F6' },
    { name: 'Web Development', progress: 45, color: '#10B981' },
    { name: 'AI/ML Course', progress: 20, color: '#F59E0B' },
  ];

  const skillDistribution = [
    { name: 'Python', value: 40, color: '#3776AB' },
    { name: 'JavaScript', value: 30, color: '#F7DF1E' },
    { name: 'React', value: 20, color: '#61DAFB' },
    { name: 'Other', value: 10, color: '#8B5CF6' },
  ];

  const stats = [
    {
      title: 'Courses Enrolled',
      value: user?.enrolledCourses?.length || 0,
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      title: 'Lessons Completed',
      value: `${user?.progress?.completedLessons || 0}/${user?.progress?.totalLessons || 0}`,
      icon: Target,
      color: 'bg-green-500',
    },
    {
      title: 'Certificates Earned',
      value: user?.progress?.certificates || 0,
      icon: Award,
      color: 'bg-yellow-500',
    },
    {
      title: 'Current Streak',
      value: `${user?.progress?.streak || 0} days`,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  const recentCourses = courses.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-dark-900 dark:text-cream-50 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-dark-600 dark:text-cream-300">
            Continue your learning journey and track your progress.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="card"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-dark-600 dark:text-cream-300 text-sm">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-dark-900 dark:text-cream-50">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Progress Chart */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="card"
            >
              <h3 className="text-xl font-semibold text-dark-900 dark:text-cream-50 mb-4">
                Weekly Learning Progress
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="lessons" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Course Progress */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="card"
            >
              <h3 className="text-xl font-semibold text-dark-900 dark:text-cream-50 mb-6">
                Course Progress
              </h3>
              <div className="space-y-4">
                {courseProgress.map((course, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-dark-700 dark:text-cream-200 font-medium">
                        {course.name}
                      </span>
                      <span className="text-dark-600 dark:text-cream-300 text-sm">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-cream-200 dark:bg-dark-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: course.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skill Distribution */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="card"
            >
              <h3 className="text-xl font-semibold text-dark-900 dark:text-cream-50 mb-4">
                Skill Distribution
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {skillDistribution.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="text-sm text-dark-600 dark:text-cream-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Courses */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="card"
            >
              <h3 className="text-xl font-semibold text-dark-900 dark:text-cream-50 mb-4">
                Continue Learning
              </h3>
              <div className="space-y-3">
                {recentCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className="block p-3 bg-cream-50 dark:bg-dark-800 rounded-lg hover:bg-cream-100 dark:hover:bg-dark-700 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-dark-900 dark:text-cream-50 text-sm">
                          {course.title}
                        </h4>
                        <p className="text-dark-600 dark:text-cream-300 text-xs">
                          {course.difficulty} • {course.duration}
                        </p>
                      </div>
                      <Play className="text-dark-400 dark:text-cream-400" size={16} />
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/courses"
                className="block text-center mt-4 text-dark-700 dark:text-cream-300 hover:text-dark-900 dark:hover:text-cream-50 transition-colors duration-200"
              >
                View All Courses →
              </Link>
            </motion.div>

            {/* Achievements */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="card"
            >
              <h3 className="text-xl font-semibold text-dark-900 dark:text-cream-50 mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <Trophy className="text-yellow-500 mr-3" size={20} />
                  <div>
                    <p className="text-dark-900 dark:text-cream-50 text-sm font-medium">
                      First Course Completed
                    </p>
                    <p className="text-dark-600 dark:text-cream-300 text-xs">
                      Completed DSA in Python
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Calendar className="text-blue-500 mr-3" size={20} />
                  <div>
                    <p className="text-dark-900 dark:text-cream-50 text-sm font-medium">
                      7-Day Streak
                    </p>
                    <p className="text-dark-600 dark:text-cream-300 text-xs">
                      Keep up the momentum!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;