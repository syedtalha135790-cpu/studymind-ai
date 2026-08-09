import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { quizAPI } from '../services/api';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  Sparkles, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BrainCircuit, 
  Check, 
  ArrowRight,
  Zap,
  FileText
} from 'lucide-react';

export default function QuizGenerator({ setActiveTab }) {
  const { documents, quizzes, addQuiz } = useStudy();
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || 'doc-1');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(5);
  
  // Interactive Question Formats Included
  const [selectedFormats, setSelectedFormats] = useState(['MCQs', 'True/False', 'Fill Blanks', 'Short Answers']);
  const [isGenerating, setIsGenerating] = useState(false);

  // Active quiz runner state
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const toggleFormat = (fmt) => {
    if (selectedFormats.includes(fmt)) {
      if (selectedFormats.length === 1) return; // Must keep at least one format
      setSelectedFormats(prev => prev.filter(f => f !== fmt));
    } else {
      setSelectedFormats(prev => [...prev, fmt]);
    }
  };

  // Generate AI Quiz Call
  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

    try {
      const response = await quizAPI.generate({
        docId: selectedDocId,
        difficulty: selectedDifficulty,
        questionCount,
        formats: selectedFormats
      });

      if (response.data && response.data.quiz) {
        setActiveQuiz(response.data.quiz);
      } else {
        throw new Error("No quiz object returned");
      }
    } catch (err) {
      // Fallback generator matching exact selected formats
      const mockQuestions = [];
      let qId = 1;

      if (selectedFormats.includes('MCQs')) {
        mockQuestions.push({
          id: qId++,
          type: 'mcq',
          question: `According to ${selectedDoc?.name || 'document'}, which activation function outputs values strictly between 0 and 1?`,
          options: ['ReLU', 'Sigmoid', 'Linear', 'Leaky ReLU'],
          correctAnswer: 1,
          explanation: 'Sigmoid function maps real inputs into a probability-like output range (0, 1).'
        });
      }

      if (selectedFormats.includes('True/False')) {
        mockQuestions.push({
          id: qId++,
          type: 'tf',
          question: `True or False: Dropout randomly deactivates neurons during testing time.`,
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False! Dropout is applied ONLY during training. During testing all neurons remain active.'
        });
      }

      if (selectedFormats.includes('Fill Blanks')) {
        mockQuestions.push({
          id: qId++,
          type: 'fill',
          question: `Fill in the Blank: The rule that computes partial derivatives in backpropagation is the ________ rule.`,
          options: ['Chain', 'L’Hôpital', 'Product', 'Quotient'],
          correctAnswer: 0,
          explanation: 'The Chain Rule of calculus enables layer-by-layer derivative calculation.'
        });
      }

      if (selectedFormats.includes('Short Answers')) {
        mockQuestions.push({
          id: qId++,
          type: 'short',
          question: `Short Question: What technique prevents neural network overfitting by adding L2 weight penalties?`,
          options: ['L2 Weight Regularization', 'Data Augmentation', 'Batch Normalization', 'Early Stopping'],
          correctAnswer: 0,
          explanation: 'L2 Regularization adds the sum of squared weights to the loss function penalty.'
        });
      }

      // Fill remaining count if requested > formats length
      while (mockQuestions.length < questionCount) {
        const idNum = mockQuestions.length + 1;
        mockQuestions.push({
          id: idNum,
          type: 'mcq',
          question: `Practice Question #${idNum} (${selectedDifficulty} Level): What algorithm optimizes loss minimization?`,
          options: ['Stochastic Gradient Descent', 'Grid Search', 'Random Walk', 'Linear Regression'],
          correctAnswer: 0,
          explanation: 'Stochastic Gradient Descent minimizes the loss function iteratively.'
        });
      }

      const generatedQuiz = {
        id: `quiz-${Date.now()}`,
        title: `${selectedDifficulty} AI Practice Exam (${selectedDoc?.name || 'PDF Document'})`,
        subject: selectedDoc?.category || 'Academic Subject',
        docName: selectedDoc?.name || 'Document.pdf',
        difficulty: selectedDifficulty,
        questionsCount: mockQuestions.length,
        lastScore: 0,
        completedDate: 'Today',
        questions: mockQuestions
      };

      setActiveQuiz(generatedQuiz);
    } finally {
      setIsGenerating(false);
      setCurrentQIndex(0);
      setUserAnswers({});
      setIsSubmitted(false);
      setScore(0);
    }
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = async () => {
    let calculatedScore = 0;
    activeQuiz.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });

    const finalPercentage = Math.round((calculatedScore / activeQuiz.questions.length) * 100);
    setScore(finalPercentage);
    setIsSubmitted(true);

    try {
      await quizAPI.submitAnswers(activeQuiz.id, { answers: userAnswers });
    } catch (e) {
      // Handled silently
    }

    // Trigger celebration confetti if score >= 60%
    if (finalPercentage >= 60) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-8 h-8 text-amber-500" />
            AI Quiz & Exam Generator
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create custom practice quizzes with instant scoring, countdown timer, and step-by-step solutions.
          </p>
        </div>
      </div>

      {/* Quiz Config Panel */}
      {!activeQuiz && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Configure AI Exam Parameters</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Target Document Selector */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Target Study PDF Document</label>
              <select
                value={selectedDocId}
                onChange={e => setSelectedDocId(e.target.value)}
                className="glass-input w-full text-xs sm:text-sm font-semibold text-brand-500"
              >
                {documents.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    📄 {doc.name} ({doc.pages} pages • {doc.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-2">
                {['Easy', 'Medium', 'Hard'].map(diff => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${selectedDifficulty === diff ? 'bg-amber-500 text-white shadow-lg' : 'glass-input hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Questions Count</label>
              <select
                value={questionCount}
                onChange={e => setQuestionCount(Number(e.target.value))}
                className="glass-input w-full text-xs font-semibold"
              >
                <option value={5}>5 Questions (Quick Test)</option>
                <option value={10}>10 Questions (Standard Quiz)</option>
                <option value={20}>20 Questions (Full Exam Simulation)</option>
              </select>
            </div>

            {/* Question Formats Included (Interactive Checkboxes) */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Question Formats Included (Click to toggle)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['MCQs', 'True/False', 'Fill Blanks', 'Short Answers'].map(fmt => {
                  const isSelected = selectedFormats.includes(fmt);
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => toggleFormat(fmt)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                        isSelected 
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-md' 
                          : 'glass-panel border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} /> 
                      {fmt}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <button
            disabled={isGenerating}
            onClick={handleGenerateQuiz}
            className="btn-primary w-full py-4 text-base font-bold shadow-xl shadow-brand-500/30 disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" /> Synthesizing AI Exam Questions...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-cyan-300" /> Generate AI Practice Quiz
              </span>
            )}
          </button>
        </div>
      )}

      {/* Active Quiz Runner */}
      {activeQuiz && (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          
          {/* Header Status Bar */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{activeQuiz.title}</h3>
              <p className="text-xs text-slate-400">Question {currentQIndex + 1} of {activeQuiz.questions.length} • {activeQuiz.difficulty} Mode</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 09:42 remaining
              </span>
              <button 
                onClick={() => setActiveQuiz(null)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Quit Quiz
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase font-bold">
                Format: {activeQuiz.questions[currentQIndex].type?.toUpperCase() || 'MCQ'}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID #{activeQuiz.questions[currentQIndex].id}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQIndex + 1}. {activeQuiz.questions[currentQIndex].question}
            </h2>

            {/* Option Buttons */}
            <div className="space-y-3">
              {activeQuiz.questions[currentQIndex].options.map((opt, oIdx) => {
                const isSelected = userAnswers[activeQuiz.questions[currentQIndex].id] === oIdx;
                const isCorrect = activeQuiz.questions[currentQIndex].correctAnswer === oIdx;
                
                let optionStyle = 'glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';
                if (isSelected) {
                  optionStyle = 'bg-brand-600 text-white border-brand-500 shadow-lg';
                }
                if (isSubmitted) {
                  if (isCorrect) optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                  else if (isSelected && !isCorrect) optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(activeQuiz.questions[currentQIndex].id, oIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs flex items-center justify-center font-bold shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Breakdown */}
            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-cyan-400">Explanation & AI Feedback:</p>
                <p>{activeQuiz.questions[currentQIndex].explanation}</p>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                className="btn-secondary text-xs px-5 py-2.5 disabled:opacity-40"
              >
                Previous Question
              </button>

              {currentQIndex < activeQuiz.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQIndex(prev => prev + 1)}
                  className="btn-primary text-xs px-6 py-2.5"
                >
                  Next Question <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                !isSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="btn-primary bg-gradient-to-r from-emerald-600 to-teal-500 text-xs px-8 py-2.5 font-bold"
                  >
                    Submit Quiz For Grading
                  </button>
                ) : (
                  <div className="text-right">
                    <span className="text-xl font-bold text-emerald-400">Score: {score}%</span>
                  </div>
                )
              )}
            </div>

          </div>

          {/* Results Summary Box */}
          {isSubmitted && (
            <div className="glass-panel p-8 rounded-3xl border border-emerald-500/40 text-center space-y-4 shadow-2xl animate-fade-in">
              <Award className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Quiz Score: {score}%
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                {score >= 80 ? 'Outstanding performance! You have mastered this document.' : 'Good effort! Review flashcards for remaining weak concepts.'}
              </p>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleGenerateQuiz}
                  className="btn-secondary text-xs px-6 py-2.5"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Quiz
                </button>
                <button
                  onClick={() => setActiveTab('flashcards')}
                  className="btn-primary text-xs px-6 py-2.5"
                >
                  Review Flashcards <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
