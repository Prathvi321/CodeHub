import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/src/lib/utils";
import SignInModal from "./SignInModal";

interface NavbarProps {
  variant?: "default" | "minimal";
  activePage?: string;
  onNavigate?: (page: string | null) => void;
}

export default function Navbar({ variant = "default", activePage = "explore", onNavigate }: NavbarProps) {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleNav = (e: React.MouseEvent, page: string | null) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  if (variant === "minimal") {
    return (
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => handleNav(e, null)}>
            <img src="/Favicon.png" alt="CodeHub Logo" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
            <span className="text-xl font-bold tracking-tight text-slate-900">CodeHub</span>
          </div>
          <div className="flex items-center gap-4">
             <button 
              onClick={(e) => handleNav(e, null)}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/Favicon.png" alt="CodeHub Logo" className="w-8 h-8 rounded-lg cursor-pointer object-cover shadow-sm" onClick={(e) => handleNav(e, null)} />
            <span className="text-xl font-bold tracking-tight text-slate-900 cursor-pointer" onClick={(e) => handleNav(e, null)}>CodeHub</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <button 
              onClick={(e) => handleNav(e, "explore")} 
              className={cn("transition-colors", activePage === "explore" ? "text-indigo-600 font-medium" : "hover:text-slate-900")}
            >
              Explore
            </button>
            <button 
              onClick={(e) => handleNav(e, "challenges")} 
              className={cn("transition-colors", activePage === "challenges" ? "text-indigo-600 font-medium" : "hover:text-slate-900")}
            >
              Challenges
            </button>
            <button 
              onClick={(e) => handleNav(e, "documentation")} 
              className={cn("transition-colors", activePage === "documentation" ? "text-indigo-600 font-medium" : "hover:text-slate-900")}
            >
              Documentation
            </button>
            <button 
              onClick={(e) => handleNav(e, "community")} 
              className={cn("transition-colors", activePage === "community" ? "text-indigo-600 font-medium" : "hover:text-slate-900")}
            >
              Community
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSignInOpen(true)}
              className="px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
      />
    </>
  );
}
