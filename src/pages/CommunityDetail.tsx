import React from "react";
import { ArrowLeft, Github, Mail } from "lucide-react";
import { Card } from "@/src/components/ui/card";

interface CommunityDetailProps {
  onBack: () => void;
  onNavigate?: (topic: string) => void;
}

export default function CommunityDetail({ onBack, onNavigate }: CommunityDetailProps) {
  const handleNav = (e: React.MouseEvent, topic: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(topic);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer" onClick={onBack}>
              C
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 cursor-pointer" onClick={onBack}>CodeHub</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors" onClick={(e) => handleNav(e, "explore")}>Explore</a>
            <a href="#" className="hover:text-slate-900 transition-colors" onClick={(e) => handleNav(e, "challenges")}>Challenges</a>
            <a href="#" className="hover:text-slate-900 transition-colors" onClick={(e) => handleNav(e, "documentation")}>Documentation</a>
            <button className="text-indigo-600 transition-colors font-medium">Community</button>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-semibold text-slate-700">Sign In</button>
            <button className="bg-slate-900 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-12 md:py-20">
        <section id="community" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Meet the Team</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              The passionate people behind CodeHub building an interactive learning experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prathvi */}
            <Card className="p-8 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-3xl">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-bold mb-6 border-4 border-indigo-100">
                  PT
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Prathvi Singh Thakur</h3>
                <p className="text-indigo-600 text-sm font-bold uppercase tracking-wider mb-4">Project Lead & Manager</p>
                <p className="text-slate-500 text-base mb-6 leading-relaxed">Managing the project, idea, leader, head.</p>
                <div className="flex gap-4 mt-auto">
                  <a href="https://github.com/Prathvi321" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="mailto:prathvisinght3@gmail.com" className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400 hover:text-indigo-600 hover:bg-indigo-100 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>

            {/* Mritunjay */}
            <Card className="p-8 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-3xl">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 text-3xl font-bold mb-6 border-4 border-emerald-100">
                  MS
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Mritunjay Shukla</h3>
                <p className="text-emerald-600 text-sm font-bold uppercase tracking-wider mb-4">Codebase & UI/UX</p>
                <p className="text-slate-500 text-base mb-6 leading-relaxed">Technical faults solver, codebase manager, UI/UX.</p>
                <div className="flex gap-4 mt-auto">
                  <a href="mailto:mritunjay.shukla712@gmail.com" className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-400 hover:text-emerald-600 hover:bg-emerald-100 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>

            {/* Krishna */}
            <Card className="p-8 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-3xl">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 text-3xl font-bold mb-6 border-4 border-rose-100">
                  KP
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Krishna Pathak</h3>
                <p className="text-rose-600 text-sm font-bold uppercase tracking-wider mb-4">Content Creator</p>
                <p className="text-slate-500 text-base mb-6 leading-relaxed">Provided content on this website, images and codes.</p>
                <div className="flex gap-4 mt-auto">
                  <a href="https://github.com/hirokrishna" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="mailto:pathakkrishna551@gmail.com" className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-100 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
