import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  Layers, 
  HelpCircle, 
  MessageSquare, 
  Map, 
  BrainCircuit, 
  BarChart3, 
  User, 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Flame, 
  Zap, 
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, closeMobileSidebar }) {
  const { user } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'upload-pdf', label: 'Upload PDF', icon: Upload, badge: 'Drop' },
    { id: 'ai-notes', label: 'AI Notes', icon: FileText, badge: 'AI' },
    { id: 'flashcards', label: 'Flashcards', icon: Layers, badge: '3D' },
    { id: 'quiz-generator', label: 'Quiz Generator', icon: HelpCircle, badge: 'Auto' },
    { id: 'chat-pdf', label: 'Chat with PDF', icon: MessageSquare, badge: 'Live' },
    { id: 'roadmap', label: 'Study Roadmap', icon: Map, badge: 'Plan' },
    { id: 'homework-assistant', label: 'Homework AI', icon: BrainCircuit, badge: 'Solver' },
    { id: 'progress-tracker', label: 'Progress Tracker', icon: BarChart3, badge: null },
  ];

  const secondaryItems = [
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  if (user?.isAdmin) {
    secondaryItems.push({ id: 'admin', label: 'Admin Console', icon: ShieldCheck, isSpecial: true });
  }

  const handleSelect = (id) => {
    setActiveTab(id);
    if (closeMobileSidebar) closeMobileSidebar();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 glass-panel border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        <div className="p-4 flex-1 overflow-y-auto">
          
          {/* Mobile Header with Close Button */}
          <div className="flex items-center justify-between md:hidden mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <span className="font-bold text-slate-900 dark:text-white">StudyMind Navigation</span>
            </div>
            <button onClick={closeMobileSidebar} className="p-1 rounded-lg text-slate-400 hover:text-slate-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Study Streak Card Header */}
          <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-brand-600/10 via-purple-600/10 to-cyan-500/10 border border-brand-500/20 dark:border-brand-400/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-500 animate-bounce">
                  <Flame className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Study Streak</div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white">{user?.studyStreak || 12} Days 🔥</div>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-300">
                ACTIVE
              </span>
            </div>

            {/* Daily Goal Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                <span>Daily Goal (1.5 / 2.0 hrs)</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">75%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-500 via-purple-500 to-cyan-400 rounded-full w-[75%] transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Primary Nav Section */}
          <div className="space-y-1">
            <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Study Tools & AI
            </div>

            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-lg shadow-brand-500/25 font-semibold' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-brand-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  
                  {item.badge && (
                    <span className={`
                      text-[10px] font-bold font-mono px-2 py-0.5 rounded-md uppercase tracking-wider
                      ${isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-brand-500/20 group-hover:text-brand-400'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Secondary Nav Section */}
          <div className="space-y-1 mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Account & Admin
            </div>

            {secondaryItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? 'bg-slate-900 dark:bg-slate-800 text-white font-semibold' 
                      : item.isSpecial 
                        ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isSpecial ? 'text-amber-500' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              );
            })}
          </div>

        </div>

        {/* Footer Pro Upgrade Badge */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-900/40 to-brand-900/40 border border-purple-500/30 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold">Pro Plan Active</span>
            </div>
            <p className="text-[11px] text-slate-300 mb-2">Unlimited PDF analysis & GPT-4o access enabled.</p>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Tokens: 42.8k / 100k</span>
              <span>42.8%</span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}
