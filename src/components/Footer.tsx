import React from "react";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="flex items-center gap-2 opacity-40">
          <img src="/Favicon.png" alt="Logo" className="w-6 h-6 grayscale opacity-80 rounded" />
          <span className="text-sm font-bold tracking-tight text-slate-500 uppercase">CodeHub</span>
        </div>
        <div className="flex gap-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
           <Link to="/documentation" className="hover:text-indigo-600 transition-colors">Documentation</Link>
           <Link to="/courses" className="hover:text-indigo-600 transition-colors">Courses</Link>
           <Link to="/community" className="hover:text-indigo-600 transition-colors">Community</Link>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 
            2,401 Online
          </span>
          <div className="flex gap-4">
            <a href="https://github.com/Prathvi321/CodeHub" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
              <TwitterIcon className="w-4 h-4" />
            </a>
          </div>
          <span className="text-[10px] text-slate-400">© 2026 CodeHub Pro Learning Inc.</span>
        </div>
      </div>
    </footer>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
