import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.login(formData);
      const { token, user } = response.data;
      
      login(user, token);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 dark:bg-dark-950 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto h-12 w-12 bg-gradient-to-r from-dark-900 to-dark-700 dark:from-cream-400 dark:to-cream-600 rounded-lg flex items-center justify-center"
          >
            <span className="text-cream-50 dark:text-dark-900 font-bold text-xl">C</span>
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-bold text-dark-900 dark:text-cream-50">
            Welcome back to CodeHub
          </h2>
          <p className="mt-2 text-center text-sm text-dark-600 dark:text-cream-300">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-dark-900 dark:text-cream-400 hover:text-dark-700 dark:hover:text-cream-300 transition-colors duration-200"
            >
              Sign up here
            </Link>
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-dark-400 dark:text-cream-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-dark-400 dark:text-cream-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-dark-400 dark:text-cream-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-dark-400 dark:text-cream-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-dark-600 focus:ring-dark-500 border-cream-300 dark:border-dark-600 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-dark-600 dark:text-cream-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-dark-900 dark:text-cream-400 hover:text-dark-700 dark:hover:text-cream-300 transition-colors duration-200"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-500 transition-all duration-200 ${
                isLoading
                  ? 'bg-dark-400 cursor-not-allowed'
                  : 'bg-dark-900 dark:bg-cream-600 hover:bg-dark-800 dark:hover:bg-cream-700 text-cream-50 dark:text-dark-900'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cream-300 dark:border-dark-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-cream-50 dark:bg-dark-950 text-dark-500 dark:text-cream-400">
                  Demo Credentials
                </span>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-dark-600 dark:text-cream-300">
              <p>Email: demo@codehub.com</p>
              <p>Password: demo123</p>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;