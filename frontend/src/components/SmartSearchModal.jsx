import React, { useState, useEffect } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  Search, 
  X, 
  FileText, 
  Layers, 
  HelpCircle, 
  MessageSquare, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function SmartSearchModal({ setActiveTab }) {
  const { isSearchOpen, setIsSearchOpen, documents, notes, flashcards, quizzes } = useStudy();
  const [query, setQuery] = useState('');

  // Listen for Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  // Filtered lists based on search query
  const filteredDocs = documents.filter(d => d.name.toLowerCase().includes(query.toLowerCase()));
  const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(query.toLowerCase()) || n.summary.toLowerCase().includes(query.toLowerCase()));
  const filteredCards = flashcards.filter(f => f.question.toLowerCase().includes(query.toLowerCase()) || f.answer.toLowerCase().includes(query.toLowerCase()));
  const filteredQuizzes = quizzes.filter(q => q.title.toLowerCase().includes(query.toLowerCase()));

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl glass-panel rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80">
        
        {/* Search Header Input */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-brand-500 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search PDFs, AI notes, 3D flashcards, quizzes..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base font-medium"
            autoFocus
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {query.trim() === '' ? (
            <div className="py-8 text-center">
              <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-2 animate-bounce" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Smart Search Ready</p>
              <p className="text-xs text-slate-400">Type key concepts, book chapters, formulas, or topic keywords.</p>
            </div>
          ) : (
            <>
              {/* Documents Results */}
              {filteredDocs.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-brand-500" /> Documents & PDFs ({filteredDocs.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredDocs.map(doc => (
                      <div
                        key={doc.id}
                        onClick={() => handleNavigate('upload-pdf')}
                        className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-brand-500/10 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between cursor-pointer group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-500 transition-colors">
                              {doc.name}
                            </p>
                            <p className="text-xs text-slate-400">{doc.pages} pages • {doc.size}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes Results */}
              {filteredNotes.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-500" /> AI Notes ({filteredNotes.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredNotes.map(note => (
                      <div
                        key={note.id}
                        onClick={() => handleNavigate('ai-notes')}
                        className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-purple-500/10 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between cursor-pointer group transition-all"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-400">
                            {note.title}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1">{note.summary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Flashcards Results */}
              {filteredCards.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-500" /> Flashcards ({filteredCards.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredCards.map(fc => (
                      <div
                        key={fc.id}
                        onClick={() => handleNavigate('flashcards')}
                        className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-cyan-500/10 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between cursor-pointer group transition-all"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-400">
                            Q: {fc.question}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1">A: {fc.answer}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quizzes Results */}
              {filteredQuizzes.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500" /> Quizzes ({filteredQuizzes.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredQuizzes.map(qz => (
                      <div
                        key={qz.id}
                        onClick={() => handleNavigate('quiz-generator')}
                        className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-amber-500/10 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between cursor-pointer group transition-all"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-400">
                            {qz.title}
                          </p>
                          <p className="text-xs text-slate-400">{qz.questionsCount} Questions • {qz.difficulty} Difficulty</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredDocs.length === 0 && filteredNotes.length === 0 && filteredCards.length === 0 && filteredQuizzes.length === 0 && (
                <div className="py-8 text-center text-slate-400 text-sm">
                  No matching study resources found for "{query}".
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[11px] text-slate-400 font-mono">
          <span>Press <kbd className="px-1 bg-slate-200 dark:bg-slate-800 rounded">Esc</kbd> to exit</span>
          <span>StudyMind AI Smart Index</span>
        </div>

      </div>
    </div>
  );
}
