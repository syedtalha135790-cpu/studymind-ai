import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, 
  Flame, 
  Award, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Star, 
  BrainCircuit, 
  Layers 
} from 'lucide-react';

export default function ProgressTracker({ setActiveTab }) {
  const { user } = useAuth();

  const badges = [
    { title: '10-Day Streak Master', desc: 'Maintained a 10+ day study streak.', icon: Flame, unlocked: true, color: 'text-amber-500 bg-amber-500/10' },
    { title: 'PDF Researcher', desc: 'Uploaded & parsed 25+ PDF documents.', icon: BrainCircuit, unlocked: true, color: 'text-brand-500 bg-brand-500/10' },
    { title: 'Quiz Master', desc: 'Scored 90%+ on 10 practice quizzes.', icon: Award, unlocked: true, color: 'text-cyan-500 bg-cyan-500/10' },
    { title: 'Flashcard Wizard', desc: 'Mastered 100+ active recall cards.', icon: Layers, unlocked: true, color: 'text-purple-500 bg-purple-500/10' },
    { title: 'Scholar Legend', desc: 'Logged 100 total hours of study.', icon: Star, unlocked: false, color: 'text-slate-500 bg-slate-800' },
    { title: 'Exam Ace', desc: 'Completed a 30-day exam roadmap.', icon: Zap, unlocked: false, color: 'text-slate-500 bg-slate-800' },
  ];

  const weakTopics = [
    { topic: 'Backpropagation Gradient Calculus', subject: 'Computer Science', accuracy: '45%', recommendation: 'Review PDF Notes Chapter 4 & Retake Quiz' },
    { topic: 'Electrophilic Aromatic Mechanisms', subject: 'Chemistry', accuracy: '52%', recommendation: 'Practice 3D Flashcards Deck' },
    { topic: 'Monetary Supply Rates', subject: 'Economics', accuracy: '68%', recommendation: 'Ask Chat with PDF Page 12' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-brand-500" />
            Learning Analytics & Progress Tracker
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track study velocity, retention rates, weak topic radar, and unlocked achievement badges.
          </p>
        </div>
      </div>

      {/* Top 3 Stat Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">Current Streak</span>
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500 animate-bounce" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold">{user.studyStreak} Days 🔥</div>
          <p className="text-xs text-slate-300 mt-2">Active daily study streak. Next milestone at 15 days!</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 via-slate-900 to-slate-950 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400">Total Hours</span>
            <Clock className="w-6 h-6 text-brand-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold">{user.totalHours} hrs</div>
          <p className="text-xs text-slate-300 mt-2">Average 2.4 hours / day logged across all subjects.</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">Average Quiz Accuracy</span>
            <Award className="w-6 h-6 text-cyan-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold">92.4%</div>
          <p className="text-xs text-slate-300 mt-2">Top 5% accuracy score among university learners.</p>
        </div>

      </div>

      {/* Weak Topics Focus Radar */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-rose-500" />
              Weak Topics Radar & Recommended Focus
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Identified from quiz answer failures and flashcard repetition rates.</p>
          </div>
        </div>

        <div className="space-y-3">
          {weakTopics.map((wt, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    Accuracy: {wt.accuracy}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{wt.subject}</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{wt.topic}</h4>
                <p className="text-xs text-slate-400">Recommendation: {wt.recommendation}</p>
              </div>

              <button 
                onClick={() => setActiveTab('quiz-generator')}
                className="btn-primary text-xs px-4 py-2 shrink-0"
              >
                Practice Topic Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Unlocked Achievement Badges Grid */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Achievement Badges & Milestones
          </h2>
          <span className="text-xs font-mono text-slate-400">4 / 6 Unlocked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${b.unlocked ? 'glass-card border-brand-500/30' : 'bg-slate-900/40 border-slate-800 opacity-60'}`}
              >
                <div className={`p-3 rounded-2xl ${b.color} shrink-0`}>
                  {b.unlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-6 h-6 text-slate-500" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{b.title}</h3>
                    {b.unlocked && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{b.desc}</p>
                  <span className={`text-[10px] font-mono font-bold uppercase mt-2 inline-block ${b.unlocked ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {b.unlocked ? 'UNLOCKED ✓' : 'LOCKED 🔒'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
