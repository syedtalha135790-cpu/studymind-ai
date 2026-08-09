import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  Map, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Target, 
  Flame, 
  Bell 
} from 'lucide-react';

export default function Roadmap({ setActiveTab }) {
  const { roadmaps, addRoadmap } = useStudy();
  const [activeRoadmap, setActiveRoadmap] = useState(roadmaps[0]);

  // Generator form inputs
  const [examTitle, setExamTitle] = useState('Final Exam - Organic Chemistry II');
  const [examDate, setExamDate] = useState('2026-09-25');
  const [subject, setSubject] = useState('Organic Chemistry');
  const [skillLevel, setSkillLevel] = useState('Intermediate');
  const [dailyMinutes, setDailyMinutes] = useState(90);

  const handleGenerateRoadmap = (e) => {
    e.preventDefault();
    const newRm = {
      id: `rm-${Date.now()}`,
      examTitle: examTitle,
      targetDate: examDate,
      subject: subject,
      skillLevel: skillLevel,
      dailyGoalMinutes: dailyMinutes,
      progressPercent: 15,
      milestones: [
        { week: 'Week 1', title: 'Aromaticity & Electrophilic Substitution', status: 'in-progress', date: 'Aug 10 - Aug 16' },
        { week: 'Week 2', title: 'Nucleophilic Aromatic & Organometallics', status: 'upcoming', date: 'Aug 17 - Aug 23' },
        { week: 'Week 3', title: 'Aldehydes, Ketones & Carboxylic Acids', status: 'upcoming', date: 'Aug 24 - Aug 30' },
        { week: 'Week 4', title: 'Synthesis Routes & Spectroscopic Analysis', status: 'upcoming', date: 'Sep 1 - Sep 10' },
        { week: 'Week 5', title: 'Full Practice Exams & Revision Mock Tests', status: 'upcoming', date: 'Sep 11 - Sep 24' }
      ]
    };
    setActiveRoadmap(newRm);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Map className="w-8 h-8 text-rose-500" />
            AI Exam Preparation Roadmap
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Transform your syllabus into a structured, day-by-day study schedule with weekly revision goals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Generator Wizard Form */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
            <Sparkles className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Plan New Exam Roadmap</h3>
          </div>

          <form onSubmit={handleGenerateRoadmap} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Exam Title / Goal</label>
              <input
                type="text"
                required
                value={examTitle}
                onChange={e => setExamTitle(e.target.value)}
                className="glass-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Exam Date</label>
              <input
                type="date"
                required
                value={examDate}
                onChange={e => setExamDate(e.target.value)}
                className="glass-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject Category</label>
              <input
                type="text"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="glass-input w-full text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Skill Level</label>
                <select
                  value={skillLevel}
                  onChange={e => setSkillLevel(e.target.value)}
                  className="glass-input w-full text-xs"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Daily Study</label>
                <select
                  value={dailyMinutes}
                  onChange={e => setDailyMinutes(Number(e.target.value))}
                  className="glass-input w-full text-xs"
                >
                  <option value={45}>45 mins / day</option>
                  <option value={90}>90 mins / day</option>
                  <option value={120}>2 hours / day</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-xs sm:text-sm font-bold shadow-lg shadow-brand-500/20">
              Generate AI Study Plan
            </button>
          </form>
        </div>

        {/* Right Col: Timeline & Milestone Roadmap Display */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6">
          
          {/* Active Roadmap Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-900/40 via-purple-900/40 to-brand-900/40 border border-rose-500/30 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                ACTIVE AI SCHEDULE
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold mt-1">{activeRoadmap.examTitle}</h2>
              <div className="flex items-center gap-4 text-xs text-slate-300 mt-2 font-mono">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-rose-400" /> Target: {activeRoadmap.targetDate}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-cyan-400" /> {activeRoadmap.dailyGoalMinutes} mins/day</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-2xl font-extrabold text-cyan-300">{activeRoadmap.progressPercent}%</span>
              <p className="text-[11px] text-slate-400">Roadmap Completed</p>
            </div>
          </div>

          {/* Timeline Milestones list */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-500" />
              Weekly Revision Milestones & Schedule
            </h3>

            <div className="space-y-4 relative before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {activeRoadmap.milestones.map((ms, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-12 group">
                  
                  {/* Circle Marker */}
                  <div className={`
                    absolute left-3.5 top-3 -translate-x-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${ms.status === 'completed' 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : ms.status === 'in-progress' 
                        ? 'bg-brand-600 border-brand-500 ring-4 ring-brand-500/20' 
                        : 'bg-slate-900 border-slate-700 text-transparent'}
                  `}>
                    {ms.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800/80 w-full group-hover:border-brand-500/40 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-brand-500">{ms.week} • {ms.date}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${ms.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : ms.status === 'in-progress' ? 'bg-brand-500/20 text-brand-400' : 'bg-slate-800 text-slate-400'}`}>
                        {ms.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{ms.title}</h4>
                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400">Daily Study Tasks Assigned</span>
                      <button 
                        onClick={() => setActiveTab('quiz-generator')}
                        className="text-brand-500 font-semibold hover:underline flex items-center gap-1"
                      >
                        Take Revision Quiz →
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
