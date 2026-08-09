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
  ArrowRight,
  ShieldCheck,
  Search,
  BarChart3,
  Bot
} from 'lucide-react';
import Footer from '../components/Footer';

export default function Features({ setActiveTab }) {
  const featuresList = [
    {
      id: 'upload-pdf',
      title: '1. Intelligent PDF Document Processing',
      subtitle: 'Upload, parse, and analyze multi-page PDFs in seconds',
      bullets: [
        'Drag & Drop interface supporting multiple PDF file uploads.',
        'Automatic page count, file size, and chapter structural indexing.',
        'In-browser PDF reader and text preview drawer.',
        'High privacy & encrypted document storage.'
      ],
      icon: Upload,
      gradient: 'from-brand-600 to-indigo-700'
    },
    {
      id: 'ai-notes',
      title: '2. AI Chapter Notes & Summary Generator',
      subtitle: 'Transform dense textbook chapters into actionable study guides',
      bullets: [
        'Automatic extraction of chapter summaries and bulleted key points.',
        'Key terminology dictionary with plain-language explanations.',
        'Formula & equation highlights with LaTeX styling support.',
        'One-click PDF/Markdown export for offline review.'
      ],
      icon: BrainCircuit,
      gradient: 'from-purple-600 to-brand-600'
    },
    {
      id: 'flashcards',
      title: '3. Spaced Repetition 3D Flashcard Engine',
      subtitle: 'Retain concepts faster with active recall flip card decks',
      bullets: [
        'Smooth 3D flip card animations with question and answer sides.',
        'Mark cards as "Learned" or "Favorite" to filter your practice sessions.',
        'Filter flashcards by course, topic difficulty, or creation date.',
        'Custom flashcard creator for personalized study decks.'
      ],
      icon: Layers,
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'quiz-generator',
      title: '4. AI Exam & Quiz Generator',
      subtitle: 'Test your knowledge with custom difficulty question banks',
      bullets: [
        'Generates Multiple Choice (MCQ), True/False, and short answer questions.',
        'Choose difficulty levels: Easy, Medium, or Hard.',
        'Timed exam simulator with countdown timer and progress rings.',
        'Instant grading with detailed answer explanations and confetti score summary.'
      ],
      icon: HelpCircle,
      gradient: 'from-amber-500 to-rose-500'
    },
    {
      id: 'chat-pdf',
      title: '5. Context-Aware Chat with PDF',
      subtitle: 'Ask your documents anything with strict source citation bounds',
      bullets: [
        'Strictly limits AI answers to content inside uploaded PDF documents.',
        'Displays exact page citations (e.g. "Page 18, Section 4.3").',
        'Translate answers into 20+ languages instantly.',
        'Highlight and inspect source paragraphs directly in split-screen mode.'
      ],
      icon: MessageSquare,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'roadmap',
      title: '6. AI Exam Preparation Roadmap Builder',
      subtitle: 'Turn your syllabus into a structured day-by-day study schedule',
      bullets: [
        'Input exam date, subject, and current skill level.',
        'Auto-generates daily study tasks and weekly revision goals.',
        'Interactive milestone checkboxes and progress tracker.',
        'Smart revision reminders so you never cram at the last minute.'
      ],
      icon: Map,
      gradient: 'from-rose-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      <div className="pt-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-brand-500/30 text-xs font-semibold text-brand-500 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Complete Feature Directory
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Engineered for <span className="gradient-text">Academic Excellence</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Explore the full suite of AI tools designed to streamline reading, notes, flashcards, quizzes, and revision.
          </p>
        </div>

        {/* Feature Sections */}
        <div className="space-y-16">
          {featuresList.map((ft, idx) => (
            <div 
              key={ft.id} 
              className={`glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              
              <div className="space-y-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${ft.gradient} p-0.5 shadow-lg shadow-brand-500/20`}>
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
                    <ft.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {ft.title}
                </h2>
                
                <p className="text-brand-600 dark:text-brand-400 font-medium text-sm sm:text-base">
                  {ft.subtitle}
                </p>

                <ul className="space-y-3 pt-2">
                  {ft.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setActiveTab(ft.id)}
                  className="btn-primary text-xs sm:text-sm px-6 py-2.5 mt-4"
                >
                  Open Tool Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mock visual box */}
              <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-slate-300 relative shadow-2xl overflow-hidden min-h-[260px] flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-400" /> StudyMind AI Module Output
                  </span>
                  <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded font-mono">LIVE API</span>
                </div>
                <div className="py-4 space-y-2 text-xs font-mono text-slate-300">
                  <p className="text-slate-400">// Status: Model execution complete</p>
                  <p><span className="text-purple-400">INPUT:</span> "{ft.subtitle}"</p>
                  <p><span className="text-emerald-400">OUTPUT:</span> Successfully generated structured study assets for student review.</p>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Latency: 140ms</span>
                  <span>Accuracy: 99.2%</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
