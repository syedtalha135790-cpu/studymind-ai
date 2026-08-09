import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, Lock, Mail, User, ShieldCheck, Zap } from 'lucide-react';
import Footer from '../components/Footer';

export default function Auth({ isRegisterInitial = false, setActiveTab }) {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(isRegisterInitial);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email || 'demo.student@stanford.edu', password || 'password123');
    setActiveTab('dashboard');
  };

  const handleFillDemo = () => {
    setEmail('alex.johnson@stanford.edu');
    setPassword('demopass123');
    setName('Alex Johnson');
    setUniversity('Stanford University');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between pt-8">
      
      <div className="max-w-md mx-auto px-4 w-full my-auto py-8">
        
        {/* Glass Card Box */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative overflow-hidden">
          
          {/* Top Glow Accent */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-r from-brand-600 to-purple-600 rounded-full blur-2xl opacity-40 pointer-events-none" />

          {/* Logo Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-purple-600 to-cyan-500 p-0.5 shadow-lg mx-auto mb-3">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">
              {isRegister ? 'Create StudyMind Account' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isRegister ? 'Join 250,000+ students mastering subjects with AI' : 'Sign in to access your PDFs, notes & flashcards'}
            </p>
          </div>

          {/* Login / Register Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-6">
            <button
              onClick={() => setIsRegister(false)}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${!isRegister ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsRegister(true)}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${isRegister ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegister && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Alex Johnson"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="glass-input w-full pl-10 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">University / Organization</label>
                  <input
                    type="text"
                    placeholder="Stanford University"
                    value={university}
                    onChange={e => setUniversity(e.target.value)}
                    className="glass-input w-full text-xs"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="alex@university.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="glass-input w-full pl-10 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="glass-input w-full pl-10 text-xs"
                />
              </div>
            </div>

            {/* Quick Demo Credentials Fill Button */}
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-300 border border-brand-500/30 text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Auto-Fill Demo Credentials
            </button>

            <button type="submit" className="btn-primary w-full py-3 text-sm font-bold mt-2">
              {isRegister ? 'Create Free Account' : 'Sign In to Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Bottom Security Note */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Secured with 256-bit Sanctum Token Encryption
            </span>
          </div>

        </div>
      </div>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
