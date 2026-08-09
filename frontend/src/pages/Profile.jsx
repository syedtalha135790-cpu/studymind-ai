import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, School, BookOpen, ShieldCheck, Zap, Edit3, Check } from 'lucide-react';

export default function Profile({ setActiveTab }) {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [university, setUniversity] = useState(user.university);
  const [major, setMajor] = useState(user.major);

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({ name, university, major });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-8 h-8 text-brand-500" />
            User Profile & Academic Credentials
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your personal profile, active subscription tier, and university affiliation.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-secondary text-xs sm:text-sm px-5 py-2.5"
        >
          {isEditing ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit3 className="w-4 h-4 text-brand-500" />}
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Profile Avatar Card */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 text-center space-y-4">
          <div className="relative inline-block mx-auto">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-28 h-28 rounded-3xl object-cover ring-4 ring-brand-500/40 shadow-2xl mx-auto"
            />
            <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 ring-4 ring-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
              ✓
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{user.name}</h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user.email}</p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-400 border border-brand-500/30">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            {user.plan} Active Member
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-left text-xs text-slate-400 space-y-2 font-mono">
            <div className="flex justify-between">
              <span>Member Since:</span>
              <span className="text-slate-200">{user.joinDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Role:</span>
              <span className="text-slate-200">{user.role}</span>
            </div>
            <div className="flex justify-between">
              <span>Tokens Used:</span>
              <span className="text-brand-400">{user.tokensUsed.toLocaleString()} / {user.maxTokens.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Col: Details / Edit Form */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Academic Information</h3>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="glass-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">University / Campus</label>
                <input
                  type="text"
                  value={university}
                  onChange={e => setUniversity(e.target.value)}
                  className="glass-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Major / Specialization</label>
                <input
                  type="text"
                  value={major}
                  onChange={e => setMajor(e.target.value)}
                  className="glass-input w-full text-xs"
                />
              </div>

              <button type="submit" className="btn-primary text-xs px-6 py-3 font-bold">
                Save Profile Changes
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">University / Campus</span>
                  <p className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <School className="w-4 h-4 text-brand-500" /> {user.university}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Major & Degree</span>
                  <p className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-500" /> {user.major}
                  </p>
                </div>

              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Subscription Plan Details
                </h4>
                <p className="text-xs text-slate-400">
                  Your Pro Student plan includes unlimited PDF uploads, GPT-4o and Gemini 1.5 access, and 3D flashcard generation.
                </p>
                <button onClick={() => setActiveTab('pricing')} className="btn-secondary text-xs px-4 py-2">
                  Manage Subscription & Billing →
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
