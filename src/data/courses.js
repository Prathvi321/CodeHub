export const courses = [
  {
    id: 'dsa-python',
    title: 'DSA in Python',
    description: 'Master Data Structures and Algorithms using Python',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    tags: ['Python', 'DSA', 'Algorithms'],
    image: '/images/dsa-python.jpg',
    instructor: 'Dr. Sarah Johnson',
    rating: 4.8,
    students: 15420,
    price: 99,
    lessons: [
      {
        id: 1,
        title: 'Introduction to DSA',
        content: 'Understanding the importance of data structures and algorithms...',
        codeBlocks: [
          {
            language: 'python',
            code: `# Basic Python data structures
my_list = [1, 2, 3, 4, 5]
my_dict = {'name': 'John', 'age': 25}
my_set = {1, 2, 3, 4, 5}

print(f"List: {my_list}")
print(f"Dictionary: {my_dict}")
print(f"Set: {my_set}")`
          }
        ],
        quiz: [
          {
            question: 'What is the time complexity of accessing an element in a list by index?',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
            correct: 0
          },
          {
            question: 'Which data structure follows LIFO principle?',
            options: ['Queue', 'Stack', 'Array', 'Linked List'],
            correct: 1
          }
        ]
      },
      {
        id: 2,
        title: 'Arrays and Lists',
        content: 'Deep dive into arrays and list operations...',
        codeBlocks: [
          {
            language: 'python',
            code: `# Array operations
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
result = linear_search(numbers, 25)
print(f"Element found at index: {result}")`
          }
        ],
        quiz: [
          {
            question: 'What is the space complexity of an array?',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
            correct: 1
          }
        ]
      }
    ]
  },
  {
    id: 'dsa-javascript',
    title: 'DSA in JavaScript',
    description: 'Learn Data Structures and Algorithms with JavaScript',
    difficulty: 'Intermediate',
    duration: '7 weeks',
    tags: ['JavaScript', 'DSA', 'Web Development'],
    image: '/images/dsa-js.jpg',
    instructor: 'Mike Chen',
    rating: 4.7,
    students: 12350,
    price: 89,
    lessons: [
      {
        id: 1,
        title: 'JavaScript Fundamentals for DSA',
        content: 'Essential JavaScript concepts for data structures...',
        codeBlocks: [
          {
            language: 'javascript',
            code: `// JavaScript data structures
const array = [1, 2, 3, 4, 5];
const object = { name: 'Alice', age: 30 };
const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
const set = new Set([1, 2, 3, 4, 5]);

console.log('Array:', array);
console.log('Object:', object);
console.log('Map:', map);
console.log('Set:', set);`
          }
        ],
        quiz: [
          {
            question: 'Which method adds an element to the end of an array?',
            options: ['push()', 'pop()', 'shift()', 'unshift()'],
            correct: 0
          }
        ]
      }
    ]
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Complete web development course from basics to advanced',
    difficulty: 'Beginner',
    duration: '12 weeks',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    image: '/images/web-dev.jpg',
    instructor: 'Emma Wilson',
    rating: 4.9,
    students: 25680,
    price: 129,
    lessons: [
      {
        id: 1,
        title: 'HTML Fundamentals',
        content: 'Learn the building blocks of web pages...',
        codeBlocks: [
          {
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to CodeHub</h1>
    <p>This is my first HTML page!</p>
    <a href="#about">Learn More</a>
</body>
</html>`
          }
        ],
        quiz: [
          {
            question: 'What does HTML stand for?',
            options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
            correct: 0
          }
        ]
      }
    ]
  },
  {
    id: 'cpp-game-dev',
    title: 'C++ for Game Development',
    description: 'Build games using C++ and popular game engines',
    difficulty: 'Advanced',
    duration: '10 weeks',
    tags: ['C++', 'Game Development', 'Graphics'],
    image: '/images/cpp-game.jpg',
    instructor: 'Alex Rodriguez',
    rating: 4.6,
    students: 8920,
    price: 149,
    lessons: [
      {
        id: 1,
        title: 'C++ Basics for Game Development',
        content: 'Essential C++ concepts for game programming...',
        codeBlocks: [
          {
            language: 'cpp',
            code: `#include <iostream>
#include <vector>

class Player {
private:
    std::string name;
    int health;
    int score;

public:
    Player(std::string playerName) : name(playerName), health(100), score(0) {}
    
    void takeDamage(int damage) {
        health -= damage;
        if (health < 0) health = 0;
    }
    
    void addScore(int points) {
        score += points;
    }
    
    void displayStats() {
        std::cout << "Player: " << name << std::endl;
        std::cout << "Health: " << health << std::endl;
        std::cout << "Score: " << score << std::endl;
    }
};

int main() {
    Player player1("Hero");
    player1.addScore(100);
    player1.takeDamage(25);
    player1.displayStats();
    
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: 'What is the purpose of a constructor in C++?',
            options: ['To destroy objects', 'To initialize objects', 'To copy objects', 'To compare objects'],
            correct: 1
          }
        ]
      }
    ]
  },
  {
    id: 'python-libraries',
    title: 'Popular Python Libraries',
    description: 'Explore essential Python libraries for various applications',
    difficulty: 'Intermediate',
    duration: '6 weeks',
    tags: ['Python', 'Libraries', 'NumPy', 'Pandas'],
    image: '/images/python-libs.jpg',
    instructor: 'Dr. Lisa Park',
    rating: 4.8,
    students: 18750,
    price: 79,
    lessons: [
      {
        id: 1,
        title: 'NumPy Fundamentals',
        content: 'Introduction to numerical computing with NumPy...',
        codeBlocks: [
          {
            language: 'python',
            code: `import numpy as np

# Creating arrays
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.array([[1, 2, 3], [4, 5, 6]])

# Basic operations
print("1D Array:", arr1)
print("2D Array:", arr2)
print("Shape of 2D array:", arr2.shape)
print("Sum of elements:", np.sum(arr1))
print("Mean:", np.mean(arr1))

# Mathematical operations
squared = arr1 ** 2
print("Squared array:", squared)`
          }
        ],
        quiz: [
          {
            question: 'What is the main advantage of NumPy arrays over Python lists?',
            options: ['Better syntax', 'Faster computation', 'More memory usage', 'Easier to use'],
            correct: 1
          }
        ]
      }
    ]
  },
  {
    id: 'data-science-python',
    title: 'Data Science with Python',
    description: 'Complete data science workflow using Python',
    difficulty: 'Intermediate',
    duration: '14 weeks',
    tags: ['Python', 'Data Science', 'Pandas', 'Matplotlib'],
    image: '/images/data-science.jpg',
    instructor: 'Dr. Robert Kim',
    rating: 4.9,
    students: 22100,
    price: 159,
    lessons: [
      {
        id: 1,
        title: 'Data Analysis with Pandas',
        content: 'Learn data manipulation and analysis with Pandas...',
        codeBlocks: [
          {
            language: 'python',
            code: `import pandas as pd
import numpy as np

# Creating a DataFrame
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'City': ['New York', 'London', 'Tokyo', 'Paris'],
    'Salary': [50000, 60000, 70000, 55000]
}

df = pd.DataFrame(data)

# Basic operations
print("DataFrame:")
print(df)
print("\\nDataFrame Info:")
print(df.info())
print("\\nStatistical Summary:")
print(df.describe())

# Filtering data
high_salary = df[df['Salary'] > 55000]
print("\\nEmployees with salary > 55000:")
print(high_salary)`
          }
        ],
        quiz: [
          {
            question: 'Which method is used to get basic information about a DataFrame?',
            options: ['info()', 'describe()', 'head()', 'shape()'],
            correct: 0
          }
        ]
      }
    ]
  },
  {
    id: 'ai-ml-course',
    title: 'AI/ML Course',
    description: 'Introduction to Artificial Intelligence and Machine Learning',
    difficulty: 'Advanced',
    duration: '16 weeks',
    tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow'],
    image: '/images/ai-ml.jpg',
    instructor: 'Dr. Maria Garcia',
    rating: 4.7,
    students: 14200,
    price: 199,
    lessons: [
      {
        id: 1,
        title: 'Introduction to Machine Learning',
        content: 'Understanding the fundamentals of machine learning...',
        codeBlocks: [
          {
            language: 'python',
            code: `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt

# Generate sample data
np.random.seed(42)
X = np.random.randn(100, 1)
y = 2 * X.flatten() + 1 + np.random.randn(100) * 0.1

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate metrics
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse:.4f}")
print(f"Model coefficient: {model.coef_[0]:.4f}")
print(f"Model intercept: {model.intercept_:.4f}")`
          }
        ],
        quiz: [
          {
            question: 'What is supervised learning?',
            options: ['Learning without labels', 'Learning with input-output pairs', 'Learning through trial and error', 'Learning from clustering'],
            correct: 1
          }
        ]
      }
    ]
  }
];

export const topics = [
  {
    id: 'databases',
    title: 'Databases',
    description: 'Learn about different database systems and SQL',
    icon: '🗄️',
    subtopics: ['SQL Basics', 'Database Design', 'NoSQL', 'Performance Optimization']
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    description: 'Explore cloud platforms and services',
    icon: '☁️',
    subtopics: ['AWS Basics', 'Azure Fundamentals', 'Docker', 'Kubernetes']
  },
  {
    id: 'networking',
    title: 'Networking',
    description: 'Understand computer networks and protocols',
    icon: '🌐',
    subtopics: ['TCP/IP', 'HTTP/HTTPS', 'DNS', 'Network Security']
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Master Python programming language',
    icon: '🐍',
    subtopics: ['Syntax Basics', 'OOP', 'Libraries', 'Web Development']
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Learn modern JavaScript development',
    icon: '📜',
    subtopics: ['ES6+', 'DOM Manipulation', 'Async Programming', 'Frameworks']
  },
  {
    id: 'cpp',
    title: 'C++',
    description: 'System programming with C++',
    icon: '⚡',
    subtopics: ['Memory Management', 'STL', 'Templates', 'Performance']
  },
  {
    id: 'mysql',
    title: 'MySQL',
    description: 'Relational database management',
    icon: '🐬',
    subtopics: ['Queries', 'Indexing', 'Stored Procedures', 'Optimization']
  }
];