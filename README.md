# CodeHub - Modern Learning Platform

A comprehensive, responsive learning platform built with React for programming education. CodeHub offers structured courses, interactive lessons, quizzes, and progress tracking with a beautiful cream and dark theme.

## 🚀 Features

### Core Features
- **Authentication System**: Secure login/registration with JWT simulation
- **Interactive Dashboard**: Progress tracking with charts and analytics
- **Course Management**: Structured courses with lessons, code blocks, and quizzes
- **Smart Search**: Search courses by name, difficulty, tags, and within course content
- **Responsive Design**: Mobile-first design that works on all devices
- **Theme Toggle**: Beautiful cream/black theme with dark/light mode

### Course Features
- **Interactive Lessons**: Rich content with syntax-highlighted code blocks
- **Copy Code Functionality**: One-click code copying with VS Code-style highlighting
- **Practice Quizzes**: 8-10 questions for major topics, 2-3 for smaller topics
- **Progress Tracking**: Save and resume course progress
- **Course Filtering**: Filter by difficulty, language, and tags

### UI/UX Features
- **Smooth Animations**: Powered by Framer Motion
- **Syntax Highlighting**: VS Code-style code blocks with react-syntax-highlighter
- **Progress Charts**: Beautiful analytics with Recharts
- **Toast Notifications**: User-friendly feedback system
- **Responsive Navigation**: Mobile-optimized navigation with hamburger menu

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Syntax Highlighter** - Code syntax highlighting
- **Recharts** - Data visualization and charts
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Development Tools
- **Vite** - Fast build tool and dev server
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📚 Available Courses

1. **DSA in Python** - Data Structures and Algorithms
2. **DSA in JavaScript** - JavaScript-focused algorithms
3. **Web Development** - Complete web development course
4. **C++ for Game Development** - Game programming with C++
5. **Popular Python Libraries** - NumPy, Pandas, and more
6. **Data Science with Python** - Complete data science workflow
7. **AI/ML Course** - Artificial Intelligence and Machine Learning

## 🎯 Topics Covered

- **Programming Languages**: Python, JavaScript, C++, MySQL
- **Technical Concepts**: Databases, Cloud Computing, Networking
- **Specialized Areas**: Data Science, AI/ML, Game Development

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codehub-learning-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Theme Customization

The platform uses a custom cream and dark color scheme defined in `tailwind.config.js`. You can customize colors by modifying the theme configuration:

```javascript
colors: {
  cream: {
    50: '#fefdf8',
    // ... more shades
  },
  dark: {
    50: '#f6f6f6',
    // ... more shades
  }
}
```

## 📱 Responsive Design

CodeHub is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adapted layouts with collapsible elements
- **Mobile**: Touch-optimized interface with hamburger menu

## 🔐 Authentication

The platform includes a complete authentication system with:
- User registration and login
- JWT token simulation
- Protected routes
- User session management
- Demo credentials for testing

**Demo Login:**
- Email: `demo@codehub.com`
- Password: `demo123`

## 📊 Progress Tracking

Users can track their learning progress with:
- Course completion percentages
- Lesson completion status
- Quiz scores and attempts
- Learning streaks
- Achievement badges
- Downloadable certificates

## 🎮 Gamification Features

- **Badges and Achievements**: Unlock achievements for milestones
- **Learning Streaks**: Track consecutive learning days
- **Progress Charts**: Visual representation of learning journey
- **Leaderboards**: Compare progress with other learners (future feature)

## 🔍 Search Functionality

### Course Search
- Search by course name, description, or tags
- Filter by difficulty level and programming language
- Sort by popularity, rating, or price

### In-Course Search
- Search within course lessons and topics
- Quick navigation to specific content
- Highlight search results

## 💡 Code Blocks

Interactive code blocks with:
- Syntax highlighting for multiple languages
- Copy to clipboard functionality
- Line numbers
- Theme-aware styling (light/dark mode)
- Support for Python, JavaScript, C++, HTML, CSS, and more

## 🧪 Quiz System

Comprehensive quiz system featuring:
- Multiple choice questions
- Instant feedback
- Score calculation
- Progress tracking
- Expandable/collapsible interface
- Visual indicators for correct/incorrect answers

## 🎯 Future Enhancements

- **Backend Integration**: Node.js/Express API with MongoDB
- **Real Authentication**: JWT with refresh tokens
- **Discussion Forums**: Community interaction
- **Live Coding**: Interactive code editor
- **Video Lessons**: Multimedia content support
- **Mobile App**: React Native version
- **AI Recommendations**: Personalized course suggestions
- **Admin Dashboard**: Course and user management

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── CodeBlock.jsx   # Syntax highlighted code blocks
│   ├── Quiz.jsx        # Interactive quiz component
│   └── SearchBar.jsx   # Search and filter component
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Authentication
│   ├── Dashboard.jsx   # User dashboard
│   ├── Courses.jsx     # Course listing
│   ├── CourseDetail.jsx # Individual course view
│   ├── Topics.jsx      # Topic exploration
│   └── Profile.jsx     # User profile
├── context/            # React context providers
│   ├── AuthContext.jsx # Authentication state
│   └── ThemeContext.jsx # Theme management
├── data/               # Static data and mock APIs
│   └── courses.js      # Course and topic data
├── styles/             # CSS and styling
│   └── index.css       # Global styles and Tailwind
└── utils/              # Utility functions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons
- **Recharts** for data visualization

## 📞 Support

For support, email support@codehub.com or join our community Discord server.

---

**Built with ❤️ by the CodeHub Team**