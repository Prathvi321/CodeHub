import React from 'react';
import { motion } from 'motion/react';
import { Pickaxe, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Challenges() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdfdfd] selection:bg-indigo-100 selection:text-indigo-900 font-sans flex flex-col">
      <Navbar variant="minimal" onNavigate={(page) => navigate(page ? `/${page}` : '/')} />

      <main className="max-w-4xl mx-auto px-4 sm:px-10 py-24 flex-1 w-full flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-200 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-indigo-500/5 relative overflow-hidden w-full"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"></div>
          
          <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12">
            <Pickaxe className="w-12 h-12 text-indigo-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Under Construction
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            We're currently forging new challenges and in-depth courses for this section. Check back soon for interactive coding environments, specialized paths, and premium certifications!
          </p>

          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Dashboard
          </button>
        </motion.div>
      </main>
    </div>
  );
}
