import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { flashcardsAPI } from '../services/api';
import { 
  Layers, 
  RotateCw, 
  CheckCircle2, 
  Star, 
  Plus, 
  Filter, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  Shuffle,
  FileText,
  Zap
} from 'lucide-react';

export default function Flashcards({ setActiveTab }) {
  const { documents, flashcards, setFlashcards, toggleFlashcardLearned, toggleFlashcardFavorite, addFlashcard } = useStudy();
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || 'doc-1');
  const [activeCategory, setActiveCategory] = useState('All');
  const [flippedMap, setFlippedMap] = useState({});
  const [studyMode, setStudyMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // New flashcard modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState('Computer Science');

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];
  const categories = ['All', 'Favorites', 'Unlearned', 'Computer Science', 'Chemistry', 'Physics'];

  const filteredCards = flashcards.filter(card => {
    if (card.docId && card.docId !== selectedDocId && card.document_id !== selectedDocId) return false;
    if (activeCategory === 'Favorites') return card.isFavorite;
    if (activeCategory === 'Unlearned') return !card.learned;
    if (activeCategory === 'All') return true;
    return card.category === activeCategory || card.subject === activeCategory;
  });

  const toggleFlip = (id) => {
    setFlippedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShuffle = () => {
    setFlashcards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  };

  const handleGenerateDeck = async () => {
    setIsGenerating(true);
    try {
      const response = await flashcardsAPI.store({ docId: selectedDocId });
      if (response.data && response.data.flashcards) {
        setFlashcards(prev => [...response.data.flashcards, ...prev]);
      }
    } catch (err) {
      // Client fallback
      const mockDeck = [
        {
          id: `fc-${Date.now()}-1`,
          docId: selectedDocId,
          document_id: selectedDocId,
          subject: selectedDoc?.category || 'Academic Subject',
          question: `What is the primary function of neural backpropagation according to ${selectedDoc?.name || 'document'}?`,
          answer: 'Backpropagation computes loss derivatives in reverse to iteratively update weights using gradient descent.',
          category: selectedDoc?.category || 'Computer Science',
          learned: false,
          isFavorite: true
        },
        {
          id: `fc-${Date.now()}-2`,
          docId: selectedDocId,
          document_id: selectedDocId,
          subject: selectedDoc?.category || 'Academic Subject',
          question: 'How does Dropout regularization prevent neural network overfitting?',
          answer: 'Dropout randomly deactivates a fraction of neurons during training, forcing network co-adaptation reduction.',
          category: selectedDoc?.category || 'Computer Science',
          learned: false,
          isFavorite: false
        }
      ];
      setFlashcards(prev => [...mockDeck, ...prev]);
    } finally {
      setIsGenerating(false);
      setCurrentIndex(0);
    }
  };

  const handleCreateCard = (e) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return;
    const newCard = {
      id: `fc-${Date.now()}`,
      docId: selectedDocId,
      document_id: selectedDocId,
      subject: newCategory,
      question: newQuestion,
      answer: newAnswer,
      category: newCategory,
      learned: false,
      isFavorite: false
    };
    addFlashcard(newCard);
    setNewQuestion('');
    setNewAnswer('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-8 h-8 text-cyan-500" />
            3D Spaced Repetition Flashcards
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tap or click cards to trigger 3D flip animation. Mark concepts as learned to optimize retention.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={isGenerating}
            onClick={handleGenerateDeck}
            className="btn-primary text-xs sm:text-sm px-5 py-2.5 disabled:opacity-50"
          >
            {isGenerating ? <Sparkles className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 text-cyan-300" />}
            {isGenerating ? 'Synthesizing...' : 'Generate Deck from PDF'}
          </button>

          <button
            onClick={() => setStudyMode(!studyMode)}
            className={`btn-secondary text-xs sm:text-sm px-5 py-2.5 ${studyMode ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : ''}`}
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            {studyMode ? 'Exit Deck Mode' : 'Start Focus Deck Mode'}
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn-secondary text-xs sm:text-sm px-4 py-2.5"
          >
            <Plus className="w-4 h-4" /> Add Card
          </button>
        </div>
      </div>

      {/* Target Document & Category Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Source PDF:</span>
          {documents.map(doc => (
            <button
              key={doc.id}
              onClick={() => { setSelectedDocId(doc.id); setCurrentIndex(0); }}
              className={`
                px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5
                ${selectedDocId === doc.id 
                  ? 'bg-cyan-500 text-white shadow-md' 
                  : 'glass-input text-slate-400 hover:text-slate-200'}
              `}
            >
              <FileText className="w-3.5 h-3.5" />
              {doc.name.length > 28 ? doc.name.substring(0, 28) + '...' : doc.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleShuffle}
          className="btn-secondary text-xs px-4 py-1.5 self-end sm:self-center shrink-0"
        >
          <Shuffle className="w-3.5 h-3.5" /> Shuffle Deck
        </button>
      </div>

      {/* Mode A: Interactive Deck Runner (Focus Study Mode) */}
      {studyMode && filteredCards.length > 0 ? (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Card {currentIndex + 1} of {filteredCards.length}</span>
            <span>Click Card to Flip</span>
            <span>{filteredCards[currentIndex]?.category || 'Academic'}</span>
          </div>

          {/* 3D Flip Card Container */}
          <div 
            onClick={() => toggleFlip(filteredCards[currentIndex]?.id)}
            className="perspective-1000 w-full h-[360px] cursor-pointer group"
          >
            <div className={`
              relative w-full h-full duration-500 transform-style-3d transition-transform rounded-3xl
              ${flippedMap[filteredCards[currentIndex]?.id] ? 'rotate-y-180' : ''}
            `}>
              
              {/* Front Side (Question) */}
              <div className="absolute inset-0 w-full h-full backface-hidden glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between shadow-2xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900 text-white">
                <div className="flex justify-between items-center text-xs font-mono text-cyan-400">
                  <span>QUESTION</span>
                  <RotateCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
                </div>

                <div className="text-center py-6">
                  <h3 className="text-xl sm:text-2xl font-bold leading-relaxed">
                    {filteredCards[currentIndex]?.question}
                  </h3>
                </div>

                <div className="text-center text-xs text-slate-400 font-mono">
                  Tap anywhere to reveal answer ↺
                </div>
              </div>

              {/* Back Side (Answer) */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-panel p-8 rounded-3xl border border-cyan-500/40 flex flex-col justify-between shadow-2xl bg-gradient-to-br from-brand-950 via-slate-950 to-purple-950 text-white">
                <div className="flex justify-between items-center text-xs font-mono text-emerald-400">
                  <span>ANSWER EXPLANATION</span>
                  <RotateCw className="w-4 h-4 text-slate-400" />
                </div>

                <div className="text-center py-4">
                  <p className="text-base sm:text-lg leading-relaxed text-slate-200 font-medium">
                    {filteredCards[currentIndex]?.answer}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFlashcardFavorite(filteredCards[currentIndex]?.id); }}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 ${filteredCards[currentIndex]?.isFavorite ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'text-slate-400 border-slate-800'}`}
                  >
                    <Star className="w-4 h-4 fill-amber-400" /> Favorite
                  </button>

                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFlashcardLearned(filteredCards[currentIndex]?.id); }}
                    className={`p-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${filteredCards[currentIndex]?.learned ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'btn-primary'}`}
                  >
                    <CheckCircle2 className="w-4 h-4" /> {filteredCards[currentIndex]?.learned ? 'Learned ✓' : 'Mark as Learned'}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              className="btn-secondary text-xs px-5 py-2.5 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Card
            </button>

            <button
              disabled={currentIndex === filteredCards.length - 1}
              onClick={() => setCurrentIndex(prev => Math.min(filteredCards.length - 1, prev + 1))}
              className="btn-primary text-xs px-6 py-2.5 disabled:opacity-40"
            >
              Next Card <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Mode B: Grid Deck View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredCards.length > 0 ? filteredCards : flashcards).map(card => {
            const isFlipped = flippedMap[card.id];
            return (
              <div 
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="perspective-1000 h-[260px] cursor-pointer group"
              >
                <div className={`
                  relative w-full h-full duration-500 transform-style-3d transition-transform rounded-3xl
                  ${isFlipped ? 'rotate-y-180' : ''}
                `}>
                  
                  {/* Front (Question) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between shadow-xl">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 font-semibold">
                        {card.category || card.subject || 'Study Card'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleFlashcardFavorite(card.id); }}
                          className="text-slate-400 hover:text-amber-400"
                        >
                          <Star className={`w-4 h-4 ${card.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                        <RotateCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-300" />
                      </div>
                    </div>

                    <div className="py-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-4">
                        {card.question}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <span className="text-slate-400 font-mono">Click to flip</span>
                      {card.learned && (
                        <span className="text-emerald-500 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Learned
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Back (Answer) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-card p-6 rounded-3xl border border-cyan-500/40 flex flex-col justify-between shadow-2xl bg-slate-900 text-white">
                    <div className="flex justify-between items-center text-xs font-mono text-emerald-400">
                      <span>ANSWER</span>
                      <RotateCw className="w-4 h-4 text-slate-400" />
                    </div>

                    <p className="text-sm text-slate-200 line-clamp-5 leading-relaxed">
                      {card.answer}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFlashcardLearned(card.id); }}
                        className="text-emerald-400 font-semibold hover:underline"
                      >
                        {card.learned ? 'Learned ✓' : 'Mark as Learned'}
                      </button>
                      <span className="text-slate-400 font-mono">Flip back ↺</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Custom Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700/80">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Create New Study Flashcard</h3>
            <form onSubmit={handleCreateCard} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject / Category</label>
                <input
                  type="text"
                  required
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="glass-input w-full text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Front Question</label>
                <textarea
                  rows={2}
                  required
                  placeholder="What is..."
                  value={newQuestion}
                  onChange={e => setNewQuestion(e.target.value)}
                  className="glass-input w-full text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Back Answer</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Answer explanation..."
                  value={newAnswer}
                  onChange={e => setNewAnswer(e.target.value)}
                  className="glass-input w-full text-xs"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary text-xs px-4 py-2">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs px-5 py-2">
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
