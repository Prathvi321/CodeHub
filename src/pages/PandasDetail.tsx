import React, { useState } from "react";
import { ArrowLeft, BookOpen, Clock, Code, Info, Lightbulb, Terminal, AlertTriangle, Search, Layers, ChevronRight, RotateCcw, ArrowRight, Network, Cpu, LayoutGrid, Box, Database, FileDown, TableProperties, ListTree } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import ZoomableImage from "@/src/components/ZoomableImage";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

interface PandasDetailProps {
  onBack: () => void;
}

export default function PandasDetail({ onBack }: PandasDetailProps) {
  const [activeOp, setActiveOp] = useState("viewing");

  const ops = [
    { id: "viewing", name: "Viewing Data", color: "indigo" },
    { id: "cleaning", name: "Data Cleaning", color: "emerald" },
    { id: "manipulation", name: "Manipulation", color: "amber" },
    { id: "grouping", name: "Grouping & Aggregation", color: "rose" },
    { id: "merging", name: "Merging & Joining", color: "teal" },
  ];

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
              Pandas <Database className="w-10 h-10 text-indigo-600" />
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg mb-6">
              The premier Python library for data manipulation, cleaning, and analysis. Work seamlessly with structured, tabular data.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a 
              href="/Pandas/Pandas Handbook.pdf" 
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
            >
              <FileDown className="w-5 h-5" />
              Download Handbook
            </a>
          </motion.div>
        </header>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-16">
          
          {/* Main Content Card: Series */}
          <div className="md:col-span-2 md:row-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:border-indigo-300 transition-all shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <ListTree className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Series (1D Data)</h3>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">Single Column</p>
              </div>
            </div>
            
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              A <strong>Series</strong> is like a single column in a table or a 1D array. It consists of an index (left side) and the actual values (right side).
            </p>

            <div className="bg-slate-50 rounded-2xl p-2 mb-6 border border-slate-100 overflow-hidden flex-1 flex flex-col justify-center">
               <ZoomableImage 
                 src={encodeURI("/Pandas/A clean diagram showing a Pandas Series: vertical list of values with labeled indices on the left, minimal modern style, white background.png")} 
                 alt="Pandas Series" 
                 className="w-full h-auto rounded-xl shadow-sm object-cover max-h-[160px]"
               />
            </div>

            <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800">
{`import pandas as pd
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])
print(s['a']) # Output: 10`}
            </pre>
          </div>

          {/* DataFrame Card */}
          <div className="md:col-span-2 md:row-span-2 bg-indigo-50 border border-indigo-100 text-indigo-900 rounded-[2.5rem] p-8 transition-all shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-3 rounded-2xl">
                    <TableProperties className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">DataFrame (2D Data)</h3>
                    <p className="text-xs text-indigo-700 font-bold uppercase tracking-widest">Tabular Data</p>
                  </div>
                </div>
            </div>
            <p className="text-indigo-800/80 text-sm mb-6 leading-relaxed">
              A <strong>DataFrame</strong> is the core pandas structure. Think of it as an Excel sheet or SQL table. It's essentially a dictionary of Series objects sharing the same index.
            </p>
            <div className="bg-white/50 rounded-2xl p-2 mb-4 border border-indigo-200 flex-1 flex flex-col justify-center">
              <ZoomableImage 
                src={encodeURI("/Pandas/A table-like structure showing a Pandas DataFrame with rows and columns labeled, headers highlighted, modern UI style.png")} 
                alt="DataFrame Layout" 
                className="w-full h-auto rounded-xl object-cover max-h-[160px]"
              />
            </div>
             <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800">
{`df = pd.DataFrame({
    'Name': ['A', 'B'],
    'Age': [20, 25]
})
print(df['Name']) # Access column`}
            </pre>
          </div>

          {/* loc vs iloc Card */}
          <div className="md:col-span-2 bg-amber-50 border border-amber-100 rounded-[2.5rem] p-6 hover:bg-amber-100 transition-all shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-100 w-10 h-10 rounded-xl flex items-center justify-center text-amber-600">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900">Selection: <code>loc</code> vs <code>iloc</code></h3>
              </div>
              <p className="text-xs text-amber-800/70 leading-tight mb-4">
                <strong>loc</strong> is label-based (using row/col names). <strong>iloc</strong> is position-based (using 0-based integer indices).
              </p>
            </div>
            <ZoomableImage 
              src={encodeURI("/Pandas/Side-by-side comparison of loc vs iloc in pandas with arrows pointing to selected rows and columns.png")} 
              alt="loc vs iloc" 
              className="w-full h-auto rounded-xl border border-amber-200 shadow-sm"
            />
          </div>

          {/* Data Types Card */}
          <div className="md:col-span-2 bg-rose-50 border border-rose-100 rounded-[2.5rem] p-6 hover:bg-rose-100 transition-all shadow-sm overflow-hidden flex flex-col justify-between">
             <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-rose-100 w-10 h-10 rounded-xl flex items-center justify-center text-rose-600">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900">Pandas Data Types</h3>
              </div>
              <p className="text-xs text-rose-800/70 leading-tight mb-4">
                Pandas has specific dtypes like <code>int64</code>, <code>float64</code>, <code>object</code> (strings), and <code>datetime64</code>. Optimization uses <code>category</code>.
              </p>
            </div>
            <ZoomableImage 
              src={encodeURI("/Pandas/A visual chart showing pandas data types hierarchy: numeric, object, datetime, category with icons representing each.png")} 
              alt="Data Types" 
              className="w-full h-auto rounded-xl border border-rose-200 shadow-sm"
            />
          </div>

          {/* Code Section Card */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-10 mt-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-4 text-indigo-600">
                    <Terminal className="w-5 h-5" />
                    <h2 className="text-2xl font-bold text-slate-900">Operations in Depth</h2>
                  </div>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    Explore common workflows. Select an operation to see Python code examples alongside visual explanations.
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
                      className="bg-slate-950 rounded-3xl p-8 h-full min-h-[460px] text-slate-300 font-mono text-sm relative border border-slate-800 shadow-2xl flex flex-col"
                    >
                       <div className="absolute top-6 right-8 flex gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                       </div>
                       
                       {activeOp === "viewing" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-emerald-400"># Viewing & Inspecting Data</span>
                           <pre className="text-indigo-300 leading-relaxed mb-4 overflow-x-auto">
{`df.head()        # View first 5 rows
df.info()        # Structural info & datatypes
df.describe()    # Summary statistics (mean, std, min, max)
df.shape         # (rows, columns)
df.value_counts()# Count unique values in a series`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Pandas/Screenshot-style layout showing pandas DataFrame output with head(), info(), and describe() sections labeled.png")} 
                                alt="Viewing Data" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[220px] object-cover"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "cleaning" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-emerald-400"># Handling Missing Values & Types</span>
                           <pre className="text-indigo-300 leading-relaxed mb-4 overflow-x-auto">
{`# Find nulls
df.isnull().sum()

# Drop rows with nulls
df.dropna(inplace=True)

# Fill nulls with a value
df.fillna(0, inplace=True)

# Rename and convert type
df.rename(columns={'Name': 'FullName'}, inplace=True)
df['Age'] = df['Age'].astype(int)`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Pandas/Before and after table showing missing values cleaned in pandas, null values replaced with numbers.png")} 
                                alt="Cleaning Data" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[200px] object-cover"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "manipulation" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-amber-400"># Sorting, Adding & Applying</span>
                           <pre className="text-indigo-300 leading-relaxed mb-4 overflow-x-auto">
{`# Add or Delete columns
df['Salary'] = [1000, 2000]
df.drop('Salary', axis=1, inplace=True)

# Sorting values
df.sort_values(by='Age', ascending=False)

# Applying functions (vectorized operations are preferred!)
df['Age'] = df['Age'].apply(lambda x: x + 1)
df['Gender'] = df['Gender'].map({'M':1, 'F':0})`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Pandas/Illustration showing a DataFrame before and after sorting by a column, arrows indicating order change.png")} 
                                alt="Manipulation Diagram" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[180px] object-cover"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "grouping" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-rose-400"># GroupBy & Aggregation</span>
                           <pre className="text-indigo-300 leading-relaxed mb-4 overflow-x-auto">
{`# Group by a category and calculate mean
df.groupby('Dept')['Salary'].mean()

# Multiple aggregations
df.groupby('Dept')['Salary'].agg(['sum', 'mean', 'max'])`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Pandas/Grouped data visualization showing departments grouped with average salary calculation arrows.png")} 
                                alt="Grouping Diagram" 
                                className="w-full h-auto rounded-xl opacity-90 max-h-[220px] object-cover"
                              />
                           </div>
                         </div>
                       )}

                       {activeOp === "merging" && (
                         <div className="space-y-4 flex flex-col flex-1">
                           <span className="text-teal-400"># Combining DataFrames</span>
                           <pre className="text-indigo-300 leading-relaxed mb-4 overflow-x-auto">
{`# Merge (like SQL JOIN)
pd.merge(df1, df2, on='id', how='inner')

# Concat (stack vertically or horizontally)
pd.concat([df1, df2], axis=0) # vertical

# Join (on index)
df1.join(df2)`}
                           </pre>
                           <div className="bg-white/5 rounded-2xl p-2 border border-white/10 mt-auto">
                              <ZoomableImage 
                                src={encodeURI("/Pandas/Diagram showing merge vs join vs concat with two tables combining in different ways.png")} 
                                alt="Merging Diagram" 
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

          {/* Workflow Card */}
          <div className="md:col-span-4 bg-slate-900 text-white rounded-[2.5rem] p-10 hover:bg-slate-800 transition-all shadow-xl flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1">
               <div className="flex items-center gap-3 mb-4">
                 <div className="bg-white/10 p-3 rounded-2xl">
                   <Network className="w-6 h-6 text-indigo-400" />
                 </div>
                 <h3 className="text-2xl font-bold">Standard Pandas Workflow</h3>
               </div>
               <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                 From raw data to exported insights, most data science pipelines follow a standard procedure using pandas IO functions (<code>read_csv</code>, <code>to_csv</code>) and chaining methods.
               </p>
               <pre className="bg-slate-950 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800 overflow-x-auto">
{`# 1. Load
df = pd.read_csv('data.csv')
# 2. Inspect
print(df.head())
# 3. Clean
df.dropna(inplace=True)
# 4. Transform
df['Age'] += 1
# 5. Analyze
print(df.groupby('Dept')['Salary'].mean())
# 6. Export
df.to_csv('cleaned.csv')`}
               </pre>
             </div>
             <div className="flex-1 w-full bg-white/5 rounded-3xl p-4 border border-white/10 flex justify-center items-center">
               <ZoomableImage 
                 src={encodeURI("/Pandas/Flowchart showing pandas workflow from data loading to exporting results with arrows connecting each stage.png")} 
                 alt="Workflow" 
                 className="w-full max-w-sm h-auto rounded-xl"
               />
             </div>
          </div>

          {/* Pivot Table Card */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
             <div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <TableProperties className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Pivot Tables</h3>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed mb-6">
                 Like Excel pivot tables, it dynamically reshapes your data.
               </p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-4 mb-4">
                <ZoomableImage 
                  src={encodeURI("/Pandas/Pivot table transformation showing raw data converted into summarized table format.png")} 
                  alt="Pivot Table" 
                  className="w-full h-auto rounded-xl border border-slate-200 shadow-sm"
                />
             </div>
             <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800 overflow-x-auto">
{`pd.pivot_table(
    df, 
    values='Salary', 
    index='Dept', 
    aggfunc='mean'
)`}
             </pre>
          </div>

          {/* Time Series Card */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
             <div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Clock className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Time Series</h3>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed mb-6">
                 Pandas was built for finance! Handles dates seamlessly.
               </p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-4 mb-4">
                <ZoomableImage 
                  src={encodeURI("/Pandas/Timeline chart showing pandas time series resampling from daily to monthly.png")} 
                  alt="Time Series" 
                  className="w-full h-auto rounded-xl border border-slate-200 shadow-sm"
                />
             </div>
             <pre className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-indigo-300 border border-slate-800 overflow-x-auto">
{`df['date'] = pd.to_datetime(df['date'])
df.set_index('date', inplace=True)
# Resample daily data to monthly mean
df.resample('M').mean()`}
             </pre>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
