import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search, BookOpen, Code, Database, Cloud, Network, Cpu } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { topics } from '../data/courses';

const Topics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const iconMap = {
    'databases': Database,
    'cloud-computing': Cloud,
    'networking': Network,
    'python': Code,
    'javascript': Code,
    'cpp': Cpu,
    'mysql': Database,
  };

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.subtopics.some(subtopic => 
      subtopic.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
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

  const topicDetails = {
    'databases': {
      overview: 'Learn about database systems, SQL, and data management techniques.',
      keyPoints: [
        'Relational vs NoSQL databases',
        'Database design principles',
        'Query optimization',
        'Data modeling',
        'ACID properties'
      ],
      resources: [
        'Interactive SQL tutorials',
        'Database design exercises',
        'Performance optimization guides',
        'Real-world case studies'
      ]
    },
    'cloud-computing': {
      overview: 'Explore cloud platforms, services, and modern deployment strategies.',
      keyPoints: [
        'Cloud service models (IaaS, PaaS, SaaS)',
        'Major cloud providers (AWS, Azure, GCP)',
        'Containerization and orchestration',
        'Serverless computing',
        'Cloud security best practices'
      ],
      resources: [
        'Hands-on cloud labs',
        'Architecture diagrams',
        'Cost optimization strategies',
        'Migration case studies'
      ]
    },
    'networking': {
      overview: 'Understand computer networks, protocols, and network security.',
      keyPoints: [
        'OSI and TCP/IP models',
        'Network protocols and standards',
        'Network security fundamentals',
        'Routing and switching',
        'Network troubleshooting'
      ],
      resources: [
        'Network simulation tools',
        'Protocol analysis exercises',
        'Security assessment labs',
        'Troubleshooting scenarios'
      ]
    },
    'python': {
      overview: 'Master Python programming from basics to advanced concepts.',
      keyPoints: [
        'Python syntax and data structures',
        'Object-oriented programming',
        'Popular libraries and frameworks',
        'Web development with Python',
        'Data science and automation'
      ],
      resources: [
        'Interactive coding exercises',
        'Project-based learning',
        'Library documentation',
        'Best practices guides'
      ]
    },
    'javascript': {
      overview: 'Learn modern JavaScript development and web technologies.',
      keyPoints: [
        'ES6+ features and syntax',
        'DOM manipulation and events',
        'Asynchronous programming',
        'Modern frameworks and libraries',
        'Node.js and backend development'
      ],
      resources: [
        'Interactive code playground',
        'Framework tutorials',
        'Performance optimization tips',
        'Real-world projects'
      ]
    },
    'cpp': {
      overview: 'Explore C++ programming for system development and performance.',
      keyPoints: [
        'Memory management and pointers',
        'Object-oriented programming in C++',
        'Standard Template Library (STL)',
        'Performance optimization',
        'Modern C++ features'
      ],
      resources: [
        'Coding challenges',
        'Performance benchmarks',
        'Memory management exercises',
        'System programming examples'
      ]
    },
    'mysql': {
      overview: 'Master MySQL database administration and optimization.',
      keyPoints: [
        'Database design and normalization',
        'Advanced SQL queries',
        'Index optimization',
        'Stored procedures and functions',
        'Database security and backup'
      ],
      resources: [
        'Query optimization tools',
        'Performance monitoring guides',
        'Backup and recovery procedures',
        'Security best practices'
      ]
    }
  };

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
            Explore Topics
          </h1>
          <p className="text-xl text-dark-600 dark:text-cream-300 max-w-2xl mx-auto">
            Dive deep into programming languages and technical concepts with our comprehensive topic guides.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <SearchBar
            placeholder="Search topics, subtopics, or concepts..."
            onSearch={handleSearch}
            className="max-w-2xl mx-auto"
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Topics List */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 gap-6"
            >
              {filteredTopics.map((topic) => {
                const IconComponent = iconMap[topic.id] || BookOpen;
                return (
                  <motion.div
                    key={topic.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedTopic(topic)}
                    className="card hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-4xl">{topic.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-dark-900 dark:text-cream-50">
                          {topic.title}
                        </h3>
                        <p className="text-dark-600 dark:text-cream-300 text-sm">
                          {topic.description}
                        </p>
                      </div>
                      <ChevronRight className="text-dark-400 dark:text-cream-400" size={20} />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-dark-700 dark:text-cream-200">
                        Key Topics:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {topic.subtopics.slice(0, 3).map((subtopic) => (
                          <span
                            key={subtopic}
                            className="bg-cream-100 dark:bg-dark-800 text-dark-600 dark:text-cream-300 px-2 py-1 rounded text-xs"
                          >
                            {subtopic}
                          </span>
                        ))}
                        {topic.subtopics.length > 3 && (
                          <span className="text-dark-500 dark:text-cream-400 text-xs">
                            +{topic.subtopics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* No Results */}
            {filteredTopics.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-dark-900 dark:text-cream-50 mb-2">
                  No topics found
                </h3>
                <p className="text-dark-600 dark:text-cream-300 mb-6">
                  Try adjusting your search to find more topics.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn-primary"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </div>

          {/* Topic Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              {selectedTopic ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={selectedTopic.id}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-3xl">{selectedTopic.icon}</div>
                    <h3 className="text-xl font-semibold text-dark-900 dark:text-cream-50">
                      {selectedTopic.title}
                    </h3>
                  </div>
                  
                  <p className="text-dark-600 dark:text-cream-300 mb-6">
                    {topicDetails[selectedTopic.id]?.overview || selectedTopic.description}
                  </p>

                  {/* Key Points */}
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-dark-900 dark:text-cream-50 mb-3">
                      What You'll Learn
                    </h4>
                    <ul className="space-y-2">
                      {(topicDetails[selectedTopic.id]?.keyPoints || selectedTopic.subtopics).map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-dark-400 dark:bg-cream-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-dark-600 dark:text-cream-300 text-sm">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  {topicDetails[selectedTopic.id]?.resources && (
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-dark-900 dark:text-cream-50 mb-3">
                        Learning Resources
                      </h4>
                      <ul className="space-y-2">
                        {topicDetails[selectedTopic.id].resources.map((resource, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <BookOpen size={16} className="text-dark-400 dark:text-cream-400 mt-0.5 flex-shrink-0" />
                            <span className="text-dark-600 dark:text-cream-300 text-sm">
                              {resource}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button className="btn-primary w-full">
                    Start Learning
                  </button>
                </motion.div>
              ) : (
                <div className="text-center py-8">
                  <Search className="mx-auto text-dark-400 dark:text-cream-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-dark-900 dark:text-cream-50 mb-2">
                    Select a Topic
                  </h3>
                  <p className="text-dark-600 dark:text-cream-300 text-sm">
                    Click on any topic to see detailed information and learning resources.
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

export default Topics;