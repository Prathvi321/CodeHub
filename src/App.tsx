/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Code2, BookOpen, Layers, Terminal, Github, Cpu, Network, Database, ChevronRight, LayoutGrid, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import LinkedListDetail from "@/src/components/LinkedListDetail";
import GitGithubDetail from "@/src/components/GitGithubDetail";
import { cn } from "@/src/lib/utils";

const topics = [
  { 
    id: "git",
    title: "Git & GitHub", 
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop",
    icon: <Github className="w-5 h-5" />,
    description: "Version control and collaborative development concepts.",
    span: "md:col-span-2 md:row-span-1",
    theme: "bg-indigo-50 border-indigo-100 text-indigo-900",
    variant: "large"
  },
  { 
    id: "linked-list",
    title: "Linked List", 
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop",
    icon: <Layers className="w-5 h-5 text-emerald-600" />,
    description: "Sequential data structures with pointers.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-emerald-100"
  },
  { 
    id: "array",
    title: "Array", 
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    icon: <LayoutGrid className="w-5 h-5 text-amber-600" />,
    description: "Memory-contiguous indexed storage.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-amber-100"
  },
  { 
    id: "stack",
    title: "Stack", 
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=600&auto=format&fit=crop",
    icon: <Terminal className="w-5 h-5 text-slate-600" />,
    description: "LIFO (Last In First Out) concepts.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-slate-100"
  },
  { 
    id: "queue",
    title: "Queue", 
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
    icon: <Terminal className="w-5 h-5 text-indigo-600" />,
    description: "FIFO (First In First Out) paradigms.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-indigo-50"
  },
  { 
    id: "binary-tree",
    title: "Binary Tree", 
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=600&auto=format&fit=crop",
    icon: <Network className="w-5 h-5 text-white" />,
    description: "Hierarchical structures & traversal algorithms.",
    span: "md:col-span-1 md:row-span-2",
    theme: "bg-slate-900 border-slate-800 text-white",
    variant: "tall",
    iconBg: "bg-white/10"
  },
  { 
    id: "quick-sort",
    title: "Quick Sort", 
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=600&auto=format&fit=crop",
    icon: <Cpu className="w-5 h-5 text-rose-600" />,
    description: "Divide and conquer efficiency.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-rose-50 border-rose-100 text-rose-900",
    iconBg: "bg-rose-100"
  },
  {
    id: "merge-sort",
    title: "Merge Sort",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop",
    icon: <Cpu className="w-5 h-5 text-indigo-600" />,
    description: "Stable sorting with O(n log n) efficiency.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-indigo-50"
  },
  { 
    id: "dp",
    title: "Dynamic Programming", 
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600&auto=format&fit=crop",
    icon: <Code2 className="w-5 h-5 text-indigo-600" />,
    description: "Solving complex problems with sub-problems.",
    span: "md:col-span-2 md:row-span-1",
    theme: "bg-white border-slate-200",
    variant: "wide",
    iconBg: "bg-indigo-100"
  },
  { 
    id: "recursion",
    title: "Recursion", 
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=600&auto=format&fit=crop",
    icon: <Layers className="w-5 h-5 text-slate-600" />,
    description: "Stack depth management.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-slate-100"
  },
  { 
    id: "hashing",
    title: "Hashing", 
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=600&auto=format&fit=crop",
    icon: <Database className="w-5 h-5 text-slate-600" />,
    description: "O(1) access strategies and collisions.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-slate-100"
  },
  {
    id: "binary-search",
    title: "Binary Search",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    icon: <Search className="w-5 h-5 text-sky-600" />,
    description: "Efficient searching in sorted data.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-sky-50 border-sky-100 text-sky-900",
    iconBg: "bg-sky-100"
  },
  {
    id: "graphs",
    title: "Graphs",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",
    icon: <Network className="w-5 h-5 text-indigo-600" />,
    description: "Complex relationships and paths.",
    span: "md:col-span-2 md:row-span-1",
    theme: "bg-white border-slate-200",
    variant: "wide",
    iconBg: "bg-indigo-100"
  },
  {
    id: "heap",
    title: "Heap",
    image: "https://images.unsplash.com/photo-1523961123396-d9a940bb6770?q=80&w=600&auto=format&fit=crop",
    icon: <Layers className="w-5 h-5 text-amber-600" />,
    description: "Priority based binary layouts.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-amber-50"
  },
  {
    id: "greedy",
    title: "Greedy Algorithms",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    icon: <Cpu className="w-5 h-5 text-emerald-600" />,
    description: "Local optimal choices for global solutions.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-emerald-50 border-emerald-100 text-emerald-900",
    iconBg: "bg-emerald-100"
  },
  {
    id: "backtracking",
    title: "Backtracking",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    icon: <RotateCcw className="w-5 h-5 text-rose-600" />,
    description: "Exploring all paths and pruning.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-rose-50"
  },
  {
    id: "system-design",
    title: "System Design",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    icon: <Cpu className="w-5 h-5 text-slate-400" />,
    description: "Scalability and architecture patterns.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-slate-50 border-slate-200 text-slate-900",
    iconBg: "bg-slate-200"
  },
  {
    id: "dbms",
    title: "DBMS",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop",
    icon: <Database className="w-5 h-5 text-blue-600" />,
    description: "Database management sys and SQL.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-blue-50"
  },
  {
    id: "os",
    title: "Operating Systems",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    icon: <Cpu className="w-5 h-5 text-purple-600" />,
    description: "Low-level system concepts and kernel.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-purple-50"
  },
  {
    id: "networks",
    title: "Computer Networks",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=600&auto=format&fit=crop",
    icon: <Network className="w-5 h-5 text-slate-600" />,
    description: "Data communication and protocols.",
    span: "md:col-span-2 md:row-span-1",
    theme: "bg-white border-slate-200",
    variant: "wide",
    iconBg: "bg-slate-50"
  }
];


