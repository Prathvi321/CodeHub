import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

const ServerError = () => {
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="text-red-500" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-dark-900 dark:text-cream-50 mb-4">
            Server Error
          </h1>
          <p className="text-xl text-dark-600 dark:text-cream-300 mb-6">
            Course enrollment is temporarily unavailable
          </p>
          <p className="text-dark-500 dark:text-cream-400 mb-8">
            We're working on adding course content and payment processing. Please check back soon!
          </p>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/courses"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Back to Courses</span>
            </Link>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="btn-secondary inline-flex items-center space-x-2 ml-4"
          >
            <RefreshCw size={20} />
            <span>Try Again</span>
          </motion.button>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Coming Soon
          </h3>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
            <li>• Full course content and lessons</li>
            <li>• Secure payment processing</li>
            <li>• Certificate generation</li>
            <li>• Progress tracking</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ServerError;