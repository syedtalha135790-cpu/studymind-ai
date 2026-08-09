import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  BrainCircuit, 
  FileText, 
  Download, 
  Sparkles, 
  Check, 
  BookOpen, 
  ListChecks, 
  KeyRound, 
  Calculator, 
  Smile, 
  Share2, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function AINotes({ setActiveTab }) {
  const { documents, notes } = useStudy();
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || 'doc-1');
  const [activeTab, setActiveNoteTab] = useState('summary'); // 'summary' | 'bullets' | 'concepts' | 'formulas' | 'plain'
  const [exported, setExported] = useState(false);

  // Active note object or default
  const activeNote = notes.find(n => n.docId === selectedDocId) || notes[0];

  const handleExportPDF = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BrainCircuit className="w-8 h-8 text-purple-500" />
            AI Notes & Chapter Summaries
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Transform heavy textbook PDFs into bulleted notes, key term dictionaries, LaTeX formulas, and easy language breakdowns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Export PDF */}
          <button
            onClick={handleExportPDF}
            className="btn-primary text-xs sm:text-sm px-5 py-2.5"
          >
            {exported ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
            {exported ? 'Notes PDF Downloaded!' : 'Export Notes as PDF'}
          </button>
        </div>
      </div>

      {/* Document Selector Header */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3 overflow-x-auto">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
          Source PDF:
        </span>
        {documents.map(doc => (
          <button
            key={doc.id}
            onClick={() => setSelectedDocId(doc.id)}
            className={`
              px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2
              ${selectedDocId === doc.id 
                ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-md' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}
            `}
          >
            <FileText className="w-3.5 h-3.5" />
            {doc.name.length > 35 ? doc.name.substring(0, 35) + '...' : doc.name}
          </button>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Navigation Sidebar for Notes View */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-2 mb-1">
            Note Sections
          </div>

          {[
            { id: 'summary', label: 'Executive Chapter Summary', icon: BookOpen, color: 'text-brand-500' },
            { id: 'bullets', label: 'Bulleted Key Points', icon: ListChecks, color: 'text-purple-500' },
            { id: 'concepts', label: 'Key Terms & Definitions', icon: KeyRound, color: 'text-cyan-500' },
            { id: 'formulas', label: 'Formulas & Equations', icon: Calculator, color: 'text-amber-500' },
            { id: 'plain', label: 'Easy Language Explanation', icon: Smile, color: 'text-emerald-500' },
          ].map(tab => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveNoteTab(tab.id)}
                className={`
                  w-full flex items-center justify-between p-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all
                  ${isTabActive 
                    ? 'glass-panel bg-brand-500/10 border-brand-500 text-slate-900 dark:text-white shadow-lg' 
                    : 'glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${tab.color}`} />
                  <span>{tab.label}</span>
                </div>
                {isTabActive && <div className="w-2 h-2 rounded-full bg-brand-500" />}
              </button>
            );
          })}

          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/30 to-brand-900/30 border border-purple-500/30 text-white mt-6">
            <h4 className="text-xs font-bold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Turn Notes into Decks
            </h4>
            <p className="text-[11px] text-slate-300 mb-3">Convert these definitions into 3D flashcards in 1 click.</p>
            <button
              onClick={() => setActiveTab('flashcards')}
              className="btn-primary text-xs w-full py-2"
            >
              Generate Flashcard Deck <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Active Note Card Panel */}
        <div className="lg:col-span-3 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 min-h-[500px]">
          
          {/* Note Title Header */}
          <div className="pb-6 border-b border-slate-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-500 mb-2 inline-block">
                {activeNote.subject}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {activeNote.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Source Document: {activeNote.docName} • Generated {activeNote.date}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleExportPDF} 
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-brand-500" /> PDF
              </button>
            </div>
          </div>

          {/* Render Tab Content */}

          {/* 1. Executive Summary */}
          {activeTab === 'summary' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-500" />
                Executive Overview
              </h3>
              <div className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {activeNote.summary}
              </div>
            </div>
          )}

          {/* 2. Bullet Points */}
          {activeTab === 'bullets' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-purple-500" />
                Core Bulleted Takeaways
              </h3>
              <ul className="space-y-3">
                {activeNote.bulletPoints.map((bp, i) => (
                  <li key={i} className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-sm text-slate-800 dark:text-slate-200">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{bp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. Key Concepts */}
          {activeTab === 'concepts' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-cyan-500" />
                Key Terminology Dictionary
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {activeNote.keyConcepts.map((kc, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-cyan-400 text-base mb-1">{kc.term}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{kc.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Formulas */}
          {activeTab === 'formulas' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-500" />
                Essential Formulas & LaTeX Equations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeNote.formulas.map((fm, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 text-white">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">{fm.label}</span>
                    <div className="text-xl font-mono font-bold text-cyan-300 my-2 tracking-wide p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                      {fm.formula}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Plain Language */}
          {activeTab === 'plain' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Smile className="w-5 h-5 text-emerald-500" />
                Simple Analogy ("Explain Like I'm 5")
              </h3>
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-950 border border-emerald-500/30 text-slate-200 leading-relaxed text-base shadow-xl">
                <p className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2">💡 Intuitive Analogy:</p>
                {activeNote.plainLanguage}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
