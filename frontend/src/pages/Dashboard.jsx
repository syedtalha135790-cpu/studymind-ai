import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useStudy } from '../context/StudyContext';
import { 
  Sparkles, 
  Upload, 
  FileText, 
  Layers, 
  HelpCircle, 
  MessageSquare, 
  Map, 
  BrainCircuit, 
  Flame, 
  Clock, 
  Award, 
  TrendingUp, 
  Plus, 
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Zap
} from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  const { user } = useAuth();
  const { documents, notes, flashcards, quizzes } = useStudy();

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Top Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-brand-500/30 overflow-hidden shadow-2xl">
        
        {/* Glow Blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-brand-600/30 via-purple-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-brand-500/30 shadow-xl" 
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-300 border border-brand-500/30">
                  {user.major}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {user.university}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                You’re on a <span className="font-bold text-amber-500">{user.studyStreak}-day streak</span>! Keep up the momentum for upcoming exams.
              </p>
            </div>
          </div>

          {/* Quick Upload CTA */}
          <button
            onClick={() => setActiveTab('upload-pdf')}
            className="btn-primary text-sm px-6 py-3 shrink-0 shadow-lg shadow-brand-500/30"
          >
            <Upload className="w-4 h-4" /> Upload New PDF
          </button>

        </div>

      </div>

      {/* 4 Stat Overview Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Stat 1: Study Streak */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Learning Streak</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{user.studyStreak} Days</div>
          <div className="text-[11px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +2 days than last week
          </div>
        </div>

        {/* Stat 2: Total Study Hours */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Study Time</span>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{user.totalHours} hrs</div>
          <div className="text-[11px] text-brand-500 font-semibold mt-1">
            4.8 hrs logged this week
          </div>
        </div>

        {/* Stat 3: Flashcards Mastered */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Flashcards Mastered</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{user.flashcardsLearned}</div>
          <div className="text-[11px] text-purple-400 font-semibold mt-1">
            85% retention score
          </div>
        </div>

        {/* Stat 4: Quizzes Passed */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quizzes Completed</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{user.quizzesCompleted}</div>
          <div className="text-[11px] text-cyan-400 font-semibold mt-1">
            Avg Score: 92%
          </div>
        </div>

      </div>

      {/* Quick Launchers Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-500" />
            AI Study Workspace Launchers
          </h2>
          <span className="text-xs text-slate-400 font-mono">10 Modules Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'upload-pdf', title: 'Upload & Parse PDF', desc: 'Drag & drop documents for instant AI analysis.', icon: Upload, color: 'text-brand-500 bg-brand-500/10' },
            { id: 'ai-notes', title: 'AI Notes & Summaries', desc: 'Generate key concepts, bullet notes, and formulas.', icon: BrainCircuit, color: 'text-purple-500 bg-purple-500/10' },
            { id: 'flashcards', title: '3D Interactive Flashcards', desc: 'Active recall cards with flip animations.', icon: Layers, color: 'text-cyan-500 bg-cyan-500/10' },
            { id: 'quiz-generator', title: 'AI Practice Quiz Engine', desc: 'MCQs, T/F & instant scoring feedback.', icon: HelpCircle, color: 'text-amber-500 bg-amber-500/10' },
            { id: 'chat-pdf', title: 'Chat with PDF Document', desc: 'Ask questions with direct page citations.', icon: MessageSquare, color: 'text-emerald-500 bg-emerald-500/10' },
            { id: 'roadmap', title: 'Exam Roadmap Planner', desc: 'Personalized daily schedule & milestone tasks.', icon: Map, color: 'text-rose-500 bg-rose-500/10' },
          ].map(item => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/40 cursor-pointer group transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-brand-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Recent Documents & Weekly Study Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Col 1 & 2: Recent Documents Table */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-500" />
              Uploaded Study PDFs
            </h3>
            <button 
              onClick={() => setActiveTab('upload-pdf')}
              className="text-xs font-semibold text-brand-500 hover:underline flex items-center gap-1"
            >
              View All Documents ({documents.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {documents.map(doc => (
              <div 
                key={doc.id}
                onClick={() => setActiveTab('ai-notes')}
                className="p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-brand-500/10 text-brand-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-brand-500 transition-colors">
                      {doc.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {doc.pages} pages • {doc.size} • Uploaded {doc.uploadDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Ready
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Weekly Activity Chart (Glass SVG bar visualization) */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Weekly Hours</h3>
              <span className="text-xs font-mono text-slate-400">Aug 3 - Aug 9</span>
            </div>

            {/* Glass Bar Chart SVG */}
            <div className="py-6">
              <div className="flex items-end justify-between gap-2 h-40 pt-4 border-b border-slate-200 dark:border-slate-800">
                {[
                  { day: 'Mon', hrs: 1.5, pct: '40%' },
                  { day: 'Tue', hrs: 2.2, pct: '60%' },
                  { day: 'Wed', hrs: 3.8, pct: '90%' },
                  { day: 'Thu', hrs: 2.5, pct: '65%' },
                  { day: 'Fri', hrs: 4.1, pct: '100%' },
                  { day: 'Sat', hrs: 3.0, pct: '75%' },
                  { day: 'Sun', hrs: 2.0, pct: '50%' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                      {bar.hrs}h
                    </span>
                    <div className="w-full max-w-[28px] bg-slate-200 dark:bg-slate-800 rounded-t-lg overflow-hidden flex items-end h-32">
                      <div 
                        style={{ height: bar.pct }} 
                        className="w-full bg-gradient-to-t from-brand-600 via-purple-600 to-cyan-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {bar.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Goal: 15 hrs / week</span>
            <span className="font-bold text-brand-500">19.1 hrs total logged 🎉</span>
          </div>
        </div>

      </div>

    </div>
  );
}
