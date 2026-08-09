import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Phone, MapPin, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

export default function Contact({ setActiveTab }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Support', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      <div className="pt-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-brand-500/30 text-xs font-semibold text-brand-500 mb-4">
            <Mail className="w-4 h-4 text-cyan-400" />
            24/7 Student & University Support
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            We’re Here to <span className="gradient-text">Help You Succeed</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Have questions about AI models, institution plans, or custom feature requests? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details Column */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Email Us</h3>
              <p className="text-xs text-slate-400 mb-2">Response within 2 hours</p>
              <a href="mailto:support@studymind.ai" className="text-sm font-semibold text-brand-500 hover:underline">
                support@studymind.ai
              </a>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Live AI Concierge</h3>
              <p className="text-xs text-slate-400 mb-2">Available 24/7 inside the app</p>
              <button onClick={() => setActiveTab('chat-pdf')} className="text-sm font-semibold text-purple-500 hover:underline">
                Open AI Chatbot →
              </button>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Headquarters</h3>
              <p className="text-xs text-slate-400">
                StudyMind AI Technologies Inc.<br />
                Stanford Research Park, Palo Alto, CA
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Delivered!</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Thank you for reaching out. An academic specialist will get back to you at <span className="text-brand-400 font-semibold">{form.email}</span> shortly.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary text-xs px-6 py-2.5 mx-auto mt-4">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Send Us a Direct Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Johnson"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="glass-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@university.edu"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="glass-input w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Inquiry Topic</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="glass-input w-full text-slate-800 dark:text-slate-200"
                  >
                    <option value="General Support">General Support</option>
                    <option value="Pro Plan Upgrade">Pro Plan & Billing</option>
                    <option value="University License">University & Campus Licenses</option>
                    <option value="Bug Report">Bug Report or Feature Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Message Content</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="How can StudyMind AI help you?"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="glass-input w-full"
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-3 text-base">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
