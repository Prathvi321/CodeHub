import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Search,
  Home,
  Trophy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Topics', path: '/topics', icon: Search },
  ];

  if (isAuthenticated) {
    navItems.push(
      { name: 'Dashboard', path: '/dashboard', icon: Trophy },
      { name: 'Profile', path: '/profile', icon: User },
      { name: 'Admin', path: '/admin', icon: User }
    );
  }

  return (
    <nav className="bg-white dark:bg-dark-900 shadow-lg border-b border-cream-200 dark:border-dark-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-dark-900 to-dark-700 dark:from-cream-400 dark:to-cream-600 text-white dark:text-dark-900 px-3 py-2 rounded-lg font-bold text-xl"
            >
              CodeHub
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-1 text-dark-700 dark:text-cream-200 hover:text-dark-900 dark:hover:text-cream-50 transition-colors duration-200"
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-cream-100 dark:bg-dark-800 text-dark-700 dark:text-cream-200 hover:bg-cream-200 dark:hover:bg-dark-700 transition-colors duration-200"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-dark-600 dark:text-cream-300">
                  Welcome, {user?.name}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-dark-700 dark:text-cream-200 hover:text-dark-900 dark:hover:text-cream-50 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-cream-100 dark:bg-dark-800 text-dark-700 dark:text-cream-200"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-cream-100 dark:bg-dark-800 text-dark-700 dark:text-cream-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-cream-200 dark:border-dark-800"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 text-dark-700 dark:text-cream-200 hover:text-dark-900 dark:hover:text-cream-50 py-2 transition-colors duration-200"
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-500 hover:text-red-600 py-2 transition-colors duration-200"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-dark-700 dark:text-cream-200 hover:text-dark-900 dark:hover:text-cream-50 py-2 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary inline-block text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;