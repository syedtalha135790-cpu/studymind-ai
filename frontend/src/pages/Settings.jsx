import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Settings as SettingsIcon, Cpu, Key, Moon, Sun, Bell, Shield, Save, Check } from 'lucide-react';

export default function Settings() {
  const { darkMode, toggleTheme } = useTheme();
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="w-8 h-8 text-cyan-500" />
          System & AI Engine Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize AI models, dark/light theme, API keys, and study notification triggers.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Section 1: AI Model Configuration */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <Cpu className="w-5 h-5 text-brand-500" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI Engine Provider</h3>
              <p className="text-xs text-slate-400">Select which LLM powers your PDF summaries, quiz generation, and chat.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div 
              onClick={() => setSelectedModel('gpt-4o')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${selectedModel === 'gpt-4o' ? 'glass-panel bg-brand-500/10 border-brand-500 ring-2 ring-brand-500/40' : 'glass-card border-slate-200 dark:border-slate-800'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 dark:text-white text-base">OpenAI GPT-4o</span>
                <span className="text-[10px] font-mono font-bold bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded">RECOMMENDED</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Superior reasoning for complex academic math, code, and chemistry questions.</p>
            </div>

            <div 
              onClick={() => setSelectedModel('gemini-1.5')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${selectedModel === 'gemini-1.5' ? 'glass-panel bg-cyan-500/10 border-cyan-500 ring-2 ring-cyan-500/40' : 'glass-card border-slate-200 dark:border-slate-800'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 dark:text-white text-base">Google Gemini 1.5 Pro</span>
                <span className="text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">2M CONTEXT</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ultra long context window ideal for 300+ page textbook PDFs.</p>
            </div>

          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Custom API Key (Optional)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                placeholder="sk-proj-••••••••••••••••••••••••"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                className="glass-input w-full pl-10 text-xs font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Leave empty to use StudyMind AI managed API credits.</p>
          </div>
        </div>

        {/* Section 2: Appearance & Theme */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            {darkMode ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Appearance & Dark Mode</h3>
              <p className="text-xs text-slate-400">Toggle between Dark SaaS glassmorphism and Light mode.</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">Theme State</p>
              <p className="text-xs text-slate-400">Currently active: <span className="font-semibold text-brand-400">{darkMode ? 'Dark Glass Mode' : 'Light Mode'}</span></p>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="btn-secondary text-xs px-5 py-2.5"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-500" />}
              Toggle Theme
            </button>
          </div>
        </div>

        {/* Section 3: Notification Preferences */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <Bell className="w-5 h-5 text-rose-500" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Notifications & Reminders</h3>
              <p className="text-xs text-slate-400">Manage daily study goal alerts and revision schedule reminders.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">Daily Streak Reminder</p>
                <p className="text-xs text-slate-400">Receive alert at 8:00 PM if daily study goal is incomplete.</p>
              </div>
              <input 
                type="checkbox" 
                checked={streakReminders} 
                onChange={e => setStreakReminders(e.target.checked)}
                className="w-5 h-5 accent-brand-600 rounded cursor-pointer" 
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">Exam Revision Notifications</p>
                <p className="text-xs text-slate-400">Get weekly roadmap milestone updates via email.</p>
              </div>
              <input 
                type="checkbox" 
                checked={emailAlerts} 
                onChange={e => setEmailAlerts(e.target.checked)}
                className="w-5 h-5 accent-brand-600 rounded cursor-pointer" 
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full py-4 text-base font-bold shadow-xl shadow-brand-500/30">
          {saved ? <Check className="w-5 h-5 text-emerald-300" /> : <Save className="w-5 h-5" />}
          {saved ? 'Settings Saved Successfully!' : 'Save All Settings'}
        </button>

      </form>

    </div>
  );
}
