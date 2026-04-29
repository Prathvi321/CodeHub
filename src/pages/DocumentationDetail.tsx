import React, { useState } from "react";
import { Book, Code, Component, PenTool, FileText, ChevronRight } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

interface DocumentationDetailProps {
  onBack: () => void;
  onNavigate?: (topic: string) => void;
}

export default function DocumentationDetail({ onBack, onNavigate }: DocumentationDetailProps) {
  const [activeTab, setActiveTab] = useState("getting-started");

  const handleNav = (e: React.MouseEvent, topic: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(topic);
    } else {
      onBack();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "getting-started":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              <Book className="w-3 h-3" />
              Basics
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Getting Started</h2>
            <p className="text-slate-600 mb-6 text-lg">
              Welcome to the CodeHub documentation! This platform is designed to help you master Data Structures, Algorithms, and other core Computer Science concepts through highly visual and interactive guides.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Navigation</h3>
            <p className="text-slate-600 mb-4">
              CodeHub uses a masonry-style bento grid for topic discovery. You can browse through the cards on the home page or use the search bar to filter topics by title or description. Press <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs mx-1">⌘ K</kbd> to quickly focus the search bar.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Exploring Guides</h3>
            <p className="text-slate-600 mb-4">
              Clicking on any card in the grid will open a detailed guide. These guides often feature:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              <li>Comprehensive technical explanations.</li>
              <li>High-quality visual slides or diagrams.</li>
              <li>Interactive code snippets.</li>
              <li>Downloadable resources (e.g., PDF handbooks).</li>
            </ul>
          </div>
        );
      case "adding-topic":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              <Code className="w-3 h-3" />
              For Developers
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Adding a New Topic</h2>
            <p className="text-slate-600 mb-6 text-lg">
              Want to contribute a new DSA guide? Follow these steps to integrate a new topic into the CodeHub ecosystem.
            </p>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
              <h4 className="text-slate-900 font-bold mb-3 flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Update the Topics Array
              </h4>
              <p className="text-slate-600 text-sm mb-4">In <code className="text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">src/App.tsx</code>, add a new object to the <code className="text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">topics</code> array:</p>
              <pre className="bg-slate-900 p-4 rounded-xl text-slate-300 text-sm overflow-x-auto border border-slate-800">
{`{
  id: "hash-table",
  title: "Hash Table",
  icon: <Database className="w-5 h-5 text-fuchsia-600" />,
  description: "Key-value mapping with O(1) lookups.",
  span: "md:col-span-1 md:row-span-1",
  theme: "bg-white border-slate-200",
  iconBg: "bg-fuchsia-100"
}`}
              </pre>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
              <h4 className="text-slate-900 font-bold mb-3 flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Create the Detail Component
              </h4>
              <p className="text-slate-600 text-sm">Create a new file in <code className="text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">src/components/</code> (e.g., <code className="text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">HashTableDetail.tsx</code>) and build your guide using our UI components.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
              <h4 className="text-slate-900 font-bold mb-3 flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                Hook it up to the Router
              </h4>
              <p className="text-slate-600 text-sm mb-4">Add the conditional render in <code className="text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">App.tsx</code>:</p>
              <pre className="bg-slate-900 p-4 rounded-xl text-slate-300 text-sm overflow-x-auto border border-slate-800">
{`if (selectedTopic === "hash-table") {
  return <HashTableDetail onBack={() => setSelectedTopic(null)} />;
}`}
              </pre>
            </div>
          </div>
        );
      case "components":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              <Component className="w-3 h-3" />
              UI Library
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Component Library</h2>
            <p className="text-slate-600 mb-8 text-lg">
              Reuse these components to maintain visual consistency across all guides.
            </p>

            <div className="space-y-8">
              <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Card Component</h3>
                <p className="text-slate-500 text-sm mb-6">The base container used for the bento grid and content wrappers.</p>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center justify-center">
                  <div className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl w-full max-w-sm">
                    <h4 className="font-bold text-slate-900 mb-2">Example Card</h4>
                    <p className="text-slate-500 text-sm">Content goes here inside the card.</p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-2">ZoomableImage</h3>
                <p className="text-slate-500 text-sm mb-6">A wrapper that adds click-to-zoom functionality to standard images, perfect for detailed diagrams.</p>
                <pre className="bg-slate-900 p-4 rounded-xl text-slate-300 text-sm overflow-x-auto">
{`<ZoomableImage 
  src="/path/to/diagram.png" 
  alt="Architecture Diagram" 
  className="w-full rounded-2xl"
/>`}
                </pre>
              </div>
            </div>
          </div>
        );
      case "content":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              <PenTool className="w-3 h-3" />
              For Creators
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Content Guidelines</h2>
            <p className="text-slate-600 mb-6 text-lg">
              Standards for ensuring high-quality, readable content across the platform.
            </p>

            <div className="prose prose-slate max-w-none">
              <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Voice and Tone</h3>
              <p className="text-slate-600 mb-4">Keep explanations concise, encouraging, and highly visual. Avoid massive blocks of text; break concepts down into bullet points, numbered steps, or visual slides wherever possible.</p>

              <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Image Specifications</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Format:</strong> WebP or highly compressed PNG.</li>
                <li><strong>Dimensions:</strong> For slide presentations, standard 16:9 (e.g., 1920x1080) is optimal.</li>
                <li><strong>Dark/Light Mode:</strong> Ensure diagrams are legible against a white background or use a distinct dark container for them.</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Code Snippets</h3>
              <p className="text-slate-600 mb-4">Always use a dark-themed container for code snippets to provide high contrast against the platform's predominantly light UI.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const navItems = [
    { id: "getting-started", label: "Getting Started", icon: <Book className="w-4 h-4" /> },
    { id: "adding-topic", label: "Adding a Topic", icon: <Code className="w-4 h-4" /> },
    { id: "components", label: "Component Library", icon: <Component className="w-4 h-4" /> },
    { id: "content", label: "Content Guidelines", icon: <PenTool className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfd] font-sans">
      <Navbar activePage="documentation" onNavigate={(page) => { if (page) onNavigate?.(page); else onBack(); }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-12 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 md:sticky md:top-24">
          <div className="flex items-center gap-2 mb-6 px-3">
            <FileText className="w-5 h-5 text-slate-400" />
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Documentation</h3>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${activeTab === item.id ? "text-indigo-600" : "text-slate-400"}`}>
                    {item.icon}
                  </div>
                  {item.label}
                </div>
                {activeTab === item.id && <ChevronRight className="w-4 h-4 text-indigo-400" />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 max-w-3xl min-h-[60vh] pb-20">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
