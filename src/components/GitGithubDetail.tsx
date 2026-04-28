import React from "react";
import { ArrowLeft, Download, Github, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import ZoomableImage from "./ZoomableImage";

interface GitGithubDetailProps {
  onBack: () => void;
}

const pages = [
  "ChatGPT Image Apr 27, 2026, 11_01_58 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_02_01 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_02_04 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_02_09 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_02_13 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_02_17 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_02_21 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_03_04 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_10_43 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_12_42 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_14_18 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_15_04 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_16_17 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_17_35 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_19_24 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_20_42 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_22_02 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_27_51 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_29_28 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_31_55 PM.png",
  "ChatGPT Image Apr 27, 2026, 11_33_10 PM.png",
];

export default function GitGithubDetail({ onBack }: GitGithubDetailProps) {
  const bookletPath = "/Git and Github/Git and Github Booklet.pdf";

  // Show all pages in sequence
  const visiblePages = pages;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Github className="w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Git & GitHub Handbook</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={bookletPath}
              download
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-500 transition-all shadow-md shadow-indigo-200"
            >
              <Download className="w-4 h-4" />
              <span>Download Booklet</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3 h-3" />
            Master Version Control
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Complete Visual Guide</h2>
          <p className="text-slate-500 text-lg">
            From absolute beginner to job ready. Follow these slides to master Git and collaborative coding.
          </p>
        </div>

        {/* Slides Section */}
        <div className="space-y-12">
          {visiblePages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-[2.5rem] p-4 md:p-8 shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
            >
              <div className="relative group">
                <ZoomableImage
                  src={encodeURI(`/Git and Github/${img}`)}
                  alt={`Git & GitHub Guide Page ${index + 1}`}
                  className="w-full h-auto rounded-3xl"
                />
                <div className="absolute bottom-6 right-6 px-4 py-2 bg-slate-900/10 backdrop-blur-md rounded-full text-[10px] font-bold text-slate-900/60 transition-opacity opacity-0 group-hover:opacity-100">
                  Slide {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center pb-24">
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px]" />
             <div className="relative z-10">
               <h3 className="text-3xl font-bold mb-4">Finished the Guide?</h3>
               <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                 Download the high-quality PDF version to keep as a reference on your system.
               </p>
               <a
                href={bookletPath}
                download
                className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-xl shadow-indigo-900/40"
              >
                <Download className="w-5 h-5 text-indigo-600" />
                Download PDF Booklet
              </a>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
