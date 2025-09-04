import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  BookOpen, 
  Trophy, 
  Target,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProgress } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || 'Passionate learner exploring the world of programming.',
  });

  const achievements = [
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Completed your first course on CodeHub',
      icon: '🎓',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: '7-Day Streak',
      description: 'Maintained a 7-day learning streak',
      icon: '🔥',
      earned: true,
      date: '2024-01-20'
    },
    {
      id: 3,
      title: 'Python Master',
      description: 'Completed all Python courses',
      icon: '🐍',
      earned: false,
      date: null
    },
    {
      id: 4,
      title: 'Quiz Champion',
      description: 'Scored 100% on 10 quizzes',
      icon: '🏆',
      earned: false,
      date: null
    },
    {
      id: 5,
      title: 'Code Warrior',
      description: 'Completed 100 coding exercises',
      icon: '⚔️',
      earned: false,
      date: null
    },
    {
      id: 6,
      title: 'Community Helper',
      description: 'Helped 50 fellow learners',
      icon: '🤝',
      earned: false,
      date: null
    }
  ];

  const enrolledCourses = [
    {
      id: 'dsa-python',
      title: 'DSA in Python',
      progress: 75,
      lastAccessed: '2024-01-22',
      status: 'In Progress'
    },
    {
      id: 'web-development',
      title: 'Web Development',
      progress: 45,
      lastAccessed: '2024-01-21',
      status: 'In Progress'
    },
    {
      id: 'ai-ml-course',
      title: 'AI/ML Course',
      progress: 100,
      lastAccessed: '2024-01-15',
      status: 'Completed'
    }
  ];

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    }, 500);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || 'Passionate learner exploring the world of programming.',
    });
    setIsEditing(false);
  };

  const stats = [
    {
      label: 'Courses Enrolled',
      value: user?.progress?.coursesEnrolled || 3,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      label: 'Courses Completed',
      value: user?.progress?.coursesCompleted || 1,
      icon: Trophy,
      color: 'bg-green-500'
    },
    {
      label: 'Current Streak',
      value: `${user?.progress?.streak || 7} days`,
      icon: Target,
      color: 'bg-orange-500'
    },
    {
      label: 'Certificates',
      value: user?.progress?.certificates || 1,
      icon: Award,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="w-24 h-24 bg-gradient-to-br from-dark-600 to-dark-800 dark:from-cream-400 dark:to-cream-600 rounded-full flex items-center justify-center">
                <User className="text-cream-50 dark:text-dark-900" size={40} />
              </div>
              
              <div>
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="input-field text-2xl font-bold"
                      placeholder="Your Name"
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="input-field"
                      placeholder="Your Email"
                    />
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="input-field resize-none"
                      rows="2"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-dark-900 dark:text-cream-50 mb-2">
                      {user?.name}
                    </h1>
                    <div className="flex items-center space-x-2 text-dark-600 dark:text-cream-300 mb-2">
                      <Mail size={16} />
                      <span>{user?.email}</span>
                    </div>
                    <p className="text-dark-600 dark:text-cream-300 max-w-md">
                      {formData.bio}
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Save</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <X size={16} />
                    <span>Cancel</span>
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Edit3 size={16} />
                  <span>Edit Profile</span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card text-center">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className="text-2xl font-bold text-dark-900 dark:text-cream-50 mb-1">
                  {stat.value}
                </div>
                <div className="text-dark-600 dark:text-cream-300 text-sm">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enrolled Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-dark-900 dark:text-cream-50 mb-6">
              My Courses
            </h2>
            
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 bg-cream-50 dark:bg-dark-800 rounded-lg border border-cream-200 dark:border-dark-700"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-dark-900 dark:text-cream-50">
                        {course.title}
                      </h3>
                      <p className="text-dark-600 dark:text-cream-300 text-sm">
                        Last accessed: {course.lastAccessed}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === 'Completed'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-dark-600 dark:text-cream-300">Progress</span>
                      <span className="text-dark-700 dark:text-cream-200 font-medium">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-cream-200 dark:bg-dark-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-2 rounded-full ${
                          course.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-dark-900 dark:text-cream-50 mb-6">
              Achievements
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'
                      : 'bg-cream-50 dark:bg-dark-800 border-cream-200 dark:border-dark-700 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h3 className="font-semibold text-dark-900 dark:text-cream-50 text-sm mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-dark-600 dark:text-cream-300 text-xs mb-2">
                      {achievement.description}
                    </p>
                    {achievement.earned && achievement.date && (
                      <div className="flex items-center justify-center space-x-1 text-xs text-dark-500 dark:text-cream-400">
                        <Calendar size={12} />
                        <span>{achievement.date}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-dark-600 dark:text-cream-300 text-sm">
                {achievements.filter(a => a.earned).length} of {achievements.length} achievements unlocked
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;