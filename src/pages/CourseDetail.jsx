import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  Clock, 
  Users, 
  Play, 
  CheckCircle, 
  BookOpen, 
  Award,
  ArrowLeft,
  Search
} from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import Quiz from '../components/Quiz';
import SearchBar from '../components/SearchBar';
import { courses } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);

  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 dark:bg-dark-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-900 dark:text-cream-50 mb-4">
            Course not found
          </h2>
          <Link to="/courses" className="btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const filteredLessons = course.lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to enroll in courses');
      return;
    }
    
    try {
      const { userAPI } = await import('../services/api');
      await userAPI.enrollCourse(id);
    } catch (error) {
      // Redirect to server error page on API error
      navigate('/server-error');
    }
  };

  const handleLessonComplete = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
    toast.success('Lesson completed!');
  };

  const handleQuizComplete = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 70) {
      toast.success(`Great job! You scored ${score}/${total}`);
    } else {
      toast('Keep practicing! You scored ' + score + '/' + total, {
        icon: '📚',
      });
    }
  };

  const currentLessonData = filteredLessons[currentLesson];
  const progress = (completedLessons.size / course.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-950">
      {/* Course Header */}
      <div className="bg-white dark:bg-dark-900 border-b border-cream-200 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/courses"
            className="inline-flex items-center text-dark-600 dark:text-cream-300 hover:text-dark-900 dark:hover:text-cream-50 mb-6 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Courses
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-cream-200 px-3 py-1 rounded-full text-sm font-medium">
                  {course.difficulty}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="text-dark-600 dark:text-cream-300">
                    {course.rating} ({course.students.toLocaleString()} students)
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-dark-900 dark:text-cream-50 mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-dark-600 dark:text-cream-300 mb-6">
                {course.description}
              </p>

              <div className="flex items-center space-x-6 text-dark-500 dark:text-cream-400">
                <div className="flex items-center space-x-2">
                  <Clock size={20} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen size={20} />
                  <span>{course.lessons.length} lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award size={20} />
                  <span>Certificate included</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-cream-100 dark:bg-dark-800 text-dark-600 dark:text-cream-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="card sticky top-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-dark-900 dark:text-cream-50 mb-2">
                    ${course.price}
                  </div>
                  <p className="text-dark-600 dark:text-cream-300">
                    One-time payment
                  </p>
                </div>

                {isEnrolled ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                        <CheckCircle size={20} />
                        <span className="font-medium">Enrolled</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-dark-700 dark:text-cream-200 font-medium">
                          Progress
                        </span>
                        <span className="text-dark-600 dark:text-cream-300 text-sm">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full bg-cream-200 dark:bg-dark-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEnroll}
                    className="btn-primary w-full text-lg py-4"
                  >
                    Enroll Now
                  </motion.button>
                )}

                <div className="mt-6 space-y-3 text-sm text-dark-600 dark:text-cream-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Mobile and desktop access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Downloadable resources</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      {isEnrolled && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Lessons List */}
            <div className="lg:col-span-1">
              <div className="card sticky top-8">
                <h3 className="text-lg font-semibold text-dark-900 dark:text-cream-50 mb-4">
                  Course Content
                </h3>
                
                <SearchBar
                  placeholder="Search lessons..."
                  onSearch={(query) => setSearchQuery(query)}
                  className="mb-4"
                />

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredLessons.map((lesson, index) => (
                    <motion.button
                      key={lesson.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setCurrentLesson(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        currentLesson === index
                          ? 'bg-dark-100 dark:bg-dark-700 text-dark-900 dark:text-cream-50'
                          : 'text-dark-600 dark:text-cream-300 hover:bg-cream-50 dark:hover:bg-dark-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {completedLessons.has(lesson.id) ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : (
                            <Play size={16} />
                          )}
                          <span className="text-sm font-medium">
                            {lesson.title}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {currentLessonData && (
                <motion.div
                  key={currentLesson}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="card">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-dark-900 dark:text-cream-50">
                        {currentLessonData.title}
                      </h2>
                      {!completedLessons.has(currentLessonData.id) && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLessonComplete(currentLessonData.id)}
                          className="btn-secondary"
                        >
                          Mark Complete
                        </motion.button>
                      )}
                    </div>

                    <div className="prose prose-lg max-w-none text-dark-700 dark:text-cream-200">
                      <p>{currentLessonData.content}</p>
                    </div>

                    {/* Code Blocks */}
                    {currentLessonData.codeBlocks && (
                      <div className="mt-8 space-y-6">
                        <h3 className="text-xl font-semibold text-dark-900 dark:text-cream-50">
                          Code Examples
                        </h3>
                        {currentLessonData.codeBlocks.map((block, index) => (
                          <CodeBlock
                            key={index}
                            code={block.code}
                            language={block.language}
                            title={block.title}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quiz */}
                  {currentLessonData.quiz && (
                    <Quiz
                      questions={currentLessonData.quiz}
                      onComplete={handleQuizComplete}
                    />
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                      disabled={currentLesson === 0}
                      className={`btn-secondary ${
                        currentLesson === 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Previous Lesson
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentLesson(Math.min(filteredLessons.length - 1, currentLesson + 1))}
                      disabled={currentLesson === filteredLessons.length - 1}
                      className={`btn-primary ${
                        currentLesson === filteredLessons.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Next Lesson
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;