import React, { useState } from "react";
import { Search, Code2, BookOpen, Layers, Terminal, Github, Cpu, Network, Database, ChevronRight, LayoutGrid, RotateCcw, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { topics } from "@/src/data/topics";

interface HomeProps {
  onNavigate: (topicId: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fdfdfd] selection:bg-indigo-100 selection:text-indigo-900 font-sans flex flex-col">
      <Navbar onNavigate={onNavigate} activePage="explore" />

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-12 md:py-16 flex-1 w-full">
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
            className="max-w-xl mx-auto relative group"
          >
            <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-xl group-hover:bg-indigo-500/20 transition-colors"></div>
            <div className="relative relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-indigo-400" />
              <Input 
                type="text" 
                placeholder="Search topics, algorithms, or concepts..." 
                className="w-full pl-12 pr-4 py-4 md:py-6 rounded-2xl border-slate-200 bg-white shadow-sm text-base focus-visible:ring-indigo-500 focus-visible:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row-dense gap-4 mb-24">
          <AnimatePresence>
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  "border group relative h-full flex flex-col overflow-hidden transition-all duration-300 cursor-pointer rounded-3xl hover:shadow-lg shadow-sm",
                  topic.span,
                  topic.theme
                )}
                onMouseEnter={() => setHoveredTopic(topic.id)}
                onMouseLeave={() => setHoveredTopic(null)}
                onClick={() => onNavigate(topic.id)}
              >
                {topic.variant === "large" ? (
                  <div className="p-8 flex flex-col justify-between h-full min-h-[14rem]">
                    <div>
                      <span className="px-2 py-1 bg-indigo-200 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded">Essentials</span>
                      <h3 className="text-3xl font-bold text-slate-900 mt-4 mb-2">{topic.title}</h3>
                      <p className="text-indigo-800 text-sm opacity-80 leading-relaxed font-medium">{topic.description}</p>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <div className="w-8 h-8 rounded bg-indigo-200/50 flex items-center justify-center text-indigo-700">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div className="w-8 h-8 rounded bg-indigo-200/50 flex items-center justify-center text-indigo-700">
                        <Github className="w-4 h-4" />
                      </div>
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
                      <img src="/Binary Tree/Binary Tree.png" alt="Binary Tree" className="w-full max-h-32 object-contain" />
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
                    <div className="flex gap-1 items-center justify-end h-24 w-32">
                      {topic.id === 'dp' && <img src="/Dynamic Programming/Dynamic Programming.png" alt="Dynamic Programming" className="w-full h-full object-contain" />}
                      {topic.id === 'graphs' && <img src="/Graphs/Graphs.png" alt="Graphs" className="w-full h-full object-contain" />}
                      {topic.id !== 'dp' && topic.id !== 'graphs' && (
                        <div className="flex gap-1 items-end h-16">
                          <div className="w-8 h-12 bg-indigo-50 rounded" />
                          <div className="w-8 h-16 bg-indigo-100 rounded" />
                          <div className="w-8 h-20 bg-indigo-200 rounded" />
                          <div className="w-8 h-24 bg-indigo-400 rounded" />
                        </div>
                      )}
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
                    {topic.title === "Queue" && (
                      <div className="mt-auto pt-6 flex flex-col gap-1.5">
                        <div className="h-1.5 w-full bg-slate-100 rounded" />
                        <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
                        <div className="h-1.5 w-1/2 bg-indigo-300 rounded" />
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden text-center shadow-2xl mb-12">
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

      <Footer />
    </div>
  );
}
