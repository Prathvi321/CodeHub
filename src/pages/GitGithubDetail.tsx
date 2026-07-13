import React, { useState } from "react";
import { ArrowLeft, BookOpen, Clock, Code, Info, Lightbulb, Terminal, AlertTriangle, Search, Layers, ChevronRight, RotateCcw, ArrowRight, Network, Cpu, LayoutGrid, Box, Database, FileDown, GitBranch, GitCommit, GitMerge, GitPullRequest, Github, HardDrive } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import ZoomableImage from "@/src/components/ZoomableImage";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

interface GitGithubDetailProps {
  onBack: () => void;
}

export default function GitGithubDetail({ onBack }: GitGithubDetailProps) {
  const [activeTab, setActiveTab] = useState("remote");

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
              Git & GitHub <Github className="w-10 h-10 text-slate-800" />
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg mb-6">
              A step-by-step, command-driven guide. Master Git through practical CLI commands and real-world scenarios.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a 
              href="/Git and Github/Git and Github Booklet.pdf" 
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
            >
              <FileDown className="w-5 h-5" />
              Download Handbook
            </a>
          </motion.div>
        </header>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-16">
          
          {/* Card 1: What is Git? */}
          <div className="md:col-span-2 md:row-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:border-indigo-300 transition-all shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                <GitCommit className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">What is Git? (Hands-on)</h3>
                <p className="text-xs text-rose-600 font-bold uppercase tracking-widest">Snapshots, Not Diffs</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Git stores <strong>snapshots</strong> of your files. Every commit represents the full state of your project at that point in time.
            </p>
            <div className="bg-slate-50 rounded-2xl p-2 mb-6 border border-slate-100 flex-1 flex flex-col justify-center">
               <ZoomableImage 
                 src={encodeURI("/Git and Github/Commit process visualization showing staged files turning into a commit snapshot with unique hash.png")} 
                 alt="Commit process visualization showing staged files turning into a commit snapshot with unique hash" 
                 className="w-full h-auto rounded-xl shadow-sm object-cover"
               />
            </div>
            <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800 overflow-x-auto">
{`# 1. Initialize a Repository
mkdir my-project
cd my-project
git init  # Creates a .git folder

# 2. Create First Snapshot
echo "print('Hello')" > app.py
git add app.py
git commit -m "Initial commit"`}
            </pre>
          </div>

          {/* Card 2: What is GitHub? */}
          <div className="md:col-span-2 md:row-span-2 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 transition-all shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">What is GitHub?</h3>
                <p className="text-xs text-indigo-700 font-bold uppercase tracking-widest">Remote Storage & Collab</p>
              </div>
            </div>
            <p className="text-indigo-800/80 text-sm mb-6 leading-relaxed">
              GitHub provides remote hosting for your Git repositories, enabling collaboration, backup, and code review.
            </p>
            <div className="bg-white/50 rounded-2xl p-2 mb-6 border border-indigo-200 flex-1 flex flex-col justify-center">
              <ZoomableImage 
                src={encodeURI("/Git and Github/Visual comparison between Git local repository and GitHub remote repository connected via internet arrows.png")} 
                alt="Visual comparison between Git local repository and GitHub remote repository connected via internet arrows" 
                className="w-full h-auto rounded-xl shadow-sm object-cover"
              />
            </div>
             <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800 overflow-x-auto">
{`# Connect local repo to GitHub
git remote add origin https://github.com/username/repo.git

# Push code (local commits -> GitHub)
git push -u origin main

# Clone an existing remote repo
git clone https://github.com/username/repo.git`}
            </pre>
          </div>

          {/* Card 3: Git Architecture */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1 w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Git Architecture</h3>
                </div>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Git separates changes into three distinct areas: Working Directory, Staging Area, and Repository.
                </p>
                <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800 overflow-x-auto">
{`# 1. Working Directory (making changes)
echo "New line" >> app.py
git status

# 2. Staging Area (preparing changes)
git add app.py

# 3. Local Repository (saving changes)
git commit -m "Updated app.py"`}
                </pre>
             </div>
             <div className="flex-1 w-full md:w-1/2 bg-slate-50 rounded-3xl p-4 border border-slate-100 flex justify-center items-center">
               <ZoomableImage 
                 src={encodeURI("/Git and Github/Diagram of Git architecture showing working directory, staging area (index), and local repository with arrows indicating flow of changes, clean educational diagram.png")} 
                 alt="Diagram of Git architecture showing working directory, staging area (index), and local repository with arrows indicating flow of changes, clean educational diagram" 
                 className="w-full h-auto rounded-xl"
               />
             </div>
          </div>

          {/* Card 4: Basic Commands */}
          <div className="md:col-span-2 bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center text-indigo-400">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl">Basic Commands</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                The everyday commands for moving files and tracking history.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-2 mb-6 border border-white/10 flex-1 flex flex-col justify-center">
              <ZoomableImage 
                src={encodeURI("/Git and Github/Step-by-step flow diagram showing file moving from working directory to staging area to local repository with labels.png")} 
                alt="Step-by-step flow diagram showing file moving from working directory to staging area to local repository with labels" 
                className="w-full h-auto rounded-xl opacity-90"
              />
            </div>
            <pre className="bg-slate-950 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800 overflow-x-auto">
{`git status            # Check current state
git add file.txt      # Add specific file
git add .             # Add all changes
git commit -m "msg"   # Create snapshot
git log               # View history
git log --oneline     # View short history`}
            </pre>
          </div>

          {/* Card 5: Branching & Merging */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-50 w-10 h-10 rounded-xl flex items-center justify-center text-amber-600">
                  <GitBranch className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-slate-900">Branching & Merging</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Work safely in isolation, then merge changes back to the main codebase.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-2 mb-6 border border-slate-100 flex-1 flex flex-col justify-center">
              <ZoomableImage 
                src={encodeURI("/Git and Github/Git branching diagram showing main branch and feature branch merging back with commit nodes.png")} 
                alt="Git branching diagram showing main branch and feature branch merging back with commit nodes" 
                className="w-full h-auto rounded-xl"
              />
            </div>
            <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800 overflow-x-auto">
{`# Create and switch to new branch
git switch -c feature-login

# ... work & commit ...

# Merge back
git checkout main
git merge feature-login

# Handle conflicts if they occur inside the code
# <<<<<<< HEAD ... ======= ... >>>>>>> branch`}
            </pre>
          </div>

          {/* Interactive Section for Remaining Concepts */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm mt-4">
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-4 text-indigo-600">
                    <Terminal className="w-5 h-5" />
                    <h2 className="text-2xl font-bold text-slate-900">Advanced Workflows</h2>
                  </div>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    Select a topic to explore CLI scenarios for real-world collaboration and advanced version control.
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: "remote", name: "Remote Ops & PRs" },
                      { id: "workflows", name: "Workflows (Git Flow)" },
                      { id: "stashing", name: "Stashing & Undoing" },
                      { id: "internals", name: "Git Internals" },
                      { id: "rebase", name: "Rebase vs Merge" },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all",
                          activeTab === tab.id 
                            ? "bg-slate-900 text-white shadow-xl translate-x-2" 
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {tab.name}
                        <ChevronRight className={cn("w-4 h-4 transition-transform", activeTab === tab.id ? "rotate-90" : "-rotate-0")} />
                      </button>
                    ))}
                  </div>
               </div>

               <div className="md:w-2/3">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
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
                       
                       {activeTab === "remote" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-emerald-400"># Remote Operations & Pull Requests</span>
                           <pre className="text-indigo-300 leading-relaxed mb-4 overflow-x-auto">
{`git push origin main   # Send commits to GitHub
git pull origin main   # Fetch + merge latest changes
git fetch              # Download without merging

# GitHub PR Workflow:
git checkout -b feature
git commit -m "feature added"
git push origin feature
# -> Open GitHub UI, create Pull Request -> Merge`}
                           </pre>
                           <div className="grid grid-cols-2 gap-4 mt-auto">
                              <div className="bg-white/5 rounded-2xl p-2 border border-white/10">
                                <ZoomableImage 
                                  src={encodeURI("/Git and Github/Diagram showing local repository syncing with remote repository using push and pull arrows.png")} 
                                  alt="Diagram showing local repository syncing with remote repository using push and pull arrows" 
                                  className="w-full h-auto rounded-xl opacity-90 object-cover"
                                />
                              </div>
                              <div className="bg-white/5 rounded-2xl p-2 border border-white/10">
                                <ZoomableImage 
                                  src={encodeURI("/Git and Github/Step-by-step GitHub workflow diagram including pull request process and code review stages.png")} 
                                  alt="Step-by-step GitHub workflow diagram including pull request process and code review stages" 
                                  className="w-full h-auto rounded-xl opacity-90 object-cover"
                                />
                              </div>
                           </div>
                         </div>
                       )}

                       {activeTab === "workflows" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-amber-400"># Git Flow & Workflows</span>
                           <pre className="text-indigo-300 leading-relaxed mb-4 overflow-x-auto">
{`# 1. Feature Workflow
git checkout -b feature-x -> work -> merge to main

# 2. Git Flow (Structure)
git checkout develop
git checkout -b feature/new-feature

# 3. Fork Workflow
git clone <your-fork>
git remote add upstream <original-repo>
git fetch upstream
git merge upstream/main`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Git and Github/Git flow diagram showing main, develop, feature, release and hotfix branches with directional arrows.png")} 
                                alt="Git flow diagram showing main, develop, feature, release and hotfix branches with directional arrows" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[220px] object-contain"
                              />
                           </div>
                         </div>
                       )}

                       {activeTab === "stashing" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-rose-400"># Stashing, Reset & Revert</span>
                           <pre className="text-indigo-300 leading-relaxed mb-4 overflow-x-auto">
{`# Stashing (temp save work)
git stash        # Save changes
git stash pop    # Reapply changes

# Undoing changes
git restore file.txt         # Discard local changes
git reset --hard HEAD~1      # DANGEROUS: Deletes last commit
git revert <commit-id>       # SAFE: Creates new commit undoing changes`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Git and Github/Visual showing temporary stash storage where changes are saved and later reapplied.png")} 
                                alt="Visual showing temporary stash storage where changes are saved and later reapplied" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[220px] object-cover"
                              />
                           </div>
                         </div>
                       )}

                       {activeTab === "internals" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-purple-400"># Git Internals</span>
                           <pre className="text-indigo-300 leading-relaxed mb-4 overflow-x-auto">
{`# Explore the internal representation
ls .git

# Show raw commit data, tree, and blobs
git cat-file -p <commit-hash>

# Create tags for releases
git tag v1.0
git push origin v1.0`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Git and Github/Internal structure of Git showing blob, tree, and commit objects connected with hashes.png")} 
                                alt="Internal structure of Git showing blob, tree, and commit objects connected with hashes" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[220px] object-cover"
                              />
                           </div>
                         </div>
                       )}

                       {activeTab === "rebase" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-teal-400"># Rebase vs Merge & Advanced</span>
                           <pre className="text-indigo-300 leading-relaxed mb-4 overflow-x-auto">
{`# Merge (creates parallel history)
git merge feature

# Rebase (rewrites history -> cleaner but risky if shared)
git rebase main

# Other Advanced Commands
git cherry-pick <commit-id>   # Apply specific commit
git diff                      # Show changes
git blame file.txt            # See who changed what`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Git and Github/Comparison diagram showing merge creating parallel history vs rebase creating linear history.png")} 
                                alt="Comparison diagram showing merge creating parallel history vs rebase creating linear history" 
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

        </div>
      </main>

      <Footer />
    </div>
  );
}
