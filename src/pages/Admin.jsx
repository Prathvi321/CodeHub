import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Mail, Calendar, Search, Eye } from 'lucide-react';
import { courses } from '../data/courses';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    setUsers(allUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'bg-blue-500' },
    { label: 'Active Courses', value: courses.length, icon: BookOpen, color: 'bg-green-500' },
    { label: 'Total Enrollments', value: users.reduce((acc, user) => acc + (user.enrolledCourses?.length || 0), 0), icon: Calendar, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-dark-900 dark:text-cream-50 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-dark-600 dark:text-cream-300">
            Manage users and monitor platform activity
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-dark-600 dark:text-cream-300 text-sm">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-dark-900 dark:text-cream-50">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Users List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-dark-900 dark:text-cream-50">
                  Registered Users
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 dark:text-cream-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10 w-64"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-cream-50 dark:bg-dark-800 rounded-lg border border-cream-200 dark:border-dark-700 cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-dark-600 to-dark-800 dark:from-cream-400 dark:to-cream-600 rounded-full flex items-center justify-center">
                          <span className="text-cream-50 dark:text-dark-900 font-medium">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-dark-900 dark:text-cream-50">
                            {user.name}
                          </h3>
                          <p className="text-dark-600 dark:text-cream-300 text-sm">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-dark-500 dark:text-cream-400">
                        <span>{user.enrolledCourses?.length || 0} courses</span>
                        <Eye size={16} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="mx-auto text-dark-400 dark:text-cream-400 mb-4" size={48} />
                  <p className="text-dark-600 dark:text-cream-300">No users found</p>
                </div>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              {selectedUser ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={selectedUser.id}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-dark-600 to-dark-800 dark:from-cream-400 dark:to-cream-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-cream-50 dark:text-dark-900 font-bold text-xl">
                        {selectedUser.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-dark-900 dark:text-cream-50">
                      {selectedUser.name}
                    </h3>
                    <p className="text-dark-600 dark:text-cream-300">
                      {selectedUser.email}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-dark-900 dark:text-cream-50 mb-2">
                        Account Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-dark-600 dark:text-cream-300">User ID:</span>
                          <span className="text-dark-900 dark:text-cream-50">{selectedUser.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-600 dark:text-cream-300">Joined:</span>
                          <span className="text-dark-900 dark:text-cream-50">
                            {new Date(selectedUser.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-dark-900 dark:text-cream-50 mb-2">
                        Learning Progress
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-dark-600 dark:text-cream-300">Courses Enrolled:</span>
                          <span className="text-dark-900 dark:text-cream-50">
                            {selectedUser.progress?.coursesEnrolled || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-600 dark:text-cream-300">Completed:</span>
                          <span className="text-dark-900 dark:text-cream-50">
                            {selectedUser.progress?.coursesCompleted || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-600 dark:text-cream-300">Certificates:</span>
                          <span className="text-dark-900 dark:text-cream-50">
                            {selectedUser.progress?.certificates || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-600 dark:text-cream-300">Current Streak:</span>
                          <span className="text-dark-900 dark:text-cream-50">
                            {selectedUser.progress?.streak || 0} days
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-dark-900 dark:text-cream-50 mb-2">
                        Enrolled Courses
                      </h4>
                      {selectedUser.enrolledCourses?.length > 0 ? (
                        <div className="space-y-2">
                          {selectedUser.enrolledCourses.map((courseId) => {
                            const course = courses.find(c => c.id === courseId);
                            return course ? (
                              <div key={courseId} className="p-2 bg-cream-100 dark:bg-dark-700 rounded text-sm">
                                {course.title}
                              </div>
                            ) : null;
                          })}
                        </div>
                      ) : (
                        <p className="text-dark-500 dark:text-cream-400 text-sm">
                          No courses enrolled yet
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-8">
                  <Eye className="mx-auto text-dark-400 dark:text-cream-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-dark-900 dark:text-cream-50 mb-2">
                    Select a User
                  </h3>
                  <p className="text-dark-600 dark:text-cream-300 text-sm">
                    Click on any user to view their details and course enrollment information.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;