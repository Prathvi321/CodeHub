import React, { useState } from "react";
import { ArrowLeft, BookOpen, Clock, Code, Info, Lightbulb, Terminal, AlertTriangle, Search, Layers, ChevronRight, RotateCcw, ArrowRight, Network, Cpu, LayoutGrid, Box, Database, FileDown, TableProperties, ListTree, Calculator, Zap, Eye, BarChart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import ZoomableImage from "@/src/components/ZoomableImage";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

interface NumpyDetailProps {
  onBack: () => void;
}

export default function NumpyDetail({ onBack }: NumpyDetailProps) {
  const [activeOp, setActiveOp] = useState("indexing");

  const ops = [
    { id: "indexing", name: "Indexing & Slicing", color: "indigo" },
    { id: "operations", name: "Operations & Broadcasting", color: "amber" },
    { id: "math", name: "Mathematical Functions", color: "emerald" },
    { id: "reshaping", name: "Reshaping & Transforms", color: "rose" },
    { id: "joining", name: "Joining & Splitting", color: "teal" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfd] selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      <Navbar variant="minimal" onNavigate={() => onBack()} />

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-12">
        {/* Bento Hero */}
        <header className="mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
             <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center gap-3">
              NumPy <Box className="w-10 h-10 text-blue-600" />
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg mb-6">
              The fundamental package for scientific computing with Python. High-performance multi-dimensional arrays and mathematical operations.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a 
              href="/Numpy/Numpy Handbook.pdf" 
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              <FileDown className="w-5 h-5" />
              Download Handbook
            </a>
          </motion.div>
        </header>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-16">
          
          {/* Main Content Card: ndarray */}
          <div className="md:col-span-2 md:row-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:border-blue-300 transition-all shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Core Concept: ndarray</h3>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Multi-dimensional array</p>
              </div>
            </div>
            
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              A homogeneous multi-dimensional array that is faster than Python lists due to contiguous memory allocation.
            </p>

            <div className="bg-slate-50 rounded-2xl p-2 mb-6 border border-slate-100 overflow-hidden flex-1 flex flex-col justify-center">
               <ZoomableImage 
                 src={encodeURI("/Numpy/3D visualization of numpy array showing dimensions, shape, and indexing with labeled axes and elements.png")} 
                 alt="NumPy ndarray" 
                 className="w-full h-auto rounded-xl shadow-sm object-cover max-h-[160px]"
               />
            </div>

            <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-blue-300 border border-slate-800">
{`import numpy as np
arr = np.array([[1,2,3],[4,5,6]])
print("Dimensions:", arr.ndim)
print("Shape:", arr.shape)
print("Size:", arr.size)`}
            </pre>
          </div>

          {/* Array Creation Card */}
          <div className="md:col-span-2 md:row-span-2 bg-blue-50 border border-blue-100 text-blue-900 rounded-[2.5rem] p-8 transition-all shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-2xl">
                    <LayoutGrid className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Array Creation</h3>
                    <p className="text-xs text-blue-700 font-bold uppercase tracking-widest">Methods</p>
                  </div>
                </div>
            </div>
            <p className="text-blue-800/80 text-sm mb-6 leading-relaxed">
              NumPy provides numerous built-in functions to create arrays efficiently, from ranges to random numbers and pre-filled structures.
            </p>
            <div className="bg-white/50 rounded-2xl p-2 mb-4 border border-blue-200 flex-1 flex flex-col justify-center">
              <ZoomableImage 
                src={encodeURI("/Numpy/visual comparison of numpy array creation methods: zeros, ones, arange, linspace, random with sample outputs.png")} 
                alt="Array Creation Methods" 
                className="w-full h-auto rounded-xl object-cover max-h-[160px]"
              />
            </div>
             <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-blue-300 border border-slate-800">
{`np.zeros((2,3))       # Fill with 0
np.ones((3,3))        # Fill with 1
np.arange(0,10,2)     # Step-based
np.linspace(0,1,5)    # Equal divisions`}
            </pre>
          </div>

          {/* Data Types Card */}
          <div className="md:col-span-2 bg-amber-50 border border-amber-100 rounded-[2.5rem] p-6 hover:bg-amber-100 transition-all shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-100 w-10 h-10 rounded-xl flex items-center justify-center text-amber-600">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900">Data Types Matter</h3>
              </div>
              <p className="text-xs text-amber-800/70 leading-tight mb-4">
                Smaller dtype (e.g. <code>int8</code> vs <code>int64</code>) → less memory → faster computation!
              </p>
            </div>
            <ZoomableImage 
              src={encodeURI("/Numpy/diagram comparing numpy data types like int, float, bool with memory size and examples.png")} 
              alt="Data Types" 
              className="w-full h-auto rounded-xl border border-amber-200 shadow-sm"
            />
          </div>

          {/* Performance Card */}
          <div className="md:col-span-2 bg-rose-50 border border-rose-100 rounded-[2.5rem] p-6 hover:bg-rose-100 transition-all shadow-sm overflow-hidden flex flex-col justify-between">
             <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-rose-100 w-10 h-10 rounded-xl flex items-center justify-center text-rose-600">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900">Performance Advantage</h3>
              </div>
              <p className="text-xs text-rose-800/70 leading-tight mb-4">
                NumPy operations are vectorized and written in C, making them significantly faster than standard Python list comprehensions.
              </p>
            </div>
            <ZoomableImage 
              src={encodeURI("/Numpy/performance comparison graph between python list operations and numpy array operations.png")} 
              alt="Performance Graph" 
              className="w-full h-auto rounded-xl border border-rose-200 shadow-sm"
            />
          </div>

          {/* Code Section Card */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-10 mt-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-4 text-blue-600">
                    <Terminal className="w-5 h-5" />
                    <h2 className="text-2xl font-bold text-slate-900">Operations in Depth</h2>
                  </div>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    Explore core array manipulations. Select an operation to see Python code examples alongside visual explanations.
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
                      className="bg-slate-950 rounded-3xl p-8 h-full min-h-[460px] text-slate-300 font-mono text-sm relative border border-slate-800 shadow-2xl flex flex-col"
                    >
                       <div className="absolute top-6 right-8 flex gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                       </div>
                       
                       {activeOp === "indexing" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-indigo-400"># Indexing & Slicing Arrays</span>
                           <pre className="text-blue-300 leading-relaxed mb-4 overflow-x-auto">
{`arr = np.array([[1,2,3],
                [4,5,6]])

print(arr[0,1])    # row 0, col 1 → 2
print(arr[:, 1:])  # all rows, from col 1 to end
print(arr[arr>2])  # boolean indexing filters values`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Numpy/matrix grid showing numpy indexing and slicing with highlighted selected elements.png")} 
                                alt="Indexing & Slicing" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[220px] object-cover"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "operations" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-amber-400"># Arithmetic & Broadcasting</span>
                           <pre className="text-blue-300 leading-relaxed mb-4 overflow-x-auto">
{`a = np.array([[1],[2],[3]])
b = np.array([10,20,30])

# Scalar automatically expands to match array shape
print(a + 10) 

# Shape expansion happens automatically!
print(a + b)`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Numpy/illustration of numpy broadcasting showing small array expanding to match larger array dimensions.png")} 
                                alt="Broadcasting Diagram" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[200px] object-cover"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "math" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-emerald-400"># Universal Math Functions</span>
                           <pre className="text-blue-300 leading-relaxed mb-4 overflow-x-auto">
{`# Basic Math
np.sqrt(arr)
np.log(arr)
np.exp(arr)

# Aggregate Functions
np.sum(arr)
np.mean(arr)
np.max(arr)
np.std(arr)`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Numpy/chart showing numpy mathematical operations like sin, log, sqrt applied to array values with graphs.png")} 
                                alt="Math Functions Diagram" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[180px] object-cover"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "reshaping" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-rose-400"># Reshaping & Transformations</span>
                           <pre className="text-blue-300 leading-relaxed mb-4 overflow-x-auto">
{`arr = np.array([1,2,3,4,5,6])

# Change shape
reshaped = arr.reshape(2,3)

# Flatten to 1D
reshaped.flatten()

# Transpose
reshaped.T`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Numpy/before and after visualization of numpy reshape, transpose, and flatten operations.png")} 
                                alt="Reshaping Diagram" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[220px] object-cover"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "joining" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-teal-400"># Joining & Splitting Arrays</span>
                           <pre className="text-blue-300 leading-relaxed mb-4 overflow-x-auto">
{`a = np.array([1,2])
b = np.array([3,4])

# Concatenate
np.concatenate((a,b))

# Stack
np.vstack((a,b)) # Vertical
np.hstack((a,b)) # Horizontal

# Split
np.split(arr, 2)`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Numpy/visual diagram showing array stacking vertically and horizontally and splitting into parts.png")} 
                                alt="Joining Diagram" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[220px] object-cover"
                              />
                           </div>
                         </div>
                       )}
                    </motion.div>
                 </AnimatePresence>
               </div>
            </div>
          </div>

          {/* Copies vs Views Card */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
             <div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Eye className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Copies vs Views</h3>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed mb-6">
                 A View shares memory with the original array. A Copy allocates new memory. Modify with care!
               </p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-4 mb-4">
                <ZoomableImage 
                  src={encodeURI("/Numpy/diagram showing difference between numpy copy and view with memory linkage.png")} 
                  alt="Copies vs Views" 
                  className="w-full h-auto rounded-xl border border-slate-200 shadow-sm"
                />
             </div>
             <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-blue-300 border border-slate-800 overflow-x-auto">
{`b = a.copy() # New memory
c = a.view() # Shared memory`}
             </pre>
          </div>

          {/* Random & Linear Algebra Card */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
             <div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Calculator className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Random & LinAlg</h3>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed mb-6">
                 Advanced capabilities like distributions and matrix multiplication are built-in.
               </p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-4 mb-4">
                <ZoomableImage 
                  src={encodeURI("/Numpy/graph showing random number distributions uniform vs normal distribution.png")} 
                  alt="Random Modules" 
                  className="w-full h-auto rounded-xl border border-slate-200 shadow-sm"
                />
             </div>
             <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-blue-300 border border-slate-800 overflow-x-auto">
{`# Random Distribution
np.random.randn(3)

# Dot Product
np.dot(matrix_a, matrix_b)`}
             </pre>
          </div>
          
          {/* Advanced Concepts / Summary Card */}
          <div className="md:col-span-4 bg-slate-900 text-white rounded-[2.5rem] p-10 hover:bg-slate-800 transition-all shadow-xl flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1">
               <div className="flex items-center gap-3 mb-4">
                 <div className="bg-white/10 p-3 rounded-2xl">
                   <Network className="w-6 h-6 text-blue-400" />
                 </div>
                 <h3 className="text-2xl font-bold">Advanced Topics & Summary</h3>
               </div>
               <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                 NumPy is foundational. Features like Universal Functions (ufuncs), memory layouts (C-order vs F-order), and masked arrays power Data Science and AI frameworks like PyTorch and TensorFlow.
               </p>
               <pre className="bg-slate-950 rounded-2xl p-4 text-xs font-mono text-blue-300 border border-slate-800 overflow-x-auto">
{`import numpy.ma as ma

# Masked Arrays hide invalid data
arr = ma.array([1,2,3], mask=[0,1,0])

# C-contiguous memory layout
arr = np.array([[1,2],[3,4]], order='C')`}
               </pre>
             </div>
             <div className="flex-1 w-full bg-white/5 rounded-3xl p-4 border border-white/10 flex justify-center items-center">
               <ZoomableImage 
                 src={encodeURI("/Numpy/advanced numpy concepts infographic including broadcasting, ufuncs, memory layout.png")} 
                 alt="Advanced Concepts" 
                 className="w-full max-w-sm h-auto rounded-xl"
               />
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
