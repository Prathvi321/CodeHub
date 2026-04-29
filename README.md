<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  <br/>
  <h1>CodeHub: Master Data Structures & Algorithms</h1>
  <p>An interactive, highly visual educational platform for learning Computer Science concepts.</p>
</div>

## 🌟 Overview

**CodeHub** is a modern, responsive React-based web application designed to help users master Data Structures & Algorithms (DSA) and other core computer science concepts. It features an interactive bento-grid layout for topic discovery, complete with detailed, animated educational guides for essential topics like Arrays, Linked Lists, and version control systems like Git & GitHub. 

## ✨ Features

- **Interactive Bento-Grid Layout:** A visually stunning and responsive topic discovery grid.
- **In-Depth Educational Guides:** Comprehensive learning materials for topics like **Arrays**, **Linked Lists**, and **Git & GitHub**, complete with code snippets and advanced technical explanations.
- **Smooth Animations:** Fluid layout transitions, hover effects, and page animations powered by `motion/react`.
- **Search & Filtering:** Quickly find topics of interest with the built-in search functionality.
- **Modern UI/UX:** Clean, responsive, glassmorphism-inspired design with customized color themes for each topic.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Build Tool:** Vite

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository_url>
   cd CodeHub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:3000`.

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components & Detailed Guides
│   ├── ui/              # Base UI components (Cards, Inputs, etc.)
│   ├── ArrayDetail.tsx  # Array Data Structure Guide
│   ├── LinkedListDetail.tsx # Linked List Data Structure Guide
│   ├── GitGithubDetail.tsx  # Git & GitHub Guide
│   └── ZoomableImage.tsx    # Interactive Image Viewer
├── lib/                 # Utility functions (e.g., tailwind merge)
├── App.tsx              # Main Application Component & Routing Logic
├── index.css            # Global Styles & Tailwind Configuration
└── main.tsx             # React Entry Point
```

## 🤝 Contributing

Contributions are welcome! If you'd like to add new data structures, algorithms, or improve the existing guides, feel free to open a pull request or create an issue.

## 📄 License

This project is licensed under the [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0).
