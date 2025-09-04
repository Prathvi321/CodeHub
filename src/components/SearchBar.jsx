import React, { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ 
  placeholder = "Search courses, topics, or difficulty...", 
  onSearch, 
  filters = [],
  onFilterChange,
  className = "" 
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query, activeFilters);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, activeFilters, onSearch]);

  const handleFilterToggle = (filter) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    
    setActiveFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setActiveFilters([]);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-dark-400 dark:text-cream-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="input-field pl-10 pr-20"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
          {filters.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1.5 rounded-md transition-colors duration-200 ${
                activeFilters.length > 0 || showFilters
                  ? 'bg-dark-200 dark:bg-dark-600 text-dark-700 dark:text-cream-200'
                  : 'text-dark-400 dark:text-cream-400 hover:text-dark-600 dark:hover:text-cream-200'
              }`}
            >
              <Filter size={16} />
            </motion.button>
          )}
          
          {(query || activeFilters.length > 0) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearSearch}
              className="p-1.5 rounded-md text-dark-400 dark:text-cream-400 hover:text-dark-600 dark:hover:text-cream-200 transition-colors duration-200"
            >
              <X size={16} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mt-2"
        >
          {activeFilters.map((filter) => (
            <motion.span
              key={filter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center space-x-1 bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-cream-200 px-3 py-1 rounded-full text-sm"
            >
              <span>{filter}</span>
              <button
                onClick={() => handleFilterToggle(filter)}
                className="hover:text-dark-900 dark:hover:text-cream-50 transition-colors duration-200"
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
        </motion.div>
      )}

      {/* Filter Dropdown */}
      <AnimatePresence>
        {showFilters && filters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-cream-200 dark:border-dark-700 z-10"
          >
            <div className="p-4">
              <h4 className="text-sm font-medium text-dark-700 dark:text-cream-200 mb-3">
                Filter by:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filters.map((filter) => (
                  <motion.button
                    key={filter}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFilterToggle(filter)}
                    className={`text-left p-2 rounded-md text-sm transition-colors duration-200 ${
                      activeFilters.includes(filter)
                        ? 'bg-dark-100 dark:bg-dark-600 text-dark-900 dark:text-cream-50'
                        : 'text-dark-600 dark:text-cream-300 hover:bg-cream-50 dark:hover:bg-dark-700'
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;