export default function CodeHubHome() {
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(search.toLowerCase()) ||
    topic.description.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedTopic === "linked-list") {
    return <LinkedListDetail onBack={() => setSelectedTopic(null)} />;
  }

  if (selectedTopic === "git") {
    return <GitGithubDetail onBack={() => setSelectedTopic(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer" onClick={() => setSelectedTopic(null)}>
              C
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 cursor-pointer" onClick={() => setSelectedTopic(null)}>CodeHub</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="text-indigo-600 transition-colors">Explore</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Challenges</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Documentation</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Community</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-semibold text-slate-700">Sign In</button>
            <button className="bg-slate-900 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
              Master Data Structures & Algorithms
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto mb-10 text-lg">
              Explore the building blocks of computer science with visual guides and optimized code snippets.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
            </div>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics (e.g. 'Binary Tree', 'Merge Sort')..."
              className="pl-12 pr-12 py-7 text-base rounded-2xl shadow-sm border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white transition-all w-full outline-none"
            />
            <div className="absolute right-3 top-2 bottom-2 hidden sm:flex items-center">
              <kbd className="px-3 py-1 bg-slate-100 text-slate-400 text-xs rounded border border-slate-200 font-mono">
                ⌘ K
              </kbd>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid Section */}
        <section className="mb-20">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row-dense gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic, index) => (
                  <motion.div
                    key={topic.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={topic.span}
                    onClick={() => setSelectedTopic(topic.id)}
                  >
                    <Card className={cn(
                      "group relative h-full flex flex-col overflow-hidden transition-all duration-300 cursor-pointer rounded-3xl",
                      topic.theme,
                      topic.variant !== "tall" && "hover:shadow-lg shadow-sm"
                    )}>
                      {topic.variant === "large" ? (
                        <div className="p-8 flex flex-col justify-between h-full min-h-[14rem]">
                          <div>
                            <span className="px-2 py-1 bg-indigo-200 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded">Essentials</span>
                            <h3 className="text-3xl font-bold text-slate-900 mt-4 mb-2">{topic.title}</h3>
                            <p className="text-indigo-800 text-sm opacity-80 leading-relaxed font-medium">{topic.description}</p>
                          </div>
                          <div className="flex gap-2 mt-6">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-8 h-8 rounded bg-indigo-200/50" />
                            ))}
                          </div>
                        </div>
                      ) : topic.variant === "tall" ? (
                        <div className="p-8 h-full flex flex-col justify-between bg-slate-900">
                          <div>
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-6", topic.iconBg)}>
                              {topic.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{topic.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{topic.description}</p>
                          </div>
                          <div className="flex justify-center py-6">
                             <div className="grid grid-cols-3 gap-3 opacity-20">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                  <div key={i} className="w-5 h-5 rounded-full bg-white" />
                                ))}
                             </div>
                          </div>
                        </div>
                      ) : topic.variant === "wide" ? (
                        <div className="p-8 flex items-center justify-between h-full">
                          <div className="max-w-[60%]">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors", topic.iconBg)}>
                              {topic.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{topic.title}</h3>
                            <p className="text-slate-500 text-sm mt-2 leading-relaxed">{topic.description}</p>
                          </div>
                          <div className="flex gap-1 items-end h-16">
                            <div className="w-8 h-12 bg-indigo-50 rounded" />
                            <div className="w-8 h-16 bg-indigo-100 rounded" />
                            <div className="w-8 h-20 bg-indigo-200 rounded" />
                            <div className="w-8 h-24 bg-indigo-400 rounded" />
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 h-full flex flex-col group-hover:bg-slate-50 transition-colors">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors group-hover:scale-110 duration-300", topic.iconBg)}>
                            {topic.icon}
                          </div>
                          <h3 className="font-bold text-slate-900 text-lg">{topic.title}</h3>
                          <p className="text-sm text-slate-500 mt-2 leading-tight">{topic.description}</p>
                          {topic.title === "Quick Sort" && (
                            <div className="mt-auto pt-6 flex gap-1.5 items-end h-8">
                              <div className="w-2.5 h-4 bg-rose-200 rounded-sm" />
                              <div className="w-2.5 h-8 bg-rose-400 rounded-sm" />
                              <div className="w-2.5 h-6 bg-rose-300 rounded-sm" />
                              <div className="w-2.5 h-3 bg-rose-200 rounded-sm" />
                            </div>
                          )}
                          {topic.title === "Stack & Queue" && (
                            <div className="mt-auto pt-6 flex flex-col gap-1.5">
                              <div className="h-1.5 w-full bg-slate-100 rounded" />
                              <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
                              <div className="h-1.5 w-1/2 bg-indigo-300 rounded" />
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">
                    No matching topics found for "{search}"
                  </p>
                  <button 
                    onClick={() => setSearch("")}
                    className="mt-4 text-indigo-600 font-semibold hover:underline"
                  >
                    Clear search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Footer Cta */}
        <section className="bg-slate-900 rounded-[2rem] p-12 text-center text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 80 50 80 70 100 L 100 0 L 0 0" fill="currentColor" />
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to start coding?</h2>
            <p className="text-slate-400 mb-8 text-lg">
              Join over 100,000 students learning data structures and algorithms every day on CodeHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/40">
                Join Now for Free
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-white py-4 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-400">
          <div className="flex gap-4">
            <span>© 2024 CodeHub Learning Inc.</span>
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 
              2,401 Developers Online
            </span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-indigo-600 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
            <span>v2.4.0-stable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
