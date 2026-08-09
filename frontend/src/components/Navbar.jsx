import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useStudy } from '../context/StudyContext';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  ShieldCheck, 
  BookOpen, 
  Zap, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, toggleMobileSidebar }) {
  const { darkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { setIsSearchOpen } = useStudy();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Brand Logo & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMobileSidebar}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all duration-300">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse-slow" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 font-sans">
                  StudyMind <span className="gradient-text">AI</span>
                </span>
                <span className="text-[10px] tracking-wider text-slate-500 dark:text-slate-400 font-mono -mt-1 uppercase">
                  SaaS Learning Suite
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links for Landing Page */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50">
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'contact', label: 'Contact' }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === link.id
                    ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Search Trigger (Ctrl + K) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 px-3 py-2 rounded-xl transition-all"
            >
              <Search className="w-4 h-4 text-brand-500" />
              <span>Search notes, PDFs, quizzes...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 bg-slate-200 dark:bg-slate-900 rounded text-[10px] font-mono border border-slate-300 dark:border-slate-700">
                Ctrl K
              </kbd>
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800/60 transition-all"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-5 h-5 text-brand-600" />
              )}
            </button>

            {/* Notifications Icon (when authenticated) */}
            {isAuthenticated && (
              <button className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800/60 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500" />
              </button>
            )}

            {/* Auth Buttons or User Avatar */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-500/30" 
                  />
                  <span className="hidden md:inline-block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl shadow-2xl py-2 z-50 animate-fade-in border border-slate-200 dark:border-slate-700">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                        <Zap className="w-3 h-3" />
                        {user.plan}
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => { setActiveTab('dashboard'); setUserMenuOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5"
                      >
                        <BookOpen className="w-4 h-4 text-brand-500" />
                        Student Dashboard
                      </button>
                      <button
                        onClick={() => { setActiveTab('profile'); setUserMenuOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5"
                      >
                        <User className="w-4 h-4 text-purple-500" />
                        My Profile & Stats
                      </button>
                      <button
                        onClick={() => { setActiveTab('settings'); setUserMenuOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5"
                      >
                        <ShieldCheck className="w-4 h-4 text-cyan-500" />
                        Account Settings
                      </button>
                      
                      {user.isAdmin && (
                        <button
                          onClick={() => { setActiveTab('admin'); setUserMenuOpen(false); }}
                          className="w-full px-4 py-2 text-left text-sm text-amber-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 font-medium"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-500" />
                          Admin Console
                        </button>
                      )}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); setActiveTab('home'); }}
                        className="w-full px-4 py-2 text-left text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2.5"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                >
                  Log In
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className="btn-primary text-xs sm:text-sm px-4 py-2"
                >
                  Get Started Free
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
