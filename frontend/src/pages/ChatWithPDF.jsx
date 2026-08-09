import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  MessageSquare, 
  Send, 
  FileText, 
  Globe, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Bot, 
  User, 
  Zap,
  ChevronRight
} from 'lucide-react';

export default function ChatWithPDF({ setActiveTab }) {
  const { documents, pdfChats } = useStudy();
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || 'doc-1');
  const [inputMsg, setInputMsg] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  // Chat conversation state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello! I have fully indexed "${selectedDoc?.name}". Ask me to explain any equation, section, or topic. My answers are strictly bound to page citations from this PDF.`,
      timestamp: '10:00 AM'
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: inputMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const userPrompt = inputMsg;
    setInputMsg('');

    // Simulate AI response generation with page citation
    setTimeout(() => {
      let aiText = `Based on **${selectedDoc?.name} (Page 14, Section 3.2)**:\n\nRegarding "${userPrompt}", the document outlines that this process involves calculating loss derivatives relative to weights using forward activations.`;
      
      if (selectedLanguage !== 'English') {
        aiText += `\n\n*Translated to ${selectedLanguage}*: Esta sección explica los principios fundamentales del documento cargado.`;
      }

      const aiResponse = {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        citation: 'Page 14, Section 3.2',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-emerald-500" />
            Chat Directly with PDF
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ask questions, request section summaries, and get instant answers with strict page citation references.
          </p>
        </div>

        {/* Translation Language Selector */}
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400">Translate to:</span>
          <select
            value={selectedLanguage}
            onChange={e => setSelectedLanguage(e.target.value)}
            className="glass-input text-xs font-semibold py-1.5"
          >
            <option value="English">English (Original)</option>
            <option value="Spanish">Spanish (Español)</option>
            <option value="French">French (Français)</option>
            <option value="German">German (Deutsch)</option>
            <option value="Chinese">Mandarin (中文)</option>
          </select>
        </div>
      </div>

      {/* Main Dual-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[650px]">
        
        {/* Left Col: Document Reader Preview Pane */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between hidden lg:flex">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-500" /> Active PDF Context
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                PARSED
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                {selectedDoc.name}
              </h3>
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span>{selectedDoc.pages} Pages</span> • <span>{selectedDoc.size}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2 mt-4">
                <p className="font-bold text-cyan-400">PDF Indexing Bounds:</p>
                <p className="text-slate-400 leading-relaxed font-mono">
                  {selectedDoc.textPreview}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('upload-pdf')}
              className="btn-secondary text-xs w-full py-2.5"
            >
              Switch PDF Document
            </button>
          </div>
        </div>

        {/* Right Col: AI Chat Console */}
        <div className="lg:col-span-2 glass-panel rounded-3xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-4 px-6 bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">StudyMind AI Assistant</h4>
                <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Strict PDF Citation Grounding Active
                </p>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-brand-600 text-white' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-brand-600 text-white shadow-lg' : 'bg-white/60 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'}`}>
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {msg.citation && (
                      <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/80 inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-semibold">
                        <BookOpen className="w-3.5 h-3.5" /> Cited from: {msg.citation}
                      </div>
                    )}
                  </div>
                  <div className={`text-[10px] text-slate-400 font-mono ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-100/60 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <input
              type="text"
              value={inputMsg}
              onChange={e => setInputMsg(e.target.value)}
              placeholder="Ask anything about page 1, chapter summaries, formulas, or terms..."
              className="glass-input flex-1 text-xs sm:text-sm py-3"
            />
            <button type="submit" className="btn-primary p-3 rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
