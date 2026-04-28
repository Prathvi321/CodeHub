import React, { useState } from "react";
import { ArrowLeft, BookOpen, Clock, Code, Info, Lightbulb, Terminal, AlertTriangle, Search, Layers, ChevronRight, RotateCcw, ArrowRight, Network, Cpu, LayoutGrid, Box, Database } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import ZoomableImage from "./ZoomableImage";

interface ArrayDetailProps {
  onBack: () => void;
}

export default function ArrayDetail({ onBack }: ArrayDetailProps) {
  const [activeOp, setActiveOp] = useState("traversal");

  const ops = [
    { id: "traversal", name: "Traversal", color: "indigo" },
    { id: "insertion", name: "Insertion", color: "emerald" },
    { id: "deletion", name: "Deletion", color: "rose" },
    { id: "search", name: "Searching", color: "amber" },
    { id: "update", name: "Updating", color: "teal" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfd] selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      {/* Bento Header/Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
            <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CodeHub</span>
          </div>
          <div className="flex items-center gap-4">
             <button 
              onClick={onBack}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-12">
        {/* Bento Hero */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
             <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Arrays <span className="text-indigo-600">Visual Guide</span>
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg">
              Master the linear data structure that stores multiple elements of the same type in contiguous memory locations.
            </p>
          </motion.div>
        </header>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-16">
          
          {/* Main Content Card: What is an Array? */}
          <div className="md:col-span-2 md:row-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:border-indigo-300 transition-all shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">1D Array Structure</h3>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">Contiguous Memory</p>
              </div>
            </div>
            
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              A linear list storing elements of the same data type. Elements are accessed using a 0-based index. 
              Python implements arrays under the hood using dynamic lists.
            </p>

            <div className="bg-slate-50 rounded-2xl p-2 mb-8 border border-slate-100 overflow-hidden">
               <ZoomableImage 
                 src={encodeURI("/Array/A horizontal memory layout showing contiguous blocks labeled arr[0] to arr[4] with values 10, 20, 30, 40, 50, arrows indicating index positions, clean educational diagram.png")} 
                 alt="1D Array Layout" 
                 className="w-full h-auto rounded-xl shadow-sm"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50/50 p-4 rounded-2xl text-xs">
                <span className="font-bold text-indigo-900 block mb-1">Time Profile</span>
                <span className="text-indigo-700">Access: O(1) | Insertion: O(n)</span>
              </div>
              <div className="bg-emerald-50/50 p-4 rounded-2xl text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Python Basics</span>
                <span className="text-emerald-700"><code>arr = [10, 20, 30]</code></span>
              </div>
            </div>
          </div>

          {/* Memory Representation Card */}
          <div className="md:col-span-2 bg-slate-900 text-white rounded-[2.5rem] p-8 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 cursor-pointer group flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                 <div className="bg-white/10 p-3 rounded-2xl">
                   <Cpu className="w-6 h-6 text-indigo-400" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">Under The Hood</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Memory Representation</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Address calculation: <code>Address = Base + (i * size)</code>. Allows for O(1) random access by computing exact memory location.
              </p>
              <div className="bg-white/5 rounded-2xl p-2 mb-4 border border-white/10">
                <ZoomableImage 
                  src={encodeURI("/Array/Memory blocks with base address and offsets showing how arr[i] is calculated using base + i * size, low-level memory diagram.png")} 
                  alt="Memory Layout" 
                  className="w-full h-auto rounded-xl opacity-90"
                />
              </div>
            </div>
          </div>

          {/* 2D Arrays Matrix Card */}
          <div className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-6 hover:bg-amber-100 transition-all cursor-pointer shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="bg-amber-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-amber-600">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">2D Arrays (Matrix)</h3>
              <p className="text-xs text-amber-800/70 leading-tight mb-4">Represents rows and columns. Accessed via <code>arr[row][col]</code>.</p>
            </div>
            <ZoomableImage 
              src={encodeURI("/Array/Matrix grid 3x3 labeled with rows and columns, showing arr ij indexing, educational style diagram")} 
              alt="2D Matrix" 
              className="w-full h-auto rounded-xl border border-amber-200 shadow-sm"
            />
          </div>

          {/* Dynamic Arrays Card */}
          <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-6 hover:bg-rose-100 transition-all cursor-pointer shadow-sm overflow-hidden flex flex-col justify-between">
             <div className="bg-rose-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-rose-600">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Dynamic Arrays</h3>
              <p className="text-xs text-rose-800/70 leading-tight mb-4">Automatically resizes when full, common in Python lists (<code>append</code>).</p>
            </div>
            <ZoomableImage 
              src={encodeURI("/Array/Array expanding from size 3 to size 6 with arrows showing resizing, memory reallocation visualization.png")} 
              alt="Dynamic Array" 
              className="w-full h-auto rounded-xl border border-rose-200 shadow-sm"
            />
          </div>

          {/* Code Section Card */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-10 mt-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-4 text-indigo-600">
                    <Terminal className="w-5 h-5" />
                    <h2 className="text-2xl font-bold text-slate-900">Operations</h2>
                  </div>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    Basic array operations. Unlike linked lists, operations like insertion or deletion require shifting elements, making them O(n).
                  </p>
                  <div className="flex flex-col gap-2">
                    {ops.map(op => (
                      <button
                        key={op.id}
                        onClick={() => setActiveOp(op.id)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all",
                          activeOp === op.id 
                            ? "bg-slate-900 text-white shadow-xl translate-x-2" 
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {op.name}
                        <ChevronRight className={cn("w-4 h-4 transition-transform", activeOp === op.id ? "rotate-90" : "-rotate-0")} />
                      </button>
                    ))}
                  </div>
               </div>

               <div className="md:w-2/3">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeOp}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="bg-slate-950 rounded-3xl p-8 h-full min-h-[360px] text-slate-300 font-mono text-sm relative border border-slate-800 shadow-2xl"
                    >
                       <div className="absolute top-6 right-8 flex gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                       </div>
                       
                       {activeOp === "traversal" && (
                         <div className="space-y-4">
                           <span className="text-emerald-400"># Linear Traversal: O(n)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`arr = [10, 20, 30, 40]

for i in range(len(arr)):
    print(f"Index: {i}, Value: {arr[i]}")`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6">
                              <ZoomableImage 
                                src={encodeURI("/Array/Pointer moving from first element to last in an array, arrows showing traversal path.png")} 
                                alt="Traversal Diagram" 
                                className="w-full h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "insertion" && (
                         <div className="space-y-4">
                           <span className="text-emerald-400"># Shifting Elements: O(n)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`arr = [10, 20, 40, 50]
# Python built-in
arr.insert(2, 30)

# Manual shifting logic
arr = arr[:2] + [30] + arr[2:]`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6">
                              <ZoomableImage 
                                src={encodeURI("/Array/Array shifting elements to the right to insert a new value at index 2, step-by-step arrows.png")} 
                                alt="Insertion Diagram" 
                                className="w-full h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "deletion" && (
                         <div className="space-y-4">
                           <span className="text-rose-400"># Deletion: O(n) due to shifting left</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`arr = [10, 20, 30, 40]
# Python built-in
arr.pop(2)  # removes 30

# Manual shift
arr = arr[:2] + arr[3:]`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6">
                              <ZoomableImage 
                                src={encodeURI("/Array/Array with one element removed and remaining elements shifting left, clean visualization.png")} 
                                alt="Deletion Diagram" 
                                className="w-full h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "search" && (
                         <div className="space-y-4">
                           <span className="text-amber-400"># Binary Search (Sorted): O(log n)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`def binary_search(arr, key):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == key: return mid
        elif arr[mid] < key: low = mid + 1
        else: high = mid - 1
    return -1`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6">
                              <ZoomableImage 
                                src={encodeURI("/Array/Binary search dividing array into halves with mid pointer, step-by-step narrowing down search.png")} 
                                alt="Binary Search Diagram" 
                                className="w-full h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "update" && (
                         <div className="space-y-4">
                           <span className="text-teal-400"># Updating Element: O(1)</span>
                           <pre className="text-indigo-300 leading-relaxed">
{`arr = [10, 20, 30]

# Direct memory access makes updates fast
arr[1] = 99
print(arr)  # [10, 99, 30]`}
                           </pre>
                           <p className="text-xs text-slate-500 mt-6 leading-relaxed">
                             Updates are incredibly fast because the memory address is calculated instantly.
                           </p>
                         </div>
                       )}
                    </motion.div>
                 </AnimatePresence>
               </div>
            </div>
          </div>

          {/* Sparse Arrays Card */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
             <div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                    <Database className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Sparse Arrays</h3>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed mb-6">
                 Arrays where most elements are zero/empty. Often stored more efficiently using dictionaries in Python.
               </p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-4 mb-4">
                <ZoomableImage 
                  src={encodeURI("/Array/Large array with mostly zeros and few non-zero elements highlighted, sparse representation.png")} 
                  alt="Sparse Array" 
                  className="w-full h-auto rounded-xl border border-slate-200 shadow-sm"
                />
             </div>
             <div className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800">
{`arr = [0, 0, 0, 5, 0, 0, 3]

# Efficient storage mapping index -> value
sparse = {3: 5, 6: 3}`}
             </div>
          </div>

          {/* Performance Summary Card */}
           <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 shadow-sm">
             <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900">Complexity Matrix</h3>
             </div>
             <div className="space-y-3">
                {[
                  { op: "Access", val: "O(1)", color: "text-emerald-600 bg-emerald-500" },
                  { op: "Insertion", val: "O(n)", color: "text-rose-600 bg-rose-500" },
                  { op: "Deletion", val: "O(n)", color: "text-rose-600 bg-rose-500" },
                  { op: "Linear Search", val: "O(n)", color: "text-rose-600 bg-rose-500" },
                  { op: "Binary Search", val: "O(log n)", color: "text-amber-600 bg-amber-500" },
                ].map(item => (
                  <div key={item.op} className="flex justify-between items-center py-2 border-b border-indigo-100 last:border-0">
                    <span className="text-xs text-slate-600 font-semibold">{item.op}</span>
                    <span className={cn("text-[10px] font-mono font-bold px-2 py-0.5 bg-opacity-10 rounded-full", item.color)}>
                      {item.val}
                    </span>
                  </div>
                ))}
             </div>
          </div>

          {/* Real World Analogy Card */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <BookOpen className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-bold text-slate-900">Real-Life Analogy</h3>
             </div>
             <p className="text-sm text-slate-500 leading-relaxed mb-6">
               Think of an array as a row of connected lockers. Each locker has a specific number (index), and they are placed right next to each other.
             </p>
             <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-4">
                <ZoomableImage 
                  src={encodeURI("/Array/Row of lockers numbered sequentially with items inside, representing array indexing concept.png")} 
                  alt="Lockers Analogy" 
                  className="w-full h-auto rounded-xl border border-slate-200 shadow-sm mb-2"
                />
             </div>
             <div className="mt-6 bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800">
{`lockers = ["A", "B", "C", "D"]

for i in range(len(lockers)):
    print(f"Locker {i} has {lockers[i]}")`}
             </div>
          </div>

          {/* Circular Arrays Card */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                   <RotateCcw className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Circular Array</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Used to implement queues. We wrap around using modulo <code>%</code> operator when we hit the end of the array.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex justify-center mb-6">
              <ZoomableImage 
                src={encodeURI("/Array/Circular array in ring shape showing wrap-around indexing, arrows forming a loop.png")} 
                alt="Circular Array" 
                className="w-full max-w-[200px] h-auto rounded-xl"
              />
            </div>
            <div className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800">
{`arr = [1, 2, 3, 4]

index = 5
print(arr[index % len(arr)]) # wrap around`}
             </div>
          </div>

        </div>
      </main>

      <footer className="border-t border-slate-100 bg-white py-12">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2 opacity-30">
            <div className="bg-slate-400 w-6 h-6 rounded flex items-center justify-center text-white font-bold text-[10px]">
              C
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-400 uppercase">CodeHub</span>
          </div>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-wider text-slate-400">
             <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
             <a href="#" className="hover:text-indigo-600 transition-colors">Courses</a>
             <a href="#" className="hover:text-indigo-600 transition-colors">Community</a>
          </div>
          <p className="text-[10px] text-slate-300">© 2026 CodeHub Pro Learning Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
