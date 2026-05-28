import React, { useState } from "react";
import { 
  Search, Code2, BookOpen, Layers, Terminal, Github, Cpu, Network, 
  Database, ChevronRight, LayoutGrid, RotateCcw, Mail, ArrowLeft, 
  Workflow, Globe, Smartphone, TrendingUp, Bot, Zap, Boxes, Cloud, 
  Wifi, CheckCircle, BookOpenCheck, Clock, ShieldAlert, Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

interface Course {
  id: string;
  title: string;
  category: "Development" | "AI & Data Science" | "Systems & Hardware" | "Theory & Advanced";
  icon: React.ReactNode;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  prerequisites: string[];
  syllabus: string[];
  theme: string;
  iconBg: string;
}

interface CoursesProps {
  onBack: () => void;
  onNavigate?: (topic: string) => void;
}

const coursesData: Course[] = [
  {
    id: "devops",
    title: "DevOps",
    category: "Development",
    icon: <Workflow className="w-5 h-5" />,
    description: "Continuous integration, deployment pipelines, infrastructure as code, and cloud operations.",
    difficulty: "Intermediate",
    duration: "8 Weeks (40 Hours)",
    prerequisites: ["Basic Linux commands", "Git version control fundamentals", "Familiarity with web servers"],
    syllabus: [
      "Introduction to DevOps Culture & CI/CD Fundamentals",
      "Infrastructure as Code (IaC) with Terraform & Ansible",
      "Containerization with Docker & Image Management",
      "Container Orchestration & Scaling with Kubernetes",
      "Continuous Monitoring & Logging (Prometheus, Grafana & ELK)"
    ],
    theme: "bg-indigo-50/70 border-indigo-100 text-indigo-900 hover:bg-indigo-50 hover:border-indigo-200",
    iconBg: "bg-indigo-100 text-indigo-600"
  },
  {
    id: "networking",
    title: "Computer Networking",
    category: "Systems & Hardware",
    icon: <Network className="w-5 h-5" />,
    description: "Data communication, TCP/IP stack, routing, switching, DNS, and modern network security protocols.",
    difficulty: "Beginner",
    duration: "6 Weeks (30 Hours)",
    prerequisites: ["General computer literacy and logical reasoning"],
    syllabus: [
      "Introduction to OSI & TCP/IP Reference Models",
      "Physical & Data Link Layers: Ethernet, MAC Addressing & Framing",
      "Network Layer: IPv4/IPv6 Addressing, Subnetting & Routing Protocols",
      "Transport Layer: TCP Congestion Control vs UDP mechanics",
      "Application Layer: DNS, HTTP/HTTPS, DHCP, and Cryptographic Security"
    ],
    theme: "bg-sky-50/70 border-sky-100 text-sky-900 hover:bg-sky-50 hover:border-sky-200",
    iconBg: "bg-sky-100 text-sky-600"
  },
  {
    id: "system-design",
    title: "System Design",
    category: "Systems & Hardware",
    icon: <Cpu className="w-5 h-5" />,
    description: "Architecture of high-scale distributed systems, load balancing, databases, and microservices.",
    difficulty: "Advanced",
    duration: "10 Weeks (50 Hours)",
    prerequisites: ["Solid programming skills", "Familiarity with SQL/NoSQL databases", "Understanding of concurrency"],
    syllabus: [
      "Vertical vs Horizontal Scaling & Load Balancing Algorithms",
      "Caching Strategies (Redis/Memcached, CDN) & Cache Invalidation",
      "Database Sharding, Replication, Consistency & CAP Theorem",
      "Microservices Architecture, Event-Driven Systems & Message Queues",
      "Designing Large Scale Systems (TinyURL, Netflix, Uber, Messenger)"
    ],
    theme: "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100/70 hover:border-slate-300",
    iconBg: "bg-slate-200 text-slate-700"
  },
  {
    id: "computer-architecture",
    title: "Computer Architecture",
    category: "Systems & Hardware",
    icon: <Cpu className="w-5 h-5" />,
    description: "CPU execution cycles, instruction sets, pipelining, and virtual memory hierarchies.",
    difficulty: "Advanced",
    duration: "8 Weeks (35 Hours)",
    prerequisites: ["Digital electronics basics", "Assembly language fundamentals"],
    syllabus: [
      "Instruction Set Architecture (ISA) & CPU Cycles",
      "Pipelining, Structural & Data Hazards, and Branch Prediction",
      "Memory Hierarchy, Cache Mapping, Coherency & Virtual Memory",
      "Instruction-Level Parallelism, Superscalar & VLIW CPUs",
      "Multiprocessor Architectures & Hardware Interconnects"
    ],
    theme: "bg-amber-50/70 border-amber-100 text-amber-900 hover:bg-amber-50 hover:border-amber-200",
    iconBg: "bg-amber-100 text-amber-600"
  },
  {
    id: "web-dev",
    title: "Web Development",
    category: "Development",
    icon: <Globe className="w-5 h-5" />,
    description: "Modern front-end frameworks, responsive styles, client-side APIs, and back-end integration.",
    difficulty: "Beginner",
    duration: "12 Weeks (60 Hours)",
    prerequisites: ["No coding experience required! Beginner friendly."],
    syllabus: [
      "Semantic HTML5, CSS3 Layouts (Flexbox/Grid), and Tailwind",
      "JavaScript (ES6+) Foundations, Event Handling, and Async DOM",
      "React Framework: Hooks, State Management, and Route Setup",
      "Backend Engineering: Node.js, Express, and REST APIs",
      "Database Integration (MongoDB/PostgreSQL) & Production Deployment"
    ],
    theme: "bg-blue-50/70 border-blue-100 text-blue-900 hover:bg-blue-50 hover:border-blue-200",
    iconBg: "bg-blue-100 text-blue-600"
  },
  {
    id: "app-dev",
    title: "App Development",
    category: "Development",
    icon: <Smartphone className="w-5 h-5" />,
    description: "Cross-platform mobile application design, state management, and native API hardware integration.",
    difficulty: "Intermediate",
    duration: "10 Weeks (50 Hours)",
    prerequisites: ["Object-Oriented Programming (JavaScript, Dart, or Kotlin)"],
    syllabus: [
      "Mobile Design Principles & App Lifecycle States",
      "Cross-Platform Core: Flutter or React Native Workflows",
      "State Management Paradigms (Redux, Zustand, Bloc)",
      "Accessing Hardware: GPS, Camera, SQLite Local Database",
      "Push Notifications, App Store & Google Play Store Publishing"
    ],
    theme: "bg-emerald-50/70 border-emerald-100 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-600"
  },
  {
    id: "dsa",
    title: "Data Structure & Algorithm",
    category: "Theory & Advanced",
    icon: <Layers className="w-5 h-5" />,
    description: "Analysis of algorithms, time complexity, linear structures, trees, graphs, and dynamic programming.",
    difficulty: "Intermediate",
    duration: "12 Weeks (60 Hours)",
    prerequisites: ["Basic coding knowledge (C++, Java, or Python)"],
    syllabus: [
      "Big-O Asymptotic Notation & Algorithmic Complexity",
      "Linear structures: Arrays, Linked Lists, Stacks, Queues",
      "Non-linear structures: Trees, Binary Heaps, BSTs, and Graphs",
      "Sorting & Searching: Quick, Merge, Binary Search & Hashing",
      "Advanced Paradigms: Recursion, Greedy, & Dynamic Programming"
    ],
    theme: "bg-indigo-50/70 border-indigo-100 text-indigo-900 hover:bg-indigo-50 hover:border-indigo-200",
    iconBg: "bg-indigo-100 text-indigo-600"
  },
  {
    id: "data-science",
    title: "Data Science",
    category: "AI & Data Science",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "Statistical analysis, data visualization, exploratory processing, and predictive models.",
    difficulty: "Intermediate",
    duration: "8 Weeks (40 Hours)",
    prerequisites: ["High school math/algebra", "Basic Python experience"],
    syllabus: [
      "Numerical Python (NumPy) & Data Wrangling (Pandas)",
      "Data Visualisation using Matplotlib, Seaborn & Plotly",
      "Probability, Descriptive & Inferential Statistics",
      "Hypothesis Testing, A/B Testing & Correlation Analysis",
      "Regression Models & Scikit-Learn Machine Learning Intro"
    ],
    theme: "bg-teal-50/70 border-teal-100 text-teal-900 hover:bg-teal-50 hover:border-teal-200",
    iconBg: "bg-teal-100 text-teal-600"
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    category: "AI & Data Science",
    icon: <Cpu className="w-5 h-5" />,
    description: "Supervised and unsupervised models, gradient descent, regression, and model optimization.",
    difficulty: "Advanced",
    duration: "10 Weeks (50 Hours)",
    prerequisites: ["Linear algebra & calculus basics", "Intermediate Python programming"],
    syllabus: [
      "Supervised Algorithms: Linear/Logistic Regression, SVMs & KNNs",
      "Unsupervised Algorithms: K-Means, Hierarchical Clustering & PCA",
      "Decision Trees, Random Forests, & Boosting (XGBoost, LightGBM)",
      "Gradient Descent Mechanics, Loss Functions & Cost Optimization",
      "Model Evaluation: Overfitting, Regularization (L1/L2), ROC-AUC"
    ],
    theme: "bg-purple-50/70 border-purple-100 text-purple-900 hover:bg-purple-50 hover:border-purple-200",
    iconBg: "bg-purple-100 text-purple-600"
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    category: "AI & Data Science",
    icon: <Bot className="w-5 h-5" />,
    description: "Neural networks, deep learning, computer vision, NLP, and large language models (LLMs).",
    difficulty: "Advanced",
    duration: "12 Weeks (60 Hours)",
    prerequisites: ["Machine Learning foundations", "Strong Python programming proficiency"],
    syllabus: [
      "Neural Networks Architecture, Backpropagation, and Activation Functions",
      "Computer Vision using Convolutional Neural Networks (CNNs) & PyTorch",
      "Natural Language Processing (NLP), RNNs, LSTMs, and Text Embeddings",
      "Transformers: Self-Attention mechanism, Encoder-Decoder paradigms",
      "Generative AI: Fine-tuning Large Language Models, RAG, & AI ethics"
    ],
    theme: "bg-violet-50/70 border-violet-100 text-violet-900 hover:bg-violet-50 hover:border-violet-200",
    iconBg: "bg-violet-100 text-violet-600"
  },
  {
    id: "dbms",
    title: "DBMS",
    category: "Systems & Hardware",
    icon: <Database className="w-5 h-5" />,
    description: "Relational database models, relational algebra, SQL optimization, and indexing schemas.",
    difficulty: "Beginner",
    duration: "6 Weeks (30 Hours)",
    prerequisites: ["Basic logical reasoning"],
    syllabus: [
      "Introduction to Relational Databases & Entity-Relationship (ER) Models",
      "Advanced SQL Queries: Aggregations, Joins, Window Functions",
      "Normalization Theory: 1NF, 2NF, 3NF, BCNF & Redundancy prevention",
      "Transactions & Concurrency: ACID Rules, Lock mechanisms, Serialization",
      "Database Indexing (B-Trees/Hash Maps) & Query Plan Tuning"
    ],
    theme: "bg-rose-50/70 border-rose-100 text-rose-900 hover:bg-rose-50 hover:border-rose-200",
    iconBg: "bg-rose-100 text-rose-600"
  },
  {
    id: "robotics",
    title: "Robotics",
    category: "Systems & Hardware",
    icon: <Bot className="w-5 h-5" />,
    description: "Kinematics, sensor integration, feedback control systems, and automated path planning.",
    difficulty: "Advanced",
    duration: "8 Weeks (40 Hours)",
    prerequisites: ["Basic physics & linear algebra", "Intermediate C/C++ programming"],
    syllabus: [
      "Introduction to Robotic Mechanics, Actuators, and Servos",
      "Spatial Kinematics: Coordinate transformations, Forward/Inverse Kinematics",
      "Robotic Sensors, Odometry, and Computer Vision Perception",
      "Feedback Systems: Design and implementation of PID Controllers",
      "Robot Operating System (ROS) & Navigation / Path Finding Algorithms"
    ],
    theme: "bg-orange-50/70 border-orange-100 text-orange-900 hover:bg-orange-50 hover:border-orange-200",
    iconBg: "bg-orange-100 text-orange-600"
  },
  {
    id: "quantum-computing",
    title: "Quantum Computing",
    category: "Theory & Advanced",
    icon: <Zap className="w-5 h-5" />,
    description: "Qubits, superposition, entanglement, quantum logic gates, and Shor's algorithm.",
    difficulty: "Advanced",
    duration: "10 Weeks (45 Hours)",
    prerequisites: ["Linear algebra (vectors and matrices)", "Complex numbers"],
    syllabus: [
      "Fundamentals of Quantum Mechanics & The Physical Qubit Model",
      "Superposition, Entanglement, Quantum Measurements, and Bloch Sphere",
      "Quantum Logic Circuits: Hadamard, Pauli, CNOT, and Toffoli Gates",
      "Key Quantum Algorithms: Deutsch-Jozsa & Grover's Amplitude Amplification",
      "Shor's Factoring Algorithm & Post-Quantum Cryptography Architectures"
    ],
    theme: "bg-cyan-50/70 border-cyan-100 text-cyan-900 hover:bg-cyan-50 hover:border-cyan-200",
    iconBg: "bg-cyan-100 text-cyan-600"
  },
  {
    id: "blockchain",
    title: "Blockchain Technology",
    category: "Theory & Advanced",
    icon: <Boxes className="w-5 h-5" />,
    description: "Decentralized ledgers, consensus algorithms, cryptography, and smart contract development.",
    difficulty: "Intermediate",
    duration: "8 Weeks (35 Hours)",
    prerequisites: ["Basic cryptography (Hashing, RSA)", "Intermediate coding skills"],
    syllabus: [
      "Distributed Ledger Foundations & Cryptographic Hash Linkage",
      "Consensus Protocols: Proof of Work (PoW) vs Proof of Stake (PoS)",
      "Smart Contracts: Solidity Coding, EVM, and Deployment Pipelines",
      "Decentralized Finance (DeFi), Token Standards (ERC-20/721) & Web3.js",
      "Hyperledger Fabric, Private Blockchains, and Layer-2 Scale Systems"
    ],
    theme: "bg-fuchsia-50/70 border-fuchsia-100 text-fuchsia-900 hover:bg-fuchsia-50 hover:border-fuchsia-200",
    iconBg: "bg-fuchsia-100 text-fuchsia-600"
  },
  {
    id: "parallel-computing",
    title: "Parallel Computing",
    category: "Systems & Hardware",
    icon: <Layers className="w-5 h-5" />,
    description: "Multithreading, message passing (MPI), GPU compute clusters, and load balancing.",
    difficulty: "Advanced",
    duration: "8 Weeks (35 Hours)",
    prerequisites: ["C/C++ programming proficiency", "Basic operating systems systems"],
    syllabus: [
      "Hardware Architectures (SMP, NUMA, Clusters) & Amdahl's Scaling Law",
      "Shared Memory Parallelism: Multi-threading with OpenMP",
      "Distributed Memory Parallelism: Message Passing Interfaces (MPI)",
      "Data-Parallel Execution: GPU Programming & Core CUDA Workflows",
      "Parallel Algorithm Architectures: Sorting, Matrix Maths & Graph traversals"
    ],
    theme: "bg-stone-50 border-stone-200 text-stone-900 hover:bg-stone-100 hover:border-stone-300",
    iconBg: "bg-stone-200 text-stone-600"
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    category: "Systems & Hardware",
    icon: <Cloud className="w-5 h-5" />,
    description: "Virtualization, container orchestration, serverless microservices, and multi-tenant architectures.",
    difficulty: "Intermediate",
    duration: "8 Weeks (40 Hours)",
    prerequisites: ["Basic computer networking", "Operating systems fundamentals"],
    syllabus: [
      "Core Cloud Mechanics: Virtualization, Hypervisors & Containers",
      "Public Cloud Platforms (AWS, GCP, Azure) Services Mapping",
      "Design Patterns: Microservices, Serverless Functions, & API Gateways",
      "Cloud Security Foundations: IAM Policies, Network ACLs & VPCs",
      "Auto-Scaling, High Availability Architectures & Load Balancing"
    ],
    theme: "bg-sky-50/70 border-sky-100 text-sky-900 hover:bg-sky-50 hover:border-sky-200",
    iconBg: "bg-sky-100 text-sky-600"
  },
  {
    id: "iot",
    title: "Internet of Things",
    category: "Systems & Hardware",
    icon: <Wifi className="w-5 h-5" />,
    description: "Embedded system programming, sensor communication networks, and Edge computing nodes.",
    difficulty: "Intermediate",
    duration: "8 Weeks (35 Hours)",
    prerequisites: ["Basic programming", "Elementary electrical physics / circuits"],
    syllabus: [
      "Introduction to IoT Ecosystems & Embedded Hardware Boards",
      "Microcontrollers Programming: Arduino, ESP32, and Raspberry Pi",
      "Sensor Interfacing: Analog vs Digital inputs, Serial Bus protocols",
      "IoT Connectivity: MQTT, CoAP, Zigbee, WiFi, and LoRaWAN",
      "Edge Computing: Local analytics & cloud data upload integration"
    ],
    theme: "bg-emerald-50/70 border-emerald-100 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-600"
  },
  {
    id: "compiler-design",
    title: "Compiler Design",
    category: "Theory & Advanced",
    icon: <Terminal className="w-5 h-5" />,
    description: "Lexical analysis, syntax trees, semantic checks, code generation, and target code optimization.",
    difficulty: "Advanced",
    duration: "10 Weeks (45 Hours)",
    prerequisites: ["Theory of Computation (Automata & Grammars)", "Solid DSA foundations"],
    syllabus: [
      "Lexical Analysis: Regular expressions to Finite Automata scanners",
      "Syntax Analysis: Context-Free Grammars, LL(1) and LR(1) Parsers",
      "Semantic Analysis: Type checking, Scope evaluation & Symbol Tables",
      "Intermediate Code Generation (ICG): Three-address code, AST structures",
      "Target Code Generation, Register Allocation, and Code Optimization"
    ],
    theme: "bg-rose-50/70 border-rose-100 text-rose-900 hover:bg-rose-50 hover:border-rose-200",
    iconBg: "bg-rose-100 text-rose-600"
  },
  {
    id: "data-mining",
    title: "Data Mining",
    category: "AI & Data Science",
    icon: <Search className="w-5 h-5" />,
    description: "Pattern recognition, cluster analysis, association rule learning, and large-scale data extraction.",
    difficulty: "Intermediate",
    duration: "8 Weeks (35 Hours)",
    prerequisites: ["Basic statistics", "Database knowledge"],
    syllabus: [
      "Data Preprocessing: Cleaning, Integration, Reduction, Discretization",
      "Association Rule Mining: Apriori and FP-Growth algorithms",
      "Classification Models: Naive Bayes, Decision Trees, KNN, Random Forests",
      "Cluster Analysis: Hierarchical clustering, K-Means, DBSCAN",
      "Anomaly Detection, Outlier Analysis, and Web/Text Mining Foundations"
    ],
    theme: "bg-yellow-50/70 border-yellow-100 text-yellow-900 hover:bg-yellow-50 hover:border-yellow-200",
    iconBg: "bg-yellow-100 text-yellow-600"
  }
];

const categories = ["All", "Development", "AI & Data Science", "Systems & Hardware", "Theory & Advanced"] as const;

export default function Courses({ onBack, onNavigate }: CoursesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourseId, setEnrolledCourseId] = useState<string | null>(null);
  const [successAnimation, setSuccessAnimation] = useState(false);

  const handleNav = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    } else {
      onBack();
    }
  };

  const handleEnroll = (courseId: string) => {
    setEnrolledCourseId(courseId);
    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
      setSelectedCourse(null);
    }, 2000);
  };

  // Filter courses based on active category pill and search query
  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fdfdfd] selection:bg-indigo-100 selection:text-indigo-900 font-sans flex flex-col relative overflow-x-hidden">
      <Navbar 
        activePage="courses" 
        onNavigate={(page) => { 
          if (page) onNavigate?.(page); 
          else onBack(); 
        }} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-12 md:py-16 flex-1 w-full relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
              Interactive Academic Courses
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto mb-10 text-lg">
              Unlock depth and complexity in computer science. Click on any course card to inspect its syllabus, prerequisites, and modules.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-xl mx-auto relative group mb-8"
          >
            <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-xl group-hover:bg-indigo-500/20 transition-colors"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-indigo-400" />
              <Input 
                type="text" 
                placeholder="Search DevOps, Systems, Artificial Intelligence..." 
                className="w-full pl-12 pr-4 py-4 md:py-6 rounded-2xl border-slate-200 bg-white shadow-sm text-base focus-visible:ring-indigo-500 focus-visible:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm border",
                  activeCategory === cat 
                    ? "bg-indigo-600 border-indigo-600 text-white scale-105" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Courses Bento-style Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card 
                  className={cn(
                    "h-full border transition-all duration-300 cursor-pointer rounded-[2rem] hover:shadow-xl shadow-sm flex flex-col p-6 relative overflow-hidden group",
                    course.theme
                  )}
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.02] rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:rotate-6", course.iconBg)}>
                      {course.icon}
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 bg-white/60 backdrop-blur-sm rounded-md border border-slate-100/30 text-slate-600">
                      {course.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                    {course.title}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                    {course.description}
                  </p>

                  <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500 font-semibold mt-auto">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.duration}
                    </span>
                    <span className="text-indigo-600 font-bold uppercase tracking-wider text-[10px] bg-indigo-50/50 px-2 py-0.5 rounded-sm">
                      {course.category}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty Search State */}
        {filteredCourses.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem] max-w-xl mx-auto"
          >
            <ShieldAlert className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No courses match your search</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
              Try exploring other terms or clearing the current search input.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-6 text-sm font-bold text-indigo-600 hover:text-indigo-500 inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Filters
            </button>
          </motion.div>
        )}

      </main>

      {/* Course Detail Interactive Overlay Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark Overlay Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => { if (!successAnimation) setSelectedCourse(null); }}
            />

            {/* Modal Panel container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Colorful Header Bar */}
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"></div>

              {/* Success Enrolled Screen */}
              <AnimatePresence>
                {successAnimation && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center text-center p-8"
                  >
                    <motion.div
                      initial={{ scale: 0.5, rotate: -30 }}
                      animate={{ scale: [0.5, 1.1, 1], rotate: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6 border-4 border-emerald-100"
                    >
                      <CheckCircle className="w-10 h-10" />
                    </motion.div>
                    <h3 className="text-2xl font-extrabold text-slate-900">Enrolled Successfully!</h3>
                    <p className="text-slate-500 mt-2 max-w-sm">
                      You are now registered for **{selectedCourse.title}**. Your curriculum documentation, challenges, and labs are unlocked in your account.
                    </p>
                    <div className="mt-8 text-xs text-indigo-500 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1.5">
                      <BookOpenCheck className="w-4 h-4" />
                      Starting your onboarding console...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", selectedCourse.iconBg)}>
                      {selectedCourse.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-sm">
                        {selectedCourse.category}
                      </span>
                      <h2 className="text-2xl font-extrabold text-slate-900 mt-1">{selectedCourse.title}</h2>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center font-bold"
                  >
                    &times;
                  </button>
                </div>

                {/* Grid Metadata */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
                  <div className="text-center">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Difficulty</div>
                    <div className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                      <Award className="w-3.5 h-3.5 text-indigo-500" />
                      {selectedCourse.difficulty}
                    </div>
                  </div>
                  <div className="text-center border-x border-slate-200">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Duration</div>
                    <div className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {selectedCourse.duration.split(" (")[0]}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Modules</div>
                    <div className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      {selectedCourse.syllabus.length} Modules
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Overview</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{selectedCourse.description}</p>
                </div>

                {/* Prerequisites */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-2.5 uppercase tracking-wide">Prerequisites</h4>
                  <ul className="space-y-1.5">
                    {selectedCourse.prerequisites.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Syllabus Modules */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3.5 uppercase tracking-wide">Curriculum & Syllabus</h4>
                  <div className="space-y-3">
                    {selectedCourse.syllabus.map((topic, i) => (
                      <div key={i} className="flex items-start gap-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-3.5 rounded-xl transition-all">
                        <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-sm">{topic}</h5>
                          <p className="text-[11px] text-slate-500 mt-0.5">Interactive lectures, practical coding sandbox environments, and assessments.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer Actions */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-[2.5rem]">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-6 py-3.5 rounded-xl font-bold text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleEnroll(selectedCourse.id)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all text-sm shadow-md shadow-indigo-900/10 flex items-center gap-2"
                >
                  Enroll in Course
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
