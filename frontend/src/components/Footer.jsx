import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="glass-panel border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-900/40 mt-20 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-purple-600 to-cyan-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                StudyMind <span className="gradient-text">AI</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm">
              The next-generation AI-powered study assistant and learning operating system. Transform complex documents into summaries, 3D flashcards, quizzes, and personal roadmaps in seconds.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: AI Study Modules */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Study Suite</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setActiveTab('upload-pdf')} className="hover:text-brand-400 transition-colors">Upload PDF & Analysis</button></li>
              <li><button onClick={() => setActiveTab('ai-notes')} className="hover:text-brand-400 transition-colors">AI Notes Generator</button></li>
              <li><button onClick={() => setActiveTab('flashcards')} className="hover:text-brand-400 transition-colors">Interactive 3D Flashcards</button></li>
              <li><button onClick={() => setActiveTab('quiz-generator')} className="hover:text-brand-400 transition-colors">AI Quiz Generator</button></li>
              <li><button onClick={() => setActiveTab('chat-pdf')} className="hover:text-brand-400 transition-colors">Chat with PDF Document</button></li>
              <li><button onClick={() => setActiveTab('roadmap')} className="hover:text-brand-400 transition-colors">Exam Roadmap Planner</button></li>
            </ul>
          </div>

          {/* Col 3: Platform */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setActiveTab('features')} className="hover:text-brand-400 transition-colors">Features Overview</button></li>
              <li><button onClick={() => setActiveTab('pricing')} className="hover:text-brand-400 transition-colors">Pricing & Plans</button></li>
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-brand-400 transition-colors">Student Dashboard</button></li>
              <li><button onClick={() => setActiveTab('homework-assistant')} className="hover:text-brand-400 transition-colors">Homework Assistant</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-brand-400 transition-colors">Help & Contact</button></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Stay Ahead</h4>
            <p className="text-xs text-slate-400 mb-3">Get weekly study tips, AI prompts, and feature updates directly in your inbox.</p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter student email..." 
                className="glass-input text-xs w-full py-2"
              />
              <button className="btn-primary text-xs py-2">
                Subscribe Free
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 StudyMind AI Inc. All rights reserved. Built for modern learners.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">API Documentation</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
