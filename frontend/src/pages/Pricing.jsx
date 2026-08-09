import React, { useState } from 'react';
import { Check, Zap, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

export default function Pricing({ setActiveTab }) {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Free Student',
      tagline: 'Perfect for quick homework help and trying out AI features.',
      priceMonthly: 0,
      priceAnnual: 0,
      badge: null,
      cta: 'Start Free Trial',
      features: [
        'Up to 3 PDF uploads per month (max 15MB each)',
        'Basic AI Notes & chapter summaries',
        '20 AI Flashcards per document',
        '5 AI Quizzes per month',
        'Standard GPT-3.5 AI speed',
        'Community support forum'
      ],
      popular: false
    },
    {
      name: 'Pro Student',
      tagline: 'Our most popular plan for university students and exam takers.',
      priceMonthly: 12,
      priceAnnual: 9,
      badge: 'MOST POPULAR',
      cta: 'Upgrade to Pro',
      features: [
        'Unlimited PDF uploads (up to 100MB per file)',
        'Advanced AI Notes, definitions & formulas',
        'Unlimited 3D Flashcards with spaced repetition',
        'Unlimited AI Quizzes with timed mode & instant explanations',
        'Unlimited Chat with PDF with page citation links',
        'Personalized Exam Preparation Roadmap Builder',
        'Step-by-step Homework Assistant (Math & Code)',
        'OpenAI GPT-4o & Gemini 1.5 Pro engine access',
        'Priority 24/7 AI response speed & export to PDF'
      ],
      popular: true
    },
    {
      name: 'Campus / Institution',
      tagline: 'Tailored for university departments, tutors, and schools.',
      priceMonthly: 39,
      priceAnnual: 29,
      badge: 'FOR EDUCATORS',
      cta: 'Contact Sales',
      features: [
        'Everything in Pro Student for up to 10 team seats',
        'Shared institution PDF document library',
        'Admin dashboard with usage analytics & student progress',
        'Custom syllabus & exam template importer',
        'Dedicated account manager & SLA support',
        'LMS Integration (Canvas, Blackboard, Moodle)'
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      q: 'Can I cancel or change my plan at any time?',
      a: 'Yes! You can upgrade, downgrade, or cancel your subscription directly from your Account Settings with one click. No hidden fees.'
    },
    {
      q: 'How does the PDF page limit work?',
      a: 'Pro users can upload documents up to 500 pages per file. Our AI parses text and structure efficiently without losing accuracy.'
    },
    {
      q: 'Is my uploaded academic data private and secure?',
      a: 'Absolutely. We enforce SSL 256-bit encryption. Your documents are never shared or used to train public AI models.'
    },
    {
      q: 'Which AI models power StudyMind AI?',
      a: 'Pro users can seamlessly toggle between OpenAI GPT-4o and Google Gemini 1.5 Pro in Settings depending on preference.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      <div className="pt-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-brand-500/30 text-xs font-semibold text-brand-500 mb-4">
            <Zap className="w-4 h-4 text-cyan-400" />
            Simple & Transparent Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Invest in Your <span className="gradient-text">Academic Future</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Choose the plan that fits your study goals. Save up to 25% with annual billing.
          </p>

          {/* Billing Toggle Switch */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold ${!annual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly Billing</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-14 h-8 rounded-full bg-slate-300 dark:bg-slate-800 p-1 transition-colors duration-200"
            >
              <div className={`w-6 h-6 rounded-full bg-brand-500 shadow-md transform transition-transform duration-200 ${annual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${annual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              Annual Billing
              <span className="text-[10px] uppercase font-mono font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Save 25%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((p, idx) => {
            const price = annual ? p.priceAnnual : p.priceMonthly;
            return (
              <div 
                key={idx}
                className={`glass-panel rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
                  p.popular 
                    ? 'border-brand-500 shadow-2xl shadow-brand-500/20 ring-2 ring-brand-500/50 scale-105 bg-slate-900/80' 
                    : 'border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/40'
                }`}
              >
                {p.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-purple-600 text-white font-mono text-[11px] font-bold tracking-wider shadow-lg">
                    {p.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{p.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">{p.tagline}</p>
                  
                  <div className="mb-6 flex items-baseline">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">${price}</span>
                    <span className="text-slate-400 text-sm ml-2">/ month {annual && price > 0 ? '(billed annually)' : ''}</span>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mb-6">
                    <ul className="space-y-3">
                      {p.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab(price > 0 ? 'register' : 'dashboard')}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    p.popular 
                      ? 'btn-primary shadow-xl shadow-brand-500/30' 
                      : 'btn-secondary'
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Everything you need to know about plans and billing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((f, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  {f.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
