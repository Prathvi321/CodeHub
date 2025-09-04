import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';

const Quiz = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setShowAnswers(true);
    if (onComplete) {
      onComplete(score, questions.length);
    }
  };

  const allAnswered = questions.every((_, index) => selectedAnswers[index] !== undefined);

  return (
    <div className="card mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-dark-900 dark:text-cream-50">
          Practice Quiz ({questions.length} questions)
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-dark-600 dark:text-cream-300 hover:text-dark-900 dark:hover:text-cream-50 transition-colors duration-200"
        >
          <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              {questions.map((question, questionIndex) => (
                <motion.div
                  key={questionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: questionIndex * 0.1 }}
                  className="p-4 bg-cream-50 dark:bg-dark-800 rounded-lg border border-cream-200 dark:border-dark-700"
                >
                  <h4 className="font-medium text-dark-900 dark:text-cream-50 mb-3">
                    {questionIndex + 1}. {question.question}
                  </h4>
                  
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswers[questionIndex] === optionIndex;
                      const isCorrect = optionIndex === question.correct;
                      const showResult = showAnswers;
                      
                      let buttonClass = "w-full text-left p-3 rounded-lg border transition-all duration-200 ";
                      
                      if (showResult) {
                        if (isCorrect) {
                          buttonClass += "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200";
                        } else if (isSelected && !isCorrect) {
                          buttonClass += "bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200";
                        } else {
                          buttonClass += "bg-cream-100 dark:bg-dark-700 border-cream-300 dark:border-dark-600 text-dark-700 dark:text-cream-300";
                        }
                      } else {
                        if (isSelected) {
                          buttonClass += "bg-dark-100 dark:bg-dark-600 border-dark-300 dark:border-dark-500 text-dark-900 dark:text-cream-50";
                        } else {
                          buttonClass += "bg-white dark:bg-dark-700 border-cream-300 dark:border-dark-600 text-dark-700 dark:text-cream-300 hover:bg-cream-50 dark:hover:bg-dark-600";
                        }
                      }

                      return (
                        <motion.button
                          key={optionIndex}
                          whileHover={{ scale: showResult ? 1 : 1.02 }}
                          whileTap={{ scale: showResult ? 1 : 0.98 }}
                          onClick={() => !showResult && handleAnswerSelect(questionIndex, optionIndex)}
                          disabled={showResult}
                          className={buttonClass}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showResult && (
                              <div>
                                {isCorrect && <CheckCircle size={20} className="text-green-600" />}
                                {isSelected && !isCorrect && <XCircle size={20} className="text-red-600" />}
                              </div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}

              {!showAnswers && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    allAnswered
                      ? 'btn-primary'
                      : 'bg-cream-300 dark:bg-dark-700 text-dark-500 dark:text-cream-400 cursor-not-allowed'
                  }`}
                >
                  Submit Quiz
                </motion.button>
              )}

              {showAnswers && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg border border-green-200 dark:border-green-700"
                >
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Quiz Complete!
                  </h4>
                  <p className="text-green-700 dark:text-green-300">
                    You scored {calculateScore()} out of {questions.length} questions correctly.
                  </p>
                  <div className="mt-2 bg-green-200 dark:bg-green-800 rounded-full h-2">
                    <div
                      className="bg-green-500 dark:bg-green-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(calculateScore() / questions.length) * 100}%` }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;