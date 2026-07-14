import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, BookOpen, Clock, Code, Info, Lightbulb, Terminal, Search, ChevronRight, RotateCcw, ArrowRight, Network, FileText, Menu, X, Check, Copy, PanelLeft, PanelLeftClose } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { marked } from "marked";

interface SubHeading {
  level: number;
  id: string;
  text: string;
}

interface Chapter {
  index: number; // Global index in the filtered list
  id: string;
  title: string;
  markdown: string;
  html: string;
  partName: string;
  partNum: number;
  subHeadings: SubHeading[];
  file: string;
}

interface NetworksDetailProps {
  onBack: () => void;
}

// Map files to user-friendly part headers
const PART_MAP: Record<string, { name: string; label: string }> = {
  "Network Part_1.md": { name: "Physical & Hardware Layer", label: "PART I" },
  "Network Part_2.md": { name: "Network Topologies", label: "PART II" },
  "Network Part_3.md": { name: "Network Types & Scale", label: "PART III" },
  "Network Part_4.md": { name: "The OSI & TCP/IP Models", label: "PART IV" },
  "Network Part_5.md": { name: "Addressing & Routing", label: "PART V" },
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function NetworksDetail({ onBack }: NetworksDetailProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>(" ");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch and parse all 5 markdown files
  useEffect(() => {
    async function loadData() {
      try {
        const files = [
          "Network Part_1.md",
          "Network Part_2.md",
          "Network Part_3.md",
          "Network Part_4.md",
          "Network Part_5.md",
        ];

        const allChapters: Omit<Chapter, "html" | "subHeadings" | "index">[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const partInfo = PART_MAP[file];
          const response = await fetch(`/Network md files/${file}`);
          if (!response.ok) {
            console.error(`Failed to load ${file}`);
            continue;
          }

          const text = await response.text();
          const parsed = splitIntoChapters(text, partInfo.name, i + 1, file);
          parsed.forEach((ch) => {
            allChapters.push(ch);
          });
        }

        // Assign global indices
        const processedChapters = allChapters.map((ch, idx) => {
          const subHeadings: SubHeading[] = [];
          const customRenderer = new marked.Renderer();

          customRenderer.heading = function ({ text, depth, raw }) {
            const plain = raw.replace(/^#+\s+/, "").trim();
            const id = slugify(plain);
            if (depth >= 2 && depth <= 3) {
              subHeadings.push({ level: depth, id, text: plain });
            }
            return `<h${depth} id="${id}" class="md-h md-h${depth}">${text}</h${depth}>\n`;
          };

          customRenderer.code = function ({ text, lang }) {
            const language = lang || "text";
            const escapedCode = escapeHtml(text);
            return `<div class="code-block my-6 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div class="code-bar bg-slate-50 border-b border-slate-200 px-4 py-2 flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>${language}</span>
                <button class="copy-btn hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer" data-code="${encodeURIComponent(text)}">
                  Copy
                </button>
              </div>
              <pre class="code-pre p-4 bg-slate-900 overflow-x-auto text-sm text-slate-100 font-mono"><code>${escapedCode}</code></pre>
            </div>`;
          };

          const markdownWithoutTitle = ch.markdown.replace(/^#\s+.+?(\r?\n|$)/, "");
          const html = marked.parse(markdownWithoutTitle, { renderer: customRenderer }) as string;

          return {
            ...ch,
            index: idx,
            html,
            subHeadings,
          };
        });

        setChapters(processedChapters);

        // Check if there is a hash matching a chapter
        const hash = window.location.hash.replace("#", "");
        if (hash) {
          const matchIdx = processedChapters.findIndex((c) => c.id === hash || c.subHeadings.some((sh) => sh.id === hash));
          if (matchIdx >= 0) {
            setActiveIdx(matchIdx);
          }
        }
      } catch (err) {
        console.error("Error loading network documentation:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Listen to hash changes for linking directly
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && chapters.length > 0) {
        const matchIdx = chapters.findIndex((c) => c.id === hash || c.subHeadings.some((sh) => sh.id === hash));
        if (matchIdx >= 0 && matchIdx !== activeIdx) {
          setActiveIdx(matchIdx);
          // Give React a frame to render the new chapter, then scroll to the specific subheading if needed
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }, 50);
        } else if (matchIdx === activeIdx) {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [chapters, activeIdx]);

  // Hook up copy buttons dynamically after html rendering
  useEffect(() => {
    if (loading || chapters.length === 0) return;

    const handleCopyClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest(".copy-btn");
      if (!btn) return;
      const code = decodeURIComponent(btn.getAttribute("data-code") || "");
      navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = "Copied!";
        btn.classList.add("text-emerald-600");
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove("text-emerald-600");
        }, 2000);
      });
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener("click", handleCopyClick);
    }
    return () => {
      if (container) {
        container.removeEventListener("click", handleCopyClick);
      }
    };
  }, [loading, activeIdx, chapters]);

  // Split files into chapters by '#' H1 headers
  function splitIntoChapters(markdown: string, partName: string, partNum: number, file: string): Omit<Chapter, "html" | "subHeadings" | "index">[] {
    const lines = markdown.replace(/\r\n/g, "\n").split("\n");
    const chaptersList: { title: string; lines: string[] }[] = [];
    let current: { title: string; lines: string[] } | null = null;
    let inFence = false;
    let fenceMarker = "";

    function pushCurrent() {
      if (current && current.lines.some((l) => l.trim() !== "")) {
        chaptersList.push(current);
      }
    }

    current = { title: partName, lines: [] };

    for (const line of lines) {
      const fenceMatch = line.match(/^(\s*)(```|~~~)/);
      if (fenceMatch) {
        if (!inFence) {
          inFence = true;
          fenceMarker = fenceMatch[2];
        } else if (line.trim().startsWith(fenceMarker)) {
          inFence = false;
        }
        current.lines.push(line);
        continue;
      }

      if (!inFence) {
        const h1 = line.match(/^#\s+(.+?)\s*$/);
        if (h1) {
          pushCurrent();
          current = { title: h1[1].replace(/[*_`]/g, "").trim(), lines: [line] };
          continue;
        }
      }

      current.lines.push(line);
    }
    pushCurrent();

    // Convert to Chapter structures and filter empty sections
    return chaptersList
      .map((c) => {
        const rawMarkdown = c.lines.join("\n");
        // Calculate non-header, non-divider character count to exclude structural placeholders
        const textLines = c.lines.filter((l) => {
          const clean = l.trim();
          return clean && !clean.startsWith("#") && clean !== "---";
        });
        const contentCharCount = textLines.join("").trim().length;

        return {
          id: slugify(c.title),
          title: c.title,
          markdown: rawMarkdown,
          partName,
          partNum,
          contentCharCount,
          file,
        };
      })
      .filter((c) => c.contentCharCount >= 50); // Filter out structural part titles or headers with no actual content
  }

  // Filter list of chapters based on search term
  const filteredChapters = chapters.filter((c) => {
    const cleanSearch = searchTerm.trim().toLowerCase();
    if (!cleanSearch) return true;
    return (
      c.title.toLowerCase().includes(cleanSearch) ||
      c.partName.toLowerCase().includes(cleanSearch)
    );
  });

  const activeChapter = chapters[activeIdx];

  const handleChapterSelect = (idx: number, hashId?: string) => {
    setActiveIdx(idx);
    setIsSidebarOpen(false);
    if (hashId) {
      window.location.hash = hashId;
    } else {
      window.location.hash = chapters[idx].id;
      if (contentRef.current) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Group chapters by Part for display in the sidebar
  const groupedChapters = filteredChapters.reduce<Record<number, { partName: string; chapters: Chapter[] }>>((acc, c) => {
    if (!acc[c.partNum]) {
      acc[c.partNum] = { partName: c.partName, chapters: [] };
    }
    acc[c.partNum].chapters.push(c);
    return acc;
  }, {} as Record<number, { partName: string; chapters: Chapter[] }>);

  // Colors for dot indicators in the sidebar
  const dotColors = ["bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-purple-500"];

  return (
    <div className="min-h-screen bg-slate-50/40 selection:bg-indigo-100 selection:text-indigo-900 font-sans flex flex-col">
      <Navbar variant="minimal" onNavigate={() => onBack()} />

      <div className="flex-1 flex w-full mx-auto relative overflow-hidden">
        {/* Mobile Navigation Trigger Bar */}
        <div className="md:hidden w-full bg-white border-b border-slate-200 px-4 py-3 sticky top-16 z-40 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
            Table of Contents
          </button>
          {activeChapter && (
            <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
              {activeChapter.title}
            </span>
          )}
        </div>

        {/* Sidebar Nav */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 bg-[#f8fafc] flex flex-col transition-all duration-300 shrink-0",
            // Mobile states (covers screen, on top of navbar)
            isSidebarOpen ? "translate-x-0 w-80 border-r border-slate-200 z-50 h-screen" : "-translate-x-full z-40 h-[calc(100vh-4rem)]",
            // Desktop states (stays fixed under navbar, z-40 so navbar is on top)
            isSidebarCollapsed 
              ? "md:translate-x-0 md:fixed md:top-16 md:bottom-0 md:left-0 md:w-0 md:border-r-0 md:overflow-hidden md:opacity-0 md:pointer-events-none" 
              : "md:translate-x-0 md:fixed md:top-16 md:bottom-0 md:left-0 md:w-80 md:border-r md:border-slate-200/80 md:opacity-100"
          )}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-200/80 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <Network className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Reference Manual</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">Computer Networks</h2>
              <p className="text-xs text-slate-500 mt-1 font-semibold">
                {chapters.length} Chapters Available
              </p>
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Desktop collapse button inside sidebar header */}
            <button
              onClick={() => setIsSidebarCollapsed(true)}
              className="hidden md:block text-slate-400 hover:text-slate-700 p-1.5 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
              title="Collapse Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar Search */}
          <div className="px-6 py-4 border-b border-slate-200/60">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter chapters..."
                value={searchTerm === " " ? "" : searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Sidebar Scrollable Chapters List */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 text-slate-400 text-sm">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                Loading index...
              </div>
            ) : Object.keys(groupedChapters).length === 0 ? (
              <div className="text-slate-500 text-sm text-center py-8">
                No matching chapters found.
              </div>
            ) : (
              (Object.entries(groupedChapters) as [string, { partName: string; chapters: Chapter[] }][])
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([partNum, { partName, chapters: partChapters }]) => {
                  const num = Number(partNum);
                  const dotColor = dotColors[(num - 1) % dotColors.length];
                  return (
                    <div key={partNum} className="space-y-2">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2.5 mb-2.5 flex items-center gap-1.5 mt-6 first:mt-2">
                        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColor)}></span>
                        PART {partNum}: {partName}
                      </h3>
                      <ul className="space-y-1">
                        {partChapters.map((ch) => {
                          const isActive = ch.index === activeIdx;
                          return (
                            <li key={ch.id}>
                              <button
                                onClick={() => handleChapterSelect(ch.index)}
                                className={cn(
                                  "w-full text-left px-3 py-2 rounded-r-xl text-sm transition-all flex items-start gap-2.5 group cursor-pointer border-l-4",
                                  isActive
                                    ? "bg-gradient-to-r from-indigo-50/80 to-indigo-100/40 text-indigo-700 font-bold border-indigo-600 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border-transparent"
                                )}
                              >
                                <span
                                  className={cn(
                                    "text-[9px] font-bold mt-0.5 px-1.5 py-0.5 rounded shrink-0",
                                    isActive
                                      ? "bg-indigo-600 text-white"
                                      : "bg-slate-200 text-slate-500 group-hover:bg-slate-300/80 group-hover:text-slate-700"
                                  )}
                                >
                                  {String(ch.index + 1).padStart(2, "0")}
                                </span>
                                <span className="leading-tight flex-1">{ch.title}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })
            )}
          </div>

          {/* Sidebar Footer / Progress */}
          {!loading && chapters.length > 0 && (
            <div className="p-6 border-t border-slate-200/80 bg-slate-50">
              <div className="flex justify-between items-center text-xs text-slate-500 mb-2 font-medium">
                <span>Reading Progress</span>
                <span className="text-slate-800 font-black">
                  {Math.round(((activeIdx + 1) / chapters.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${((activeIdx + 1) / chapters.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 text-center font-medium">
                Chapter {activeIdx + 1} of {chapters.length}
              </p>
            </div>
          )}
        </aside>

        {/* Main content pane */}
        <main
          className={cn(
            "flex-1 min-w-0 p-6 md:p-12 transition-all duration-300",
            isSidebarCollapsed ? "md:ml-0" : "md:ml-80"
          )}
          ref={contentRef}
        >
          {loading ? (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-base font-semibold">Compiling network modules...</div>
            </div>
          ) : !activeChapter ? (
            <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400">
              <FileText className="w-12 h-12 mb-3 text-slate-300" />
              <div className="text-base font-semibold">No chapter selected</div>
            </div>
          ) : (
            <article
              className={cn(
                "mx-auto animate-in fade-in duration-500 bg-white rounded-[2rem] border border-slate-200/80 p-8 md:p-12 shadow-sm transition-all duration-300",
                isSidebarCollapsed ? "max-w-[1100px]" : "max-w-[850px]"
              )}
            >
              {/* Header section with Breadcrumbs and Collapse button */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3 overflow-hidden">
                  {/* Desktop Collapse Toggle */}
                  <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="hidden md:flex p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer border border-slate-200"
                    title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                  >
                    {isSidebarCollapsed ? (
                      <PanelLeft className="w-4 h-4" />
                    ) : (
                      <PanelLeftClose className="w-4 h-4" />
                    )}
                  </button>
                  
                  {/* Breadcrumbs */}
                  <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 overflow-hidden truncate">
                    <span>Computer Networks</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    <span className="text-indigo-600 truncate">{activeChapter.partName}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    <span className="text-slate-500">Chapter {activeChapter.index + 1}</span>
                  </nav>
                </div>
              </div>

              {/* Title Header Card */}
              <header className="mb-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  Reference Manual
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  {activeChapter.title}
                </h1>
              </header>

              {/* Parsed HTML Content */}
              <div
                className="md-body prose prose-slate max-w-none prose-indigo prose-headings:font-black prose-a:text-indigo-600 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: activeChapter.html }}
              />

              {/* Navigation Footer */}
              <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                {activeIdx > 0 ? (
                  <button
                    onClick={() => handleChapterSelect(activeIdx - 1)}
                    className="w-full sm:w-auto px-5 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group shadow-sm cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <div className="text-left">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Previous</span>
                      <span className="text-xs font-bold text-slate-800 truncate max-w-[180px] block leading-none">
                        {chapters[activeIdx - 1].title}
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="hidden sm:block"></div>
                )}

                {activeIdx < chapters.length - 1 ? (
                  <button
                    onClick={() => handleChapterSelect(activeIdx + 1)}
                    className="w-full sm:w-auto px-5 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group shadow-md shadow-indigo-900/10 cursor-pointer ml-auto"
                  >
                    <div className="text-right">
                      <span className="block text-[9px] font-bold text-indigo-200 uppercase leading-none mb-1">Next</span>
                      <span className="text-xs font-bold text-white truncate max-w-[180px] block leading-none">
                        {chapters[activeIdx + 1].title}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <div className="hidden sm:block"></div>
                )}
              </footer>
            </article>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
