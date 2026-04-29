<div align="center">
  <img src="https://img.shields.io/badge/CodeHub-InteractiveLearning-4f46e5.svg?style=for-the-badge" alt="Project Status" />
  <br/>
  <br/>
  <h1>🚀 CodeHub: Master Data Structures & Algorithms</h1>
  <p>An interactive, highly visual educational platform for learning Computer Science concepts.</p>
</div>

<hr/>

## 🌟 Overview

**CodeHub** is a modern, responsive React-based web application designed to help users master Data Structures & Algorithms (DSA) and other core computer science concepts. It features an interactive **bento-grid layout** for topic discovery, complete with detailed, animated educational guides for essential topics like Arrays, Linked Lists, and version control systems like Git & GitHub. 

<br/>

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🎯 Interactive Bento-Grid Layout</h3>
      <p>A visually stunning and responsive topic discovery grid inspired by modern glassmorphism design.</p>
    </td>
    <td width="50%">
      <h3>📚 In-Depth Educational Guides</h3>
      <p>Comprehensive learning materials for topics like <b>Arrays</b>, <b>Linked Lists</b>, and <b>Git</b> complete with code snippets.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>💫 Smooth Animations</h3>
      <p>Fluid layout transitions, hover effects, and page animations powered by Framer Motion.</p>
    </td>
    <td width="50%">
      <h3>🔍 Search & Filtering</h3>
      <p>Quickly find topics, algorithms, or concepts of interest with the built-in lightning-fast search functionality.</p>
    </td>
  </tr>
</table>

<br/>

## 🎯 Future Goals (Roadmap)

CodeHub is constantly evolving. Here is what we are building next to make this the ultimate learning platform:

> **1. Expanded Challenges & Specialized Fields** 🧠
> <br/>
> We will add new, specialized challenges focusing on high-demand technical fields.
> * **Core Programming:** Python, Web Development, Computer Networking
> * **Data & AI:** Data Science, Machine Learning, TensorFlow, Numpy, Pandas
> * **Advanced Tech:** Large Language Models (LLMs), Retrieval-Augmented Generation (RAG)

<br/>

> **2. Dual-Mode Learning Paths** 🎬
> <br/>
> For every topic (like Arrays or Linked Lists), we will offer two distinct learning tabs at the top of the page:
> * **📖 Self Learning (Current):** Read through comprehensive text-based notes, study visual diagrams, and review optimized code snippets at your own pace.
> * **🧑‍🏫 Guided Learning (New):** An interactive video mode where you watch a lesson, and at specific timestamps, the video pauses automatically. A code editor and assignment will pop up on your screen, allowing you to submit your answer and get instant feedback on whether your logic is correct or wrong before moving forward!

<br/>

> **3. Affordable Premium Certifications** 🏆
> <br/>
> Our platform will eventually offer structured, certified courses covering in-demand skills and advanced algorithms. These certifications will be available for a very minimal fee, allowing developers from anywhere in the world to officially validate their skills affordably.

<br/>

## 🛠️ Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue" />
</div>

<br/>

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Prathvi321/CodeHub.git
   cd CodeHub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file and add your Google Apps Script URL for the sign-in modal API:
   ```env
   VITE_GOOGLE_SCRIPT_URL="your_google_script_url_here"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:3000`.

<br/>

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components & Detailed Guides
│   ├── SignInModal.tsx  # Interactive API Sign-In Modal
│   ├── ui/              # Base UI components (Cards, Inputs, etc.)
│   └── ...              # Topic specific detail pages
├── data/
│   └── topics.tsx       # Core structural data for the Bento Grid
├── pages/
│   └── Home.tsx         # Main interactive discovery layout
├── App.tsx              # Main Application Component & Routing Logic
└── main.tsx             # React Entry Point
```

<br/>

## 🤝 Contributing

Contributions are welcome! If you'd like to add new data structures, algorithms, or improve the existing guides, feel free to open a pull request or create an issue.

<br/>

## 📄 License

This project is licensed under the [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0).
