import React from 'react';
import { 
  Sparkles, 
  Upload, 
  BrainCircuit, 
  Layers, 
  HelpCircle, 
  MessageSquare, 
  Map, 
  Zap, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Globe,
  TrendingUp
} from 'lucide-react';
import Footer from '../components/Footer';

export default function Home({ setActiveTab }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        
        {/* Glow Blobs Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-600/30 via-purple-600/20 to-cyan-500/30 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-brand-500/30 text-xs sm:text-sm font-medium text-brand-600 dark:text-brand-300 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Next-Gen AI Study OS 2.0 Released</span>
            <span className="px-2 py-0.5 rounded-full bg-brand-500 text-white font-mono text-[10px]">NEW</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15] mb-6">
            Master Any Subject <br />
            <span className="gradient-text">10x Faster</span> with AI Precision
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal mb-10 leading-relaxed">
            Upload PDFs, generate instant chapter notes, 3D interactive flashcards, timed quizzes, and step-by-step exam roadmaps tailored for your curriculum.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto shadow-2xl shadow-brand-500/30"
            >
              Launch Dashboard Free
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('upload-pdf')}
              className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto"
            >
              <Upload className="w-5 h-5 text-brand-500" />
              Upload PDF Now
            </button>
          </div>

          {/* Live Interactive SaaS Graphic Illustration */}
          <div className="relative max-w-5xl mx-auto rounded-3xl p-3 sm:p-5 glass-panel border border-white/30 dark:border-slate-800/80 shadow-2xl animate-slide-up">
            
            {/* Window bar controls */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800/80 mb-4 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-slate-400 font-sans font-medium text-xs">StudyMind AI Engine Workspace v2.4</span>
              <div className="flex items-center gap-1.5 text-emerald-500 font-sans text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                GPT-4o & Gemini 1.5 Connected
              </div>
            </div>

            {/* Glass Dashboard Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left p-2">
              
              {/* Feature Box 1: PDF Notes */}
              <div 
                onClick={() => setActiveTab('ai-notes')}
                className="p-5 rounded-2xl glass-card border border-brand-500/20 hover:border-brand-500 cursor-pointer group transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-500">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400">
                    Auto Notes
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-brand-400 transition-colors">
                  AI Chapter Summaries
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Extract definitions, key concepts, bullet lists, and formulas from 100+ page textbooks instantly.
                </p>
                <div className="flex items-center text-xs font-semibold text-brand-500 group-hover:translate-x-1 transition-transform">
                  Try Notes Generator <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>

              {/* Feature Box 2: 3D Flashcards */}
              <div 
                onClick={() => setActiveTab('flashcards')}
                className="p-5 rounded-2xl glass-card border border-purple-500/20 hover:border-purple-500 cursor-pointer group transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                    3D Decks
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-purple-400 transition-colors">
                  Interactive Flashcards
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Spaced repetition cards with 3D flip animation, mark as learned, and topic filters.
                </p>
                <div className="flex items-center text-xs font-semibold text-purple-500 group-hover:translate-x-1 transition-transform">
                  Launch Study Decks <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>

              {/* Feature Box 3: Quiz & Chat */}
              <div 
                onClick={() => setActiveTab('quiz-generator')}
                className="p-5 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-500 cursor-pointer group transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                    Instant Quiz
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  AI Quiz Generator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Generate MCQs, True/False, and short questions with automatic grading and step-by-step feedback.
                </p>
                <div className="flex items-center text-xs font-semibold text-cyan-500 group-hover:translate-x-1 transition-transform">
                  Take A Practice Quiz <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>

            </div>

          </div>

          {/* Social Proof Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { val: '250,000+', label: 'PDF Documents Analyzed', icon: Upload },
              { val: '4.9 / 5.0', label: 'Student Rating Score', icon: Star },
              { val: '98.4%', label: 'Exam Score Improvement', icon: TrendingUp },
              { val: '120+', label: 'Universities Supported', icon: Globe },
            ].map((st, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white gradient-text">
                  {st.val}
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <st.icon className="w-3.5 h-3.5 text-brand-500" />
                  {st.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Deep Feature Showcase Grid Section */}
      <section className="py-20 bg-slate-100/50 dark:bg-slate-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
              All-In-One SaaS Learning Suite
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
              Everything You Need to <span className="gradient-text">Ace Exams</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
              Designed specifically for university students, online learners, researchers, and educators who demand speed and accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 'upload-pdf',
                title: 'Drag & Drop PDF Intelligence',
                desc: 'Upload multi-page textbooks, slide decks, research papers, or syllabus documents with instant text parsing.',
                icon: Upload,
                color: 'text-brand-500 bg-brand-500/10 border-brand-500/20'
              },
              {
                id: 'ai-notes',
                title: 'AI Chapter Notes & Summaries',
                desc: 'Generate bullet point summaries, key definitions, formulas, and plain-language explanations in seconds.',
                icon: BrainCircuit,
                color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
              },
              {
                id: 'flashcards',
                title: 'Spaced Repetition 3D Flashcards',
                desc: 'Master complex terms with interactive flip card decks, mark learned items, and track your retention score.',
                icon: Layers,
                color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'
              },
              {
                id: 'quiz-generator',
                title: 'AI Quiz & Exam Generator',
                desc: 'Create custom difficulty MCQs, True/False, and short questions with real-time scoring and solutions.',
                icon: HelpCircle,
                color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
              },
              {
                id: 'chat-pdf',
                title: 'Chat Directly with PDF Documents',
                desc: 'Ask questions, highlight text, translate paragraphs, and retrieve accurate page citation references.',
                icon: MessageSquare,
                color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
              },
              {
                id: 'roadmap',
                title: 'Exam Preparation Roadmap',
                desc: 'Input your exam date and subject to get an AI-crafted daily study calendar, revision goals, and milestones.',
                icon: Map,
                color: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
              }
            ].map(ft => (
              <div 
                key={ft.id}
                onClick={() => setActiveTab(ft.id)}
                className="glass-card p-6 rounded-3xl border hover:border-brand-500/50 cursor-pointer group transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className={`w-12 h-12 rounded-2xl ${ft.color} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <ft.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors">
                  {ft.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {ft.desc}
                </p>
                <div className="flex items-center text-xs font-bold text-brand-500 group-hover:translate-x-1 transition-transform">
                  Explore Tool <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-brand-700 via-purple-700 to-cyan-600 text-white overflow-hidden shadow-2xl">
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4 animate-spin-slow" />
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                Ready to Supercharge Your Academic Success?
              </h2>
              <p className="text-slate-100 text-base mb-8">
                Join thousands of students and teachers saving 15+ hours every week with StudyMind AI.
              </p>
              <button
                onClick={() => setActiveTab('register')}
                className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-all text-base inline-flex items-center gap-2"
              >
                Create Your Free Account <ArrowRight className="w-5 h-5 text-brand-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
