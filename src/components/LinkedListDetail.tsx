import React, { useState } from "react";
import { ArrowLeft, BookOpen, Clock, Code, Info, Lightbulb, Terminal, AlertTriangle, Search, Layers, ChevronRight, RotateCcw, ArrowRight, Network, Cpu, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import ZoomableImage from "./ZoomableImage";

interface LinkedListDetailProps {
  onBack: () => void;
}

export default function LinkedListDetail({ onBack }: LinkedListDetailProps) {
  const [activeOp, setActiveOp] = useState("traversal");

  const ops = [
    { id: "traversal", name: "Traversal", color: "indigo" },
    { id: "insertion", name: "Insertion", color: "emerald" },
    { id: "deletion", name: "Deletion", color: "rose" },
    { id: "search", name: "Searching", color: "amber" },
    { id: "reverse", name: "Reversal", color: "indigo" },
    { id: "sort", name: "Sorting", color: "teal" },
    { id: "concat", name: "Concat/Split", color: "purple" },
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
              Linked Lists <span className="text-indigo-600">Visual Guide</span>
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg">
              Master the linear structure where every element points to its neighbor. 
              Interactive guides for singly, doubly, and circular linked lists.
            </p>
          </motion.div>
        </header>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-16">
          
          {/* Main Content Card: Singly Linked List */}
          <div className="md:col-span-2 md:row-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:border-indigo-300 transition-all shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Singly Linked List</h3>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">Base Structure</p>
              </div>
            </div>
            
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              The simplest form. Each node contains <strong>data</strong> and a <strong>next</strong> pointer. 
              The traversal is one-way, concluding with a <code>NULL</code> terminator.
            </p>

            {/* Visual Diagram: Singly */}
            <div className="bg-slate-50 rounded-2xl p-2 mb-8 border border-slate-100 overflow-hidden">
               <ZoomableImage 
                 src={encodeURI("/Linked List/a clean educational diagram of a singly linked list on a white background. Show a head pointer pointing to three nodes. Each node should be a rectangle with two fields: data and next. Use arrows to connect the nodes from left to right.png")} 
                 alt="Singly Linked List Diagram" 
                 className="w-full h-auto rounded-xl shadow-sm"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50/50 p-4 rounded-2xl text-xs">
                <span className="font-bold text-indigo-900 block mb-1">Time Profile</span>
                <span className="text-indigo-700">Access: O(n) | Search: O(n)</span>
              </div>
              <div className="bg-emerald-50/50 p-4 rounded-2xl text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Best For</span>
                <span className="text-emerald-700">Stacks & Queues</span>
              </div>
            </div>
          </div>

          {/* Doubly Linked List Card */}
          <div className="md:col-span-2 bg-slate-900 text-white rounded-[2.5rem] p-8 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 cursor-pointer group flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                 <div className="bg-white/10 p-3 rounded-2xl">
                   <Network className="w-6 h-6 text-indigo-400" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">Bidirectional</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Doubly Linked List</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Nodes carry <strong>prev</strong> and <strong>next</strong> pointers. 
                Ideal for browser history or undo functions.
              </p>
              <div className="bg-white/5 rounded-2xl p-2 mb-4 border border-white/10">
                <ZoomableImage 
                  src={encodeURI("/Linked List/a doubly linked list in a neat educational style. Each node must have three compartments labeled prev, data, and next. Show bidirectional arrows between nodes. Include NULL at both ends. Use three nodes with values 5, 15, and 25.png")} 
                  alt="Doubly Linked List" 
                  className="w-full h-auto rounded-xl opacity-90"

                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
               <div className="h-2 w-12 bg-indigo-500 rounded-full" />
               <div className="h-2 w-8 bg-indigo-300 rounded-full" />
               <div className="h-2 w-16 bg-white rounded-full" />
               <div className="h-2 w-6 bg-indigo-400 rounded-full" />
            </div>
          </div>

          {/* Circular Linked List Card */}
          <div className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-6 hover:bg-amber-100 transition-all cursor-pointer shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="bg-amber-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-amber-600">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Circular List</h3>
              <p className="text-xs text-amber-800/70 leading-tight mb-4">Last node points back to the head node. Perfect for round-robin tasks.</p>
            </div>
            <ZoomableImage 
              src={encodeURI("/Linked List/a circular singly linked list diagram on a white background. Show three nodes connected in a loop, with the last node pointing back to the first node. Use a head pointer and label the nodes 1, 2, and 3. Make the circular arrow very clear.png")} 
              alt="Circular List" 
              className="w-full h-auto rounded-xl border border-amber-200 shadow-sm"
            />
          </div>

          {/* Header Linked List Card */}
          <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-6 hover:bg-rose-100 transition-all cursor-pointer shadow-sm overflow-hidden flex flex-col justify-between">
             <div className="bg-rose-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-rose-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Header List</h3>
              <p className="text-xs text-rose-800/70 leading-tight mb-4">Uses a special sentinel node to simplify edge cases in insertions.</p>
            </div>
            <ZoomableImage 
              src={encodeURI("/Linked List/a header linked list diagram showing a special header node at the beginning that points to regular data nodes. The header node should be visually different, labeled ‘Header’. Show it pointing to nodes 100, 200, and 300.png")} 
              alt="Header List" 
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
                    Linked lists shine when it comes to modifications. 
                    Unlike arrays, there's no expensive element shifting when handling large data.
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
                           <pre className="text-indigo-300 leading-relaxed">
{`def traverse(self):
    temp = self.head
    while temp:
        print(temp.data)
        temp = temp.next`}
                           </pre>
                           <div className="mt-12 pt-8 border-t border-slate-800/50">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-4">Mechanism</span>
                              <div className="grid grid-cols-2 gap-4">
                                 {["Set current to head", "Read current data", "Move to next", "Stop if NULL"].map((s, i) => (
                                   <div key={i} className="flex gap-2 text-[11px]">
                                     <span className="text-indigo-500 font-bold">{i+1}.</span>
                                     <span className="text-slate-400">{s}</span>
                                   </div>
                                 ))}
                              </div>
                           </div>
                         </div>
                       )}

                       {activeOp === "insertion" && (
                         <div className="space-y-4">
                           <span className="text-emerald-400"># O(1) Head Insertion</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`def insert_at_beginning(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6">
                              <ZoomableImage 
                                src={encodeURI("/Linked List/a step-by-step educational diagram showing insertion at the beginning of a singly linked list. Show the list before insertion, then a new node being created, then pointer changes, then the final list.png")} 
                                alt="Insertion Diagram" 
                                className="w-full h-auto rounded-xl opacity-90"
              
                              />
                           </div>
                           <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                             <div className="flex gap-3 items-center">
                               <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                 <Lightbulb className="w-4 h-4 text-emerald-500" />
                               </div>
                               <p className="text-xs text-emerald-200/70 italic">Highly efficient for stacking operations where ordering matters.</p>
                             </div>
                           </div>
                         </div>
                       )}

                       {activeOp === "deletion" && (
                         <div className="space-y-4">
                           <span className="text-rose-400"># Deletion: Pointer Bypass</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`def delete_by_val(self, key):
    while temp.next:
        if temp.next.data == key:
            temp.next = temp.next.next
            return`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6">
                              <ZoomableImage 
                                src={encodeURI("/Linked List/a clean instructional diagram showing deletion of a middle node from a singly linked list. Show the list before deletion, highlight the node to delete in red or a different shade, then show pointer bypassing it, and finally the updated list.png")} 
                                alt="Deletion Diagram" 
                                className="w-full h-auto rounded-xl opacity-90"
              
                              />
                           </div>
                           <div className="mt-8 p-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                              <div className="flex gap-3 items-start">
                                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-rose-200/70 font-medium">Bypassing a node effectively ignores it in the chain, allowing the garbage collector to reclaim memory.</p>
                              </div>
                           </div>
                         </div>
                       )}

                       {activeOp === "reverse" && (
                         <div className="space-y-4">
                           <span className="text-indigo-400"># Reverse with 3 Pointer Swaps</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`while current:
    nxt = current.next
    current.next = prev
    prev = current
    current = nxt`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mb-6">
                              <ZoomableImage 
                                src={encodeURI("/Linked List/a step-by-step linked list reversal diagram. Show a singly linked list 10 -> 20 -> 30 -> NULL. Then illustrate pointer changes using prev, current, and next pointers. Show the final reversed list as 30 -> 20 -> 10 -> NULL.png")} 
                                alt="Reversal Diagram" 
                                className="w-full h-auto rounded-xl opacity-90"
              
                              />
                           </div>
                           <div className="flex gap-3 mt-10">
                              {["Prev", "Curr", "Next"].map(ptr => (
                                <div key={ptr} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">
                                   {ptr}_ptr
                                </div>
                              ))}
                           </div>
                         </div>
                       )}

                       {activeOp === "search" && (
                         <div className="space-y-4">
                           <span className="text-amber-400"># Sequential Scan: O(n)</span>
                           <pre className="text-indigo-300 leading-relaxed">
{`def find(self, target):
    temp = self.head
    while temp:
        if temp.data == target:
            return True
        temp = temp.next
    return False`}
                           </pre>
                           <p className="text-xs text-slate-500 mt-6 leading-relaxed">
                             Linear search is the only option as linked lists don't support random access (indexing).
                           </p>
                         </div>
                       )}

                       {activeOp === "sort" && (
                         <div className="space-y-4">
                           <span className="text-teal-400"># Merge Sort: O(n log n)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`def merge_sort(head):
    if not head or not head.next: return head
    mid = get_middle(head)
    right_half = mid.next
    mid.next = None  # split
    left = merge_sort(head)
    right = merge_sort(right_half)
    return sorted_merge(left, right)`}
                           </pre>
                           <p className="text-xs text-slate-500 mt-6 leading-relaxed">
                             Merge sort is preferred over quicksort for linked lists as it relies on sequential access.
                           </p>
                         </div>
                       )}

                       {activeOp === "concat" && (
                         <div className="space-y-4">
                           <span className="text-purple-400"># Concatenation: O(n)</span>
                           <pre className="text-indigo-300 leading-relaxed mb-6">
{`def concatenate(head1, head2):
    if not head1: return head2
    temp = head1
    while temp.next:
        temp = temp.next
    temp.next = head2
    return head1`}
                           </pre>
                           <p className="text-xs text-slate-500 mt-6 leading-relaxed">
                             Connecting two lists simply involves traversing to the tail of the first and linking it to the head of the second.
                           </p>
                         </div>
                       )}
                    </motion.div>
                 </AnimatePresence>
               </div>
            </div>
          </div>

          {/* Additional Advanced Concepts Card */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
             <div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                    <Cpu className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Floyd's Algorithm</h3>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed mb-6">
                 Detect cycles in a list using the <strong className="text-slate-900">Slow & Fast pointer</strong> technique (also known as Tortoise and Hare).
               </p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-4">
                <ZoomableImage 
                  src={encodeURI("/Linked List/a circular doubly linked list diagram in a clean educational style. Show nodes with prev, data, and next fields. Make arrows go both forward and backward between nodes, and show the last node linking back to the first node, forming a loop.png")} 
                  alt="Circular Doubly Linked List" 
                  className="w-full h-auto rounded-xl border border-slate-200 shadow-sm mb-2"

                />
                <div className="flex items-center gap-4 w-full">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                  <div className="flex-1 h-0.5 bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="text-[10px] font-bold text-slate-400">Cycle Detected</div>
                </div>
             </div>
             <div className="mt-6 bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800">
{`def detect_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast: return True
    return False`}
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
                  { op: "Head Insertion", val: "O(1)", color: "text-emerald-600 bg-emerald-500" },
                  { op: "Tail Insertion", val: "O(n)", color: "text-rose-600 bg-rose-500" },
                  { op: "Search", val: "O(n)", color: "text-rose-600 bg-rose-500" },
                  { op: "Sorting (Merge)", val: "O(n log n)", color: "text-amber-600 bg-amber-500" },
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

          {/* Real World Applications Card */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <LayoutGrid className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-bold text-slate-900">Real-world Use</h3>
             </div>
             <div className="grid grid-cols-2 gap-3">
               {[
                 { title: "Browser History", desc: "Doubly Linked List", color: "bg-blue-50 text-blue-700" },
                 { title: "Music Playlists", desc: "Circular List", color: "bg-purple-50 text-purple-700" },
                 { title: "Undo/Redo", desc: "Two Stacks / Lists", color: "bg-rose-50 text-rose-700" },
                 { title: "Image Gallery", desc: "Next/Prev arrows", color: "bg-emerald-50 text-emerald-700" },
               ].map(app => (
                 <div key={app.title} className={cn("p-4 rounded-2xl border border-transparent hover:border-slate-100 transition-colors", app.color)}>
                    <p className="font-bold text-[11px] mb-1">{app.title}</p>
                    <p className="text-[10px] opacity-70 leading-tight">{app.desc}</p>
                 </div>
               ))}
             </div>
          </div>

          {/* Finding Middle Node Card */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                   <Search className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Find Middle</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Use two pointers: <strong className="text-slate-900 italic">Slow</strong> (1 step) and <strong className="text-slate-900 italic">Fast</strong> (2 steps). When Fast hits the end, Slow is at the middle.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center h-20 gap-2 border border-slate-100">
               {[1, 2, "Mid", 4, 5].map((val, i) => (
                 <div key={i} className={cn("flex-1 h-10 rounded-lg flex items-center justify-center font-mono text-xs border-2", val === "Mid" ? "bg-amber-100 border-amber-400 text-amber-700 font-bold" : "bg-white border-slate-200 text-slate-400")}>
                   {val}
                 </div>
               ))}
            </div>
            <div className="mt-6 bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800">
{`def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow.data`}
             </div>
          </div>

          {/* Palindrome Card */}
          <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                   <Code className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Check Palindrome</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Optimal approach <strong className="text-slate-900">O(1) space</strong>: Find the middle node, reverse the second half of the list, and compare both halves sequentially.
              </p>
            </div>
            <div className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800">
{`def is_palindrome(head):
    # 1. Find middle using slow/fast
    # 2. Reverse the second half
    # 3. Compare first and second half
    # 4. (Optional) Restore list
    return left.data == right.data`}
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
