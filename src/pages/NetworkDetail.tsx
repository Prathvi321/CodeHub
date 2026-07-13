import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Network,
  Search,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  BookOpen,
  ArrowLeft,
  FileText,
  Hash,
  Loader2,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Chapter {
  id: string;
  title: string;
  markdown: string;
  fileIndex: number;
  partLabel: string;
}

interface NetworkDetailProps {
  onBack: () => void;
}

// ─── Config ───────────────────────────────────────────────────────────────────
const NETWORK_FILES = [
  { path: "/Network Markdown FIles/Network_part1.md", label: "Part I" },
  { path: "/Network Markdown FIles/Network_part2.md", label: "Part II" },
  { path: "/Network Markdown FIles/Network_part3.md", label: "Part III" },
  { path: "/Network Markdown FIles/Network_part4.md", label: "Part IV" },
  { path: "/Network Markdown FIles/Network_part5.md", label: "Part V" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function splitIntoChapters(markdown: string, partLabel: string, fileIndex: number): Chapter[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const chapters: Chapter[] = [];
  let currentLines: string[] = [];
  let currentTitle = partLabel;
  let inFence = false;
  let fenceMarker = "";

  const hasMeaningfulBody = (lines: string[]) => {
    // Skip the first line if it's a heading (# or ##)
    const bodyLines = lines[0]?.match(/^#{1,2}\s/) ? lines.slice(1) : lines;
    // Join and strip: horizontal rules (---), empty lines, whitespace-only lines
    const body = bodyLines
      .join("\n")
      .replace(/^[-=]{3,}\s*$/gm, "")   // horizontal rules
      .replace(/^[`~]{3,}.*$/gm, "")    // lone fence markers
      .trim();
    return body.length > 0;
  };

  const pushCurrent = () => {
    const content = currentLines.join("\n").trim();
    // Only include this chapter if there's actual body content beyond the heading
    if (content && hasMeaningfulBody(currentLines)) {
      chapters.push({
        id: slugify(currentTitle) + "-" + fileIndex + "-" + chapters.length,
        title: currentTitle,
        markdown: content,
        fileIndex,
        partLabel,
      });
    }
  };

  for (const line of lines) {
    // Track code fences so we don't misread a # inside code as a heading
    const fenceMatch = line.match(/^(\s*)(```|~~~)/);
    if (fenceMatch) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fenceMatch[2];
      } else if (line.trim().startsWith(fenceMarker)) {
        inFence = false;
      }
      currentLines.push(line);
      continue;
    }

    if (!inFence) {
      // Split on H1 OR H2 — both become chapter boundaries
      const heading = line.match(/^(#{1,2})\s+(.+?)\s*$/);
      if (heading) {
        pushCurrent();
        currentTitle = heading[2].replace(/[*_`]/g, "").trim();
        currentLines = [line];
        continue;
      }
    }
    currentLines.push(line);
  }
  pushCurrent();
  return chapters;
}

// ─── Markdown renderer component ──────────────────────────────────────────────
function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-extrabold text-slate-900 mb-6 pb-3 border-b-2 border-indigo-200 leading-tight tracking-tight">
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 {...props} className="text-2xl font-bold text-indigo-700 mt-10 mb-4 leading-snug relative pl-4 border-l-4 border-indigo-300">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3 leading-snug">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-base font-bold uppercase tracking-wider text-slate-500 mt-6 mb-2">
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-sm font-bold text-slate-600 mt-4 mb-1">{children}</h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-xs font-bold text-slate-500 mt-4 mb-1">{children}</h6>
        ),
        p: ({ children }) => (
          <p className="text-slate-700 text-base leading-relaxed mb-4">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-slate-900">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-slate-600">{children}</em>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 space-y-1.5 mb-4 text-slate-700">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 space-y-1.5 mb-4 text-slate-700">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-slate-700 leading-relaxed marker:text-indigo-400">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-indigo-300 bg-indigo-50/60 pl-5 py-3 my-4 rounded-r-xl italic text-slate-600 text-sm">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-8 border-slate-200" />,
        code: ({ inline, className, children, ...props }: any) => {
          if (inline) {
            return (
              <code className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[0.82em] font-mono border border-indigo-100">
                {children}
              </code>
            );
          }
          const match = /language-(\w+)/.exec(className || "");
          const lang = match ? match[1] : "text";
          return (
            <div className="my-5 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
              <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 font-mono">
                  {lang}
                </span>
              </div>
              <pre className="bg-slate-900 overflow-x-auto p-5">
                <code className="text-slate-200 text-sm font-mono leading-relaxed whitespace-pre">
                  {children}
                </code>
              </pre>
            </div>
          );
        },
        table: ({ children }) => (
          <div className="my-5 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-indigo-600 text-white">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 border-t border-slate-100 text-slate-700 align-top">
            {children}
          </td>
        ),
        tr: ({ children, ...props }: any) => (
          <tr className="even:bg-slate-50 hover:bg-indigo-50/30 transition-colors">{children}</tr>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline underline-offset-2 decoration-indigo-200 hover:decoration-indigo-500 transition-colors"
          >
            {children}
          </a>
        ),
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="max-w-full rounded-xl shadow-sm my-4 border border-slate-100"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function NetworkDetail({ onBack }: NetworkDetailProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const readerRef = useRef<HTMLDivElement>(null);

  // Load all markdown files
  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      const allChapters: Chapter[] = [];
      for (let i = 0; i < NETWORK_FILES.length; i++) {
        const file = NETWORK_FILES[i];
        try {
          const res = await fetch(file.path, { cache: "no-store" });
          if (!res.ok) throw new Error("Failed to load " + file.path);
          const text = await res.text();
          const parts = splitIntoChapters(text, file.label, i);
          allChapters.push(...parts);
        } catch (e) {
          console.error(e);
          allChapters.push({
            id: "error-" + i,
            title: file.label + " (failed to load)",
            markdown: `# ${file.label}\n\n*Could not load this section.*`,
            fileIndex: i,
            partLabel: file.label,
          });
        }
      }
      setChapters(allChapters);
      setLoading(false);
    }
    loadAll();
  }, []);

  const goToChapter = useCallback(
    (idx: number) => {
      setActiveIndex(idx);
      setSidebarOpen(false);
      readerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  const filteredChapters = searchQuery.trim()
    ? chapters.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chapters;

  const activeChapter = chapters[activeIndex];
  const prevChapter = chapters[activeIndex - 1];
  const nextChapter = chapters[activeIndex + 1];

  // Group chapters by part for sidebar display
  const partGroups = chapters.reduce<Record<string, number[]>>((acc, ch, idx) => {
    if (!acc[ch.partLabel]) acc[ch.partLabel] = [];
    acc[ch.partLabel].push(idx);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#fdfdfd] font-sans flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Hide scrollbar in sidebar nav for webkit browsers */}
      <style>{`
        .sidebar-nav::-webkit-scrollbar { display: none; }
      `}</style>
      <Navbar variant="minimal" onNavigate={() => onBack()} />

      <div className="flex flex-1 relative">
        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <>
          {/* Mobile overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Sidebar panel */}
          <aside
            className={cn(
              "fixed lg:sticky top-0 lg:top-16 left-0 h-screen lg:h-[calc(100vh-4rem)] bg-slate-900 text-slate-100 flex flex-col z-40 shadow-2xl transition-all duration-300 ease-in-out flex-shrink-0",
              // mobile: slide in/out
              sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
              // desktop: collapsed narrows to just the toggle strip
              sidebarCollapsed ? "lg:w-12" : "lg:w-80",
              // mobile always full width
              "w-80"
            )}
          >
            {/* Sidebar header */}
            <div className="p-3 border-b border-slate-800 flex items-center gap-3 bg-slate-900 flex-shrink-0">
              {/* Collapse toggle — desktop only */}
              <button
                onClick={() => setSidebarCollapsed((v) => !v)}
                className="hidden lg:flex w-9 h-9 flex-shrink-0 items-center justify-center rounded-xl bg-slate-800 hover:bg-indigo-600/30 hover:text-indigo-300 transition-all text-slate-400 border border-slate-700"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <motion.div
                  animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.div>
              </button>

              {/* Title — hidden when collapsed */}
              <AnimatePresence initial={false}>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 min-w-0 overflow-hidden"
                  >
                    <h2 className="font-bold text-white text-sm leading-tight truncate">
                      Computer Networks
                    </h2>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
                      {chapters.length} Chapters
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile close */}
              <button
                className="lg:hidden ml-auto w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors text-slate-400"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search — hidden when collapsed */}
            <AnimatePresence initial={false}>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-slate-800 overflow-hidden flex-shrink-0"
                >
                  <div className="px-4 py-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Filter chapters…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chapter list — hidden when collapsed, shows network icon instead */}
            {sidebarCollapsed ? (
              <div className="flex-1 flex flex-col items-center pt-4 gap-3">
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Network className="w-5 h-5 text-white" />
                </div>
                <div
                  className="text-[9px] font-bold uppercase tracking-widest text-slate-600 mt-2"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                  {activeIndex + 1}/{chapters.length}
                </div>
              </div>
            ) : (
            <nav
              className="sidebar-nav flex-1 py-2 overflow-y-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              {loading ? (
                <div className="flex items-center justify-center py-12 gap-2 text-slate-500 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading…
                </div>
              ) : searchQuery.trim() ? (
                // Flat filtered list
                filteredChapters.length === 0 ? (
                  <div className="px-4 py-6 text-slate-500 text-xs text-center">
                    No chapters match "{searchQuery}"
                  </div>
                ) : (
                  filteredChapters.map((ch) => {
                    const realIdx = chapters.indexOf(ch);
                    return (
                      <button
                        key={ch.id}
                        onClick={() => goToChapter(realIdx)}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm transition-all flex items-center gap-2.5 group",
                          realIdx === activeIndex
                            ? "bg-indigo-600/20 text-indigo-300 border-r-2 border-indigo-400"
                            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                        )}
                      >
                        <Hash className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                        <span className="truncate">{ch.title}</span>
                      </button>
                    );
                  })
                )
              ) : (
                // Grouped by part
                Object.entries(partGroups).map(([partLabel, indices]) => (
                  <div key={partLabel} className="mb-2">
                    <div className="px-4 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      {partLabel}
                    </div>
                    {indices.map((idx) => {
                      const ch = chapters[idx];
                      return (
                        <button
                          key={ch.id}
                          onClick={() => goToChapter(idx)}
                          className={cn(
                            "w-full text-left px-4 py-2.5 text-sm transition-all flex items-center gap-2.5 group",
                            idx === activeIndex
                              ? "bg-indigo-600/20 text-indigo-300 border-r-2 border-indigo-400"
                              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                          )}
                        >
                          <span className="w-5 text-[10px] font-bold font-mono text-slate-600 flex-shrink-0 text-right">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="truncate">{ch.title}</span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </nav>
            )}

            {/* Progress footer */}
            {!loading && chapters.length > 0 && !sidebarCollapsed && (
              <div className="p-4 border-t border-slate-800 bg-slate-900 flex-shrink-0">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Progress</span>
                  <span className="font-bold text-slate-300">
                    {activeIndex + 1} / {chapters.length}
                  </span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${((activeIndex + 1) / chapters.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </aside>
        </>

        {/* ── Main Reader Area ─────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0" ref={readerRef}>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
              <p className="text-sm font-medium">Loading your library…</p>
            </div>
          ) : !activeChapter ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
              <BookOpen className="w-10 h-10 text-slate-300" />
              <p className="text-sm">No content available.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
              {/* Topbar: breadcrumb + mobile menu btn + chapter info */}
              <div className="flex items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                  {/* Mobile menu trigger */}
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-9 h-9 bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-all"
                  >
                    <Menu className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="hidden sm:inline font-medium text-slate-500">
                      Computer Networks
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 hidden sm:block" />
                    <span className="font-semibold text-indigo-600 truncate max-w-[180px] sm:max-w-none">
                      {activeChapter.title}
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                    <FileText className="w-3 h-3" />
                    {activeChapter.partLabel}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                    {activeIndex + 1}/{chapters.length}
                  </span>
                </div>
              </div>

              {/* Chapter content card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-white border border-slate-200 rounded-[2rem] shadow-sm p-8 sm:p-12 mb-8 hover:border-indigo-200 transition-colors"
                >
                  <MarkdownContent content={activeChapter.markdown} />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next navigation */}
              <div className="grid grid-cols-2 gap-4 mb-16">
                {prevChapter ? (
                  <button
                    onClick={() => goToChapter(activeIndex - 1)}
                    className="group flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all text-left"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-0.5">
                        Previous
                      </div>
                      <div className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors truncate">
                        {prevChapter.title}
                      </div>
                    </div>
                  </button>
                ) : (
                  <div />
                )}

                {nextChapter ? (
                  <button
                    onClick={() => goToChapter(activeIndex + 1)}
                    className="group flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all text-right ml-auto w-full"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-0.5">
                        Next
                      </div>
                      <div className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors truncate">
                        {nextChapter.title}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
