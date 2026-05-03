import React from "react";
import { Search, Code2, Layers, Terminal, Github, Cpu, Network, Database, LayoutGrid, RotateCcw } from "lucide-react";

export const topics = [
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
    id: "pandas",
    title: "Pandas",
    image: "",
    icon: <Database className="w-5 h-5 text-indigo-600" />,
    description: "Data manipulation, cleaning, and analysis.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-indigo-50 border-indigo-100 text-indigo-900",
    iconBg: "bg-indigo-100"
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
    image: "",
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
    image: "",
    icon: <Layers className="w-5 h-5 text-amber-600" />,
    description: "Priority based binary layouts.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-amber-50"
  },
  {
    id: "greedy",
    title: "Greedy Algorithms",
    image: "",
    icon: <Cpu className="w-5 h-5 text-emerald-600" />,
    description: "Local optimal choices for global solutions.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-emerald-50 border-emerald-100 text-emerald-900",
    iconBg: "bg-emerald-100"
  },
  {
    id: "backtracking",
    title: "Backtracking",
    image: "",
    icon: <RotateCcw className="w-5 h-5 text-rose-600" />,
    description: "Exploring all paths and pruning.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-rose-50"
  },
  {
    id: "system-design",
    title: "System Design",
    image: "",
    icon: <Cpu className="w-5 h-5 text-slate-400" />,
    description: "Scalability and architecture patterns.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-slate-50 border-slate-200 text-slate-900",
    iconBg: "bg-slate-200"
  },
  {
    id: "dbms",
    title: "DBMS",
    image: "",
    icon: <Database className="w-5 h-5 text-blue-600" />,
    description: "Database management sys and SQL.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-blue-50"
  },
  {
    id: "os",
    title: "Operating Systems",
    image: "",
    icon: <Cpu className="w-5 h-5 text-purple-600" />,
    description: "Low-level system concepts and kernel.",
    span: "md:col-span-1 md:row-span-1",
    theme: "bg-white border-slate-200",
    iconBg: "bg-purple-50"
  },
  {
    id: "networks",
    title: "Computer Networks",
    image: "",
    icon: <Network className="w-5 h-5 text-slate-600" />,
    description: "Data communication and protocols.",
    span: "md:col-span-2 md:row-span-1",
    theme: "bg-white border-slate-200",
    variant: "wide",
    iconBg: "bg-slate-50"
  }
];
