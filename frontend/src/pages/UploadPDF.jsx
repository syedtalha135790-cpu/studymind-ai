import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  BrainCircuit, 
  Layers, 
  HelpCircle, 
  MessageSquare, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function UploadPDF({ setActiveTab }) {
  const { documents, addDocument, setDocuments } = useStudy();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Simulate Drag & Drop upload process
  const handleSimulateUpload = (fileName = 'Physics II - Electromagnetism & Waves.pdf') => {
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add new simulated document
          const newDoc = {
            id: `doc-${Date.now()}`,
            name: fileName,
            size: '5.4 MB',
            pages: 56,
            uploadDate: 'Just now',
            category: 'Physics',
            status: 'Processed',
            textPreview: `Chapter 7: Maxwell's Equations & Electromagnetic Radiation.
            Electromagnetism is a branch of physics involving the study of the electromagnetic force, a type of physical interaction that occurs between electrically charged particles...`,
            aiNotesGenerated: true,
            flashcardsCount: 18,
            quizzesCount: 2
          };
          addDocument(newDoc);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleSimulateUpload(file.name);
    }
  };

  const handleDelete = (id) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Upload className="w-8 h-8 text-brand-500" />
            PDF Document Workspace
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Upload course materials, slide decks, research papers, or syllabus PDFs for instant AI extraction.
          </p>
        </div>

        <button 
          onClick={() => handleSimulateUpload('Quantum Mechanics - Basics.pdf')}
          className="btn-primary text-xs sm:text-sm px-5 py-2.5 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" /> Auto-Load Sample PDF
        </button>
      </div>

      {/* Drag & Drop Upload Box */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          glass-panel p-8 sm:p-12 rounded-3xl border-2 border-dashed text-center transition-all duration-300 relative overflow-hidden
          ${isDragging 
            ? 'border-brand-500 bg-brand-500/10 scale-[1.01]' 
            : 'border-slate-300 dark:border-slate-700/80 hover:border-brand-500/50'}
        `}
      >
        {isUploading ? (
          <div className="max-w-md mx-auto space-y-4 py-6">
            <Sparkles className="w-10 h-10 text-brand-500 mx-auto animate-bounce" />
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Parsing PDF Text & Chapters...</h3>
            
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                style={{ width: `${uploadProgress}%` }}
                className="h-full bg-gradient-to-r from-brand-600 via-purple-600 to-cyan-400 rounded-full transition-all duration-300" 
              />
            </div>
            
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>Extracting OCR & Math equations</span>
              <span>{uploadProgress}%</span>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 via-purple-600 to-cyan-500 p-0.5 shadow-xl mx-auto flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Upload className="w-8 h-8 text-cyan-400 animate-pulse-slow" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Drag & Drop Your Study PDFs Here
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Supports PDF, DOCX, TXT documents up to <span className="font-semibold text-brand-500">100 MB per file</span>.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <label className="btn-primary text-xs sm:text-sm px-6 py-2.5 cursor-pointer">
                Browse Local Files
                <input 
                  type="file" 
                  accept=".pdf,.docx,.txt" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleSimulateUpload(e.target.files[0].name);
                    }
                  }}
                />
              </label>
            </div>

            <div className="flex items-center justify-center gap-6 text-[11px] text-slate-400 pt-2 font-mono">
              <span>✓ OCR Engine Active</span>
              <span>✓ Multi-Page Parsing</span>
              <span>✓ AES-256 Encrypted</span>
            </div>
          </div>
        )}
      </div>

      {/* Document Library Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-500" />
              Uploaded PDF Library ({documents.length})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Click any document to generate notes, flashcards, or chat.</p>
          </div>
        </div>

        <div className="space-y-3">
          {documents.map(doc => (
            <div 
              key={doc.id}
              className="p-4 sm:p-5 rounded-2xl bg-white/40 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-brand-500/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-brand-500/10 text-brand-500 shrink-0 mt-0.5">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {doc.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                    <span>{doc.pages} pages</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span className="text-brand-500">{doc.category}</span>
                    <span>•</span>
                    <span className="text-emerald-500 font-semibold">{doc.status}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Document */}
              <div className="flex items-center flex-wrap gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-0 border-slate-200 dark:border-slate-800">
                
                {/* Preview Drawer Button */}
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                  title="Preview PDF text"
                >
                  <Eye className="w-4 h-4 text-cyan-400" />
                  Preview
                </button>

                {/* AI Notes Button */}
                <button
                  onClick={() => setActiveTab('ai-notes')}
                  className="p-2 px-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-300 border border-brand-500/30 text-xs font-semibold flex items-center gap-1.5"
                >
                  <BrainCircuit className="w-4 h-4" />
                  Notes ({doc.aiNotesGenerated ? 'Done' : 'New'})
                </button>

                {/* 3D Flashcards Button */}
                <button
                  onClick={() => setActiveTab('flashcards')}
                  className="p-2 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Layers className="w-4 h-4" />
                  Decks ({doc.flashcardsCount})
                </button>

                {/* Chat with PDF Button */}
                <button
                  onClick={() => setActiveTab('chat-pdf')}
                  className="p-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  title="Delete Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Text Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl glass-panel rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700/80 max-h-[85vh] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-brand-500" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{previewDoc.name}</h3>
                    <p className="text-xs text-slate-400">{previewDoc.pages} pages parsed • {previewDoc.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPreviewDoc(null)} 
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-3 overflow-y-auto max-h-[50vh] pr-2">
                <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20">
                  Extracted OCR Stream Sample (Pages 1 - 42)
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  {previewDoc.textPreview}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button 
                onClick={() => { setPreviewDoc(null); setActiveTab('ai-notes'); }} 
                className="btn-primary text-xs px-5 py-2"
              >
                Generate Full AI Notes <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
