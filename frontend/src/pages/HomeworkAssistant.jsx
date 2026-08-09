import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Code, 
  Calculator, 
  Atom, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight 
} from 'lucide-react';

export default function HomeworkAssistant({ setActiveTab }) {
  const [queryCategory, setQueryCategory] = useState('Math');
  const [questionText, setQuestionText] = useState('');
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState(null);
  const [copied, setCopied] = useState(false);

  const sampleQuestions = [
    { label: 'Math Calculus Integral', cat: 'Math', q: 'Solve the integral of ∫ (x^2 * e^x) dx using integration by parts.' },
    { label: 'Python Algorithm Logic', cat: 'Code', q: 'Explain how Binary Search works in Python and write time complexity breakdown.' },
    { label: 'Quantum Physics Concept', cat: 'Science', q: 'Explain Heisenberg Uncertainty Principle with physical formula Δx * Δp >= ħ/2.' }
  ];

  const handleSolve = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSolving(true);
    setSolution(null);

    setTimeout(() => {
      setIsSolving(false);
      if (queryCategory === 'Math') {
        setSolution({
          title: 'Calculus Step-by-Step Solution',
          steps: [
            { step: 'Step 1: Identify Integration by Parts Formula', detail: 'Formula: ∫ u dv = u v - ∫ v du' },
            { step: 'Step 2: Choose u and dv using LIATE rule', detail: 'Set u = x² → du = 2x dx. Set dv = e^x dx → v = e^x.' },
            { step: 'Step 3: Apply first reduction', detail: '∫ x² e^x dx = x² e^x - ∫ 2x e^x dx' },
            { step: 'Step 4: Repeat for inner integral ∫ 2x e^x dx', detail: 'Set u = 2x → du = 2 dx. dv = e^x dx → v = e^x. Result: 2x e^x - 2 e^x' },
            { step: 'Step 5: Combine final expression with constant C', detail: 'Final Answer: e^x (x² - 2x + 2) + C' }
          ]
        });
      } else if (queryCategory === 'Code') {
        setSolution({
          title: 'Binary Search Algorithm Breakdown',
          codeSnippet: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid  # Target found
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1  # Target not in array`,
          steps: [
            { step: 'Time Complexity', detail: 'O(log N) because the search space is halved every iteration.' },
            { step: 'Space Complexity', detail: 'O(1) auxiliary space (Iterative approach).' }
          ]
        });
      } else {
        setSolution({
          title: 'Quantum Physics Concept Explanation',
          steps: [
            { step: 'Core Principle', detail: 'It is physically impossible to simultaneously measure both the exact position (x) and exact momentum (p) of a subatomic particle.' },
            { step: 'Mathematical Inequality', detail: 'Δx · Δp ≥ ħ / 2 (where ħ is the reduced Planck constant).' },
            { step: 'Intuitive Meaning', detail: 'The more precisely you pin down a particle’s position, the less precisely you can know its speed and direction.' }
          ]
        });
      }
    }, 1000);
  };

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BrainCircuit className="w-8 h-8 text-cyan-400" />
            AI Homework & Academic Assistant
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Solve complex calculus equations, code logic, chemistry reactions, and physics problems with step-by-step reasoning.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Query Console */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6">
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Academic Domain Selector</h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'Math', label: 'Mathematics', icon: Calculator },
              { id: 'Code', label: 'Code & CS', icon: Code },
              { id: 'Science', label: 'Science', icon: Atom },
            ].map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setQueryCategory(cat.id)}
                  className={`p-3 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${queryCategory === cat.id ? 'bg-cyan-500 text-white shadow-lg' : 'glass-input hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Preset Questions */}
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">Try Sample Question:</span>
            <div className="space-y-1.5">
              {sampleQuestions.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => { setQueryCategory(sq.cat); setQuestionText(sq.q); }}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-brand-500/10 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  💡 {sq.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSolve} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Enter Homework Question or Code Prompt</label>
              <textarea
                rows={5}
                required
                placeholder="Paste math equations, code errors, or physics prompts here..."
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                className="glass-input w-full text-xs font-mono"
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3.5 text-sm font-bold shadow-lg shadow-brand-500/20">
              <BrainCircuit className="w-4 h-4" /> Solve Step-by-Step
            </button>
          </form>

        </div>

        {/* Right Col: Interactive Solution Step Breakdown */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 min-h-[450px]">
          
          {isSolving ? (
            <div className="py-20 text-center space-y-4">
              <Sparkles className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Reasoning Model Active...</h3>
              <p className="text-xs text-slate-400 font-mono">Formulating step-by-step mathematical & logical proof</p>
            </div>
          ) : solution ? (
            <div className="space-y-6 animate-fade-in">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{solution.title}</h2>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                  {queryCategory} SOLVER
                </span>
              </div>

              {/* Code Snippet if Code category */}
              {solution.codeSnippet && (
                <div className="relative rounded-2xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-[10px] text-slate-400 mb-3">
                    <span>Python 3.12 Code Solution</span>
                    <button onClick={handleCopyCode} className="flex items-center gap-1 text-cyan-400 hover:underline">
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="text-cyan-300">{solution.codeSnippet}</pre>
                </div>
              )}

              {/* Step List */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Detailed Step-by-Step Proof:</h3>
                {solution.steps.map((st, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="text-xs font-bold text-cyan-400 font-mono">{st.step}</div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">{st.detail}</p>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 space-y-3">
              <BrainCircuit className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg">Select a Domain & Enter Your Question</h3>
              <p className="text-xs max-w-sm mx-auto">Our AI academic assistant will decompose problem statements into clear steps.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
