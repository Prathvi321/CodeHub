import React, { useState } from "react";
import { ArrowLeft, BookOpen, Clock, Terminal, ChevronRight, Layers, Box, Cpu, SplitSquareHorizontal, CornerUpLeft, Network, RotateCcw, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import ZoomableImage from "@/src/components/ZoomableImage";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

interface QueueDetailProps {
  onBack: () => void;
}

export default function QueueDetail({ onBack }: QueueDetailProps) {
  const [activeOp, setActiveOp] = useState("enqueue");
  const [activeType, setActiveType] = useState("circular");

  const ops = [
    { id: "enqueue", name: "Enqueue (Insert)", color: "emerald" },
    { id: "dequeue", name: "Dequeue (Remove)", color: "rose" },
    { id: "peek", name: "Peek & Check", color: "indigo" },
  ];

  const types = [
    { id: "circular", name: "Circular Queue" },
    { id: "linkedlist", name: "Linked List Queue" },
    { id: "priority", name: "Priority Queue & Deque" },
    { id: "bfs", name: "BFS Algorithm" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfd] selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      <Navbar variant="minimal" onNavigate={() => onBack()} />

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-12">
        {/* Bento Hero */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
             <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Queues
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg">
              Master the First-In-First-Out (FIFO) data structure. Explore implementations, core operations, and real-world algorithmic applications like BFS.
            </p>
          </motion.div>
        </header>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-16">
          
          {/* Main Content Card: What is a Queue? */}
          <div className="md:col-span-2 md:row-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:border-indigo-300 transition-all shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">What is a Queue?</h3>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">FIFO Principle</p>
              </div>
            </div>
            
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              A linear data structure that follows the <strong>First In, First Out (FIFO)</strong> principle. The element inserted first will be removed first, just like a line at a ticket counter.
            </p>

            <div className="bg-slate-50 rounded-2xl p-2 mb-8 border border-slate-100 overflow-hidden">
               <ZoomableImage 
                 src={encodeURI("/Queue/diagram of a Queue data structure showing FIFO principle. Show elements entering from the Rear and exiting from the Front. Use arrows to indicate movement. Include labels: Front, Rear, Enqueue, Dequeue.png")} 
                 alt="Queue Data Structure" 
                 className="w-full h-auto rounded-xl shadow-sm"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50/50 p-4 rounded-2xl text-xs">
                <span className="font-bold text-indigo-900 block mb-1">Time Profile</span>
                <span className="text-indigo-700">Enqueue/Dequeue: O(1)</span>
              </div>
              <div className="bg-emerald-50/50 p-4 rounded-2xl text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Python Setup</span>
                <span className="text-emerald-700"><code>queue = []</code></span>
              </div>
            </div>
          </div>

          {/* Array Implementation Card */}
          <div className="md:col-span-2 bg-slate-900 text-white rounded-[2.5rem] p-8 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 cursor-pointer group flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                 <div className="bg-white/10 p-3 rounded-2xl">
                   <SplitSquareHorizontal className="w-6 h-6 text-indigo-400" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">Memory Model</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Queue Using Array</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Array implementation uses fixed memory and index positions. Insertion happens at the <strong>Rear</strong>, and deletion at the <strong>Front</strong>.
              </p>
              <div className="bg-white/5 rounded-2xl p-2 mb-4 border border-white/10">
                <ZoomableImage 
                  src={encodeURI("/Queue/a simple linear queue illustration showing enqueue and dequeue operations from opposite ends. Include array representation with Front and Rear pointers.png")} 
                  alt="Array Queue" 
                  className="w-full h-auto rounded-xl opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Linear Queue Problem Card */}
          <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-6 hover:bg-rose-100 transition-all cursor-pointer shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="bg-rose-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-rose-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Linear Queue Limit</h3>
              <p className="text-xs text-rose-800/70 leading-tight mb-4">Empty spaces cannot be reused after deletions, causing false overflow.</p>
            </div>
            <ZoomableImage 
              src={encodeURI("/Queue/a side-by-side comparison diagram showing memory wastage in a linear queue implemented using arrays. Show deleted spaces at beginning and false overflow condition.png")} 
              alt="Memory Wastage" 
              className="w-full h-auto rounded-xl border border-rose-200 shadow-sm"
            />
          </div>

          {/* Stack vs Queue Comparison Card */}
          <div className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-6 hover:bg-amber-100 transition-all cursor-pointer shadow-sm overflow-hidden flex flex-col justify-between">
             <div className="bg-amber-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-amber-600">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Stack vs Queue</h3>
              <p className="text-xs text-amber-800/70 leading-tight mb-4">LIFO (Stack) vs FIFO (Queue) paradigms comparison.</p>
            </div>
            <ZoomableImage 
              src={encodeURI("/Queue/a side-by-side comparison infographic of Stack and Queue data structures. Show LIFO vs FIFO behavior visually using arrows and labeled examples.png")} 
              alt="Stack vs Queue" 
              className="w-full h-auto rounded-xl border border-amber-200 shadow-sm"
            />
          </div>

          {/* Operations Section Card */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-10 mt-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-4 text-indigo-600">
                    <Terminal className="w-5 h-5" />
                    <h2 className="text-2xl font-bold text-slate-900">Operations</h2>
                  </div>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    Explore fundamental queue operations. In Python, these are primarily done using list methods like <code>append()</code> and <code>pop(0)</code>, though <code>collections.deque</code> is more efficient.
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
                       
                       {activeOp === "enqueue" && (
                         <div className="space-y-4">
                           <span className="text-emerald-400"># Enqueue Operation: O(1)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`queue = []

# Adds element at rear
queue.append(10)
queue.append(20)
queue.append(30)

print("Queue:", queue)
# Output: [10, 20, 30]`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6 flex justify-center">
                              <ZoomableImage 
                                src={encodeURI("/Queue/infographic showing Queue operations: Enqueue and Dequeue. Show step-by-step movement of elements with arrows. Highlight Front and Rear pointers. Include before and after states.png")} 
                                alt="Enqueue Operation" 
                                className="w-full h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "dequeue" && (
                         <div className="space-y-4">
                           <span className="text-rose-400"># Dequeue Operation: O(1)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`queue = [10, 20, 30]

# Removes element from front
removed = queue.pop(0)

print("Removed:", removed) # 10
print("Queue:", queue) # [20, 30]`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6 flex justify-center">
                              <ZoomableImage 
                                src={encodeURI("/Queue/an educational diagram showing Queue Overflow and Underflow conditions. Use warning symbols and array queue visualization.png")} 
                                alt="Underflow and Overflow" 
                                className="w-full max-w-md h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "peek" && (
                         <div className="space-y-4">
                           <span className="text-indigo-400"># Peek & Checks: O(1)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`queue = [10, 20, 30]

# Peek (front element)
print("Front Element:", queue[0])

# isEmpty check
if len(queue) == 0:
    print("Queue is Empty")

# isFull check (fixed size)
MAX = 5
if len(queue) == MAX:
    print("Queue Full")`}
                           </pre>
                         </div>
                       )}
                    </motion.div>
                 </AnimatePresence>
               </div>
            </div>
          </div>

          {/* Queue Types Section Card */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-10 mt-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-4 text-emerald-600">
                    <BookOpen className="w-5 h-5" />
                    <h2 className="text-2xl font-bold text-slate-900">Advanced Concepts</h2>
                  </div>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    Explore queue variations that solve linear memory limits and how they're applied in core graph algorithms.
                  </p>
                  <div className="flex flex-col gap-2">
                    {types.map(app => (
                      <button
                        key={app.id}
                        onClick={() => setActiveType(app.id)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all",
                          activeType === app.id 
                            ? "bg-slate-900 text-white shadow-xl translate-x-2" 
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {app.name}
                        <ChevronRight className={cn("w-4 h-4 transition-transform", activeType === app.id ? "rotate-90" : "-rotate-0")} />
                      </button>
                    ))}
                  </div>
               </div>

               <div className="md:w-2/3">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeType}
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
                       
                       {activeType === "circular" && (
                         <div className="space-y-4">
                           <span className="text-emerald-400"># Circular Queue Implementation</span>
                           <p className="text-xs text-slate-400">Connects last index to first index. Better memory usage, avoids false overflow.</p>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`class CircularQueue:
    def __init__(self, size):
        self.size = size
        self.queue = [None] * size
        self.front, self.rear = -1, -1

    def enqueue(self, data):
        if (self.rear + 1) % self.size == self.front:
            print("Queue Full")
            return
        if self.front == -1: self.front = 0
        self.rear = (self.rear + 1) % self.size
        self.queue[self.rear] = data`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6">
                              <ZoomableImage 
                                src={encodeURI("/Queue/a circular queue visualization using an array arranged in circular form. Show Front and Rear movement wrapping around. Include enqueue and dequeue operations with circular arrows.png")} 
                                alt="Circular Queue Diagram" 
                                className="w-full h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeType === "linkedlist" && (
                         <div className="space-y-4">
                           <span className="text-rose-400"># Queue Using Linked List</span>
                           <p className="text-xs text-slate-400">Dynamic memory, no capacity limit. Extra pointer memory.</p>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`class QueueLinkedList:
    def __init__(self):
        self.front = self.rear = None

    def enqueue(self, data):
        new_node = Node(data)
        if self.rear is None:
            self.front = self.rear = new_node
            return
        self.rear.next = new_node
        self.rear = new_node`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6 flex justify-center">
                              <ZoomableImage 
                                src={encodeURI("/Queue/a detailed linked-list based queue diagram. Show nodes connected with arrows. Mark Front and Rear pointers clearly. Each node should contain data and next pointer sections.png")} 
                                alt="Linked List Queue" 
                                className="w-full h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeType === "priority" && (
                         <div className="space-y-4">
                           <span className="text-amber-400"># Priority Queue & Deque</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`import heapq
# Priority Queue (Min Heap)
pq = []
heapq.heappush(pq, 3)
heapq.heappush(pq, 1)
print(heapq.heappop(pq)) # Output: 1

from collections import deque
# Deque (Double Ended Queue)
dq = deque()
dq.append(10)
dq.appendleft(5)
dq.pop()
dq.popleft()`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6">
                              <ZoomableImage 
                                src={encodeURI("/Queue/a detailed Double Ended Queue (Deque) diagram showing insertion and deletion from both front and rear ends.png")} 
                                alt="Deque Diagram" 
                                className="w-full h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}

                       {activeType === "bfs" && (
                         <div className="space-y-4">
                           <span className="text-sky-400"># BFS Algorithm (Breadth First Search)</span>
                           <p className="text-xs text-slate-400">Queue is used for level-by-level traversal in graphs/trees.</p>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`from collections import deque

queue = deque([start_node])
visited = set([start_node])

while queue:
    node = queue.popleft()
    print(node, end=" ")
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            visited.add(neighbor)
            queue.append(neighbor)`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6">
                              <ZoomableImage 
                                src={encodeURI("/Queue/a graph traversal illustration showing BFS using a queue. Show nodes visited level-by-level with queue state updates at each step.png")} 
                                alt="BFS Diagram" 
                                className="w-full h-auto rounded-xl opacity-90"
                              />
                           </div>
                         </div>
                       )}
                    </motion.div>
                 </AnimatePresence>
               </div>
            </div>
          </div>

          {/* Applications Summary Card */}
          <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <Network className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-bold text-slate-900">Queue Applications</h3>
             </div>
             <p className="text-sm text-slate-500 leading-relaxed mb-6">
               Where queues shine in the real world and systems design.
             </p>
             <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center gap-4 border border-indigo-50">
                <ZoomableImage 
                  src={encodeURI("/Queue/a collage infographic showing real-world applications of queues: printer queue, CPU scheduling, BFS graph traversal, call center waiting system, keyboard buffer..png")} 
                  alt="Applications of Queue" 
                  className="w-full h-auto rounded-xl shadow-sm mb-2"
                />
             </div>
          </div>

          {/* Performance Summary Card */}
           <div className="md:col-span-2 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-8 shadow-sm">
             <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900">Complexity Matrix</h3>
             </div>
             <div className="space-y-3">
                {[
                  { op: "Enqueue", val: "O(1)", color: "text-emerald-600 bg-emerald-500" },
                  { op: "Dequeue", val: "O(1)", color: "text-emerald-600 bg-emerald-500" },
                  { op: "Peek", val: "O(1)", color: "text-emerald-600 bg-emerald-500" },
                  { op: "Search", val: "O(n)", color: "text-rose-600 bg-rose-500" },
                ].map(item => (
                  <div key={item.op} className="flex justify-between items-center py-2 border-b border-emerald-100 last:border-0">
                    <span className="text-xs text-slate-600 font-semibold">{item.op}</span>
                    <span className={cn("text-[10px] font-mono font-bold px-2 py-0.5 bg-opacity-10 rounded-full", item.color)}>
                      {item.val}
                    </span>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
