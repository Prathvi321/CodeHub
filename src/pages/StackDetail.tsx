import React, { useState } from "react";
import { ArrowLeft, BookOpen, Clock, Terminal, ChevronRight, Layers, Box, Cpu, SplitSquareHorizontal, CornerUpLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import ZoomableImage from "@/src/components/ZoomableImage";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

interface StackDetailProps {
  onBack: () => void;
}

export default function StackDetail({ onBack }: StackDetailProps) {
  const [activeOp, setActiveOp] = useState("push");
  const [activeApp, setActiveApp] = useState("eval");

  const ops = [
    { id: "push", name: "Push (Insert)", color: "emerald" },
    { id: "pop", name: "Pop (Remove)", color: "rose" },
    { id: "peek", name: "Peek (Top)", color: "indigo" },
  ];

  const apps = [
    { id: "eval", name: "Expression Evaluation" },
    { id: "recursion", name: "Call Stack (Recursion)" },
    { id: "undo", name: "Undo/Redo" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfd] selection:bg-rose-100 selection:text-rose-900 font-sans">
      <Navbar variant="minimal" onNavigate={() => onBack()} />

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-12">
        {/* Bento Hero */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
             <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Stacks
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg">
              Master the Last-In-First-Out (LIFO) data structure. Explore implementations, core operations, and real-world algorithmic applications.
            </p>
          </motion.div>
        </header>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-16">
          
          {/* Main Content Card: What is a Stack? */}
          <div className="md:col-span-2 md:row-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:border-rose-300 transition-all shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">What is a Stack?</h3>
                <p className="text-xs text-rose-600 font-bold uppercase tracking-widest">LIFO Principle</p>
              </div>
            </div>
            
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              A linear data structure that follows the <strong>Last In, First Out (LIFO)</strong> principle. The last inserted element is always the first one to be removed, much like a stack of plates.
            </p>

            <div className="bg-slate-50 rounded-2xl p-2 mb-8 border border-slate-100 overflow-hidden">
               <ZoomableImage 
                 src={encodeURI("/Stack/Diagram showing stack data structure with vertical boxes labeled from bottom to top, with 'Top' pointer at the top, arrows showing push and pop operations, clean educational style.png")} 
                 alt="Stack Data Structure" 
                 className="w-full h-auto rounded-xl shadow-sm"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-rose-50/50 p-4 rounded-2xl text-xs">
                <span className="font-bold text-rose-900 block mb-1">Time Profile</span>
                <span className="text-rose-700">Push/Pop: O(1)</span>
              </div>
              <div className="bg-emerald-50/50 p-4 rounded-2xl text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Python Setup</span>
                <span className="text-emerald-700"><code>stack = []</code></span>
              </div>
            </div>
          </div>

          {/* Multiple Stacks Card */}
          <div className="md:col-span-2 bg-slate-900 text-white rounded-[2.5rem] p-8 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 cursor-pointer group flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                 <div className="bg-white/10 p-3 rounded-2xl">
                   <SplitSquareHorizontal className="w-6 h-6 text-rose-400" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 px-2 py-1 rounded">Memory Optimization</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Two Stacks in One Array</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Maximize memory efficiency by implementing two stacks in a single array, growing from opposite ends towards the middle.
              </p>
              <div className="bg-white/5 rounded-2xl p-2 mb-4 border border-white/10">
                <ZoomableImage 
                  src={encodeURI("/Stack/Diagram of two stacks implemented in one array, one growing from left and one from right, clearly labeled Stack1 and Stack2.png")} 
                  alt="Two Stacks in One Array" 
                  className="w-full h-auto rounded-xl opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Deque Card */}
          <div className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-6 hover:bg-amber-100 transition-all cursor-pointer shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="bg-amber-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-amber-600">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Deque (Double Ended)</h3>
              <p className="text-xs text-amber-800/70 leading-tight mb-4"><code>collections.deque</code> allows O(1) push/pop from both ends.</p>
            </div>
            <ZoomableImage 
              src={encodeURI("/Stack/Deque data structure diagram showing insertion and deletion from both front and rear ends, arrows on both sides.png")} 
              alt="Deque" 
              className="w-full h-auto rounded-xl border border-amber-200 shadow-sm"
            />
          </div>

          {/* Linked List Implementation Card */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-6 hover:bg-indigo-100 transition-all cursor-pointer shadow-sm overflow-hidden flex flex-col justify-between">
             <div className="bg-indigo-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Dynamic Sizing</h3>
              <p className="text-xs text-indigo-800/70 leading-tight mb-4">Stacks can be implemented via Linked Lists to avoid fixed size limits.</p>
            </div>
            <div className="bg-indigo-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-indigo-800">
{`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Top points to the head
self.top = new_node`}
            </div>
          </div>

          {/* Operations Section Card */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-10 mt-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-4 text-rose-600">
                    <Terminal className="w-5 h-5" />
                    <h2 className="text-2xl font-bold text-slate-900">Operations</h2>
                  </div>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    Explore fundamental stack operations. In Python, these are primarily done using list methods like <code>append()</code> and <code>pop()</code>.
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
                       
                       {activeOp === "push" && (
                         <div className="space-y-4">
                           <span className="text-emerald-400"># Push Operation: O(1)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`stack = []

def push(stack, value):
    stack.append(value)
    print(f"Pushed {value}, Stack: {stack}")

push(stack, 10)
push(stack, 20)`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6 flex justify-center">
                              <ZoomableImage 
                                src={encodeURI("/Stack/Step-by-step diagram of push operation in stack, showing element being added to top, arrow indicating insertion, before and after states.png")} 
                                alt="Push Operation" 
                                className="w-full max-w-sm h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "pop" && (
                         <div className="space-y-4">
                           <span className="text-rose-400"># Pop Operation: O(1)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`def pop(stack):
    if len(stack) == 0:
        print("Underflow")
    else:
        removed = stack.pop()
        print(f"Popped {removed}")

pop(stack)`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6 flex justify-center">
                              <ZoomableImage 
                                src={encodeURI("/Stack/Stack pop operation illustration, showing top element being removed with arrow, before and after states, clean diagram.png")} 
                                alt="Pop Operation" 
                                className="w-full max-w-sm h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "peek" && (
                         <div className="space-y-4">
                           <span className="text-indigo-400"># Peek Operation: O(1)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`def peek(stack):
    if len(stack) == 0:
        return None
    return stack[-1]

print("Top element is:", peek(stack))`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6 flex justify-center">
                              <ZoomableImage 
                                src={encodeURI("/Stack/Stack peek operation diagram highlighting the top element without removing it, labeled clearly.png")} 
                                alt="Peek Operation" 
                                className="w-full max-w-sm h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}
                    </motion.div>
                 </AnimatePresence>
               </div>
            </div>
          </div>

          {/* Applications Section Card */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-10 mt-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-4 text-emerald-600">
                    <BookOpen className="w-5 h-5" />
                    <h2 className="text-2xl font-bold text-slate-900">Applications</h2>
                  </div>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    Stacks are the backbone of many core computer science algorithms and system functionalities.
                  </p>
                  <div className="flex flex-col gap-2">
                    {apps.map(app => (
                      <button
                        key={app.id}
                        onClick={() => setActiveApp(app.id)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all",
                          activeApp === app.id 
                            ? "bg-slate-900 text-white shadow-xl translate-x-2" 
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {app.name}
                        <ChevronRight className={cn("w-4 h-4 transition-transform", activeApp === app.id ? "rotate-90" : "-rotate-0")} />
                      </button>
                    ))}
                  </div>
               </div>

               <div className="md:w-2/3">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeApp}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="bg-slate-950 rounded-3xl p-8 h-full min-h-[400px] text-slate-300 font-mono text-sm relative border border-slate-800 shadow-2xl"
                    >
                       <div className="absolute top-6 right-8 flex gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                       </div>
                       
                       {activeApp === "eval" && (
                         <div className="space-y-4">
                           <span className="text-emerald-400"># Postfix Expression Evaluation</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`def evaluate_postfix(expression):
    stack = []
    for ch in expression:
        if ch.isdigit():
            stack.append(int(ch))
        else:
            b = stack.pop()
            a = stack.pop()
            if ch == '+': stack.append(a + b)
            elif ch == '-': stack.append(a - b)
    return stack[0]`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6">
                              <ZoomableImage 
                                src={encodeURI("/Stack/Step-by-step conversion of infix expression to postfix using stack, with operators being pushed and popped, educational diagram.png")} 
                                alt="Expression Evaluation Diagram" 
                                className="w-full h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeApp === "recursion" && (
                         <div className="space-y-4">
                           <span className="text-rose-400"># Call Stack (Recursion Memory)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`def factorial(n):
    if n == 0:
        return 1
    # Each recursive call is pushed to the stack
    return n * factorial(n-1)

print(factorial(5))`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6 flex justify-center">
                              <ZoomableImage 
                                src={encodeURI("/Stack/Call stack diagram showing recursive function calls stacked on top of each other with return sequence.png")} 
                                alt="Call Stack Diagram" 
                                className="w-full max-w-sm h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeApp === "undo" && (
                         <div className="space-y-4">
                           <span className="text-indigo-400"># Undo/Redo Simulation</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`undo_stack, redo_stack = [], []

def perform(action):
    undo_stack.append(action)
    redo_stack.clear()

def undo():
    if undo_stack:
        redo_stack.append(undo_stack.pop())

def redo():
    if redo_stack:
        undo_stack.append(redo_stack.pop())`}
                           </pre>
                         </div>
                       )}
                    </motion.div>
                 </AnimatePresence>
               </div>
            </div>
          </div>

          {/* Performance Summary Card */}
           <div className="md:col-span-2 bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8 shadow-sm">
             <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-slate-900">Complexity Matrix</h3>
             </div>
             <div className="space-y-3">
                {[
                  { op: "Push", val: "O(1)", color: "text-emerald-600 bg-emerald-500" },
                  { op: "Pop", val: "O(1)", color: "text-emerald-600 bg-emerald-500" },
                  { op: "Peek", val: "O(1)", color: "text-emerald-600 bg-emerald-500" },
                  { op: "Search", val: "O(n)", color: "text-rose-600 bg-rose-500" },
                ].map(item => (
                  <div key={item.op} className="flex justify-between items-center py-2 border-b border-rose-100 last:border-0">
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
                  <CornerUpLeft className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-bold text-slate-900">Advanced: Monotonic Stack</h3>
             </div>
             <p className="text-sm text-slate-500 leading-relaxed mb-6">
               A stack whose elements are strictly increasing or decreasing. Extremely useful for "Next Greater Element" problems.
             </p>
             <div className="mt-6 bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800">
{`def next_greater(arr):
    stack, result = [], [-1] * len(arr)
    for i in range(len(arr)):
        while stack and arr[i] > arr[stack[-1]]:
            result[stack.pop()] = arr[i]
        stack.append(i)
    return result`}
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
