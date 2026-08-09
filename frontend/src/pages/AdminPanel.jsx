import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Cpu, 
  CreditCard, 
  MessageSquare, 
  BarChart3, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  TrendingUp,
  Trash2
} from 'lucide-react';

export default function AdminPanel() {
  const [activeAdminTab, setActiveAdminTab] = useState('users'); // 'users' | 'pdfs' | 'analytics' | 'subscriptions' | 'feedback'
  const [searchTerm, setSearchTerm] = useState('');

  // Sample User Database
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Alex Johnson', email: 'alex.johnson@stanford.edu', plan: 'Pro Student', status: 'Active', tokens: '42,800', joinDate: 'Jan 2026', university: 'Stanford' },
    { id: 2, name: 'Elena Rostova', email: 'elena@mit.edu', plan: 'Pro Student', status: 'Active', tokens: '89,100', joinDate: 'Feb 2026', university: 'MIT' },
    { id: 3, name: 'Marcus Chen', email: 'marcus@berkeley.edu', plan: 'Free Student', status: 'Active', tokens: '4,200', joinDate: 'Jul 2026', university: 'UC Berkeley' },
    { id: 4, name: 'Prof. David Miller', email: 'david.m@harvard.edu', plan: 'Campus Tier', status: 'Active', tokens: '210,400', joinDate: 'Mar 2026', university: 'Harvard' },
    { id: 5, name: 'Sarah Jenkins', email: 'sarah.j@oxford.ac.uk', plan: 'Pro Student', status: 'Suspended', tokens: '98,000', joinDate: 'Apr 2026', university: 'Oxford' }
  ]);

  // Sample PDF Library
  const [pdfList, setPdfList] = useState([
    { id: 'pdf-101', name: 'Deep Neural Networks - Chapter 4.pdf', user: 'Alex Johnson', size: '4.8 MB', pages: 42, tokensUsed: '12,400', date: '2 hrs ago' },
    { id: 'pdf-102', name: 'Organic Chemistry Reactions.pdf', user: 'Elena Rostova', size: '8.2 MB', pages: 78, tokensUsed: '24,100', date: 'Yesterday' },
    { id: 'pdf-103', name: 'Macroeconomics 101.pdf', user: 'Marcus Chen', size: '2.4 MB', pages: 26, tokensUsed: '3,800', date: '3 days ago' }
  ]);

  // Sample Feedback Tickets
  const [tickets, setTickets] = useState([
    { id: 't-1', user: 'Alex Johnson', subject: 'Feature Request: LaTeX Equation Export', category: 'Feature', status: 'Open', date: 'Aug 7, 2026' },
    { id: 't-2', user: 'Marcus Chen', subject: 'PDF Parser Timeout on 200MB file', category: 'Bug', status: 'Resolved', date: 'Aug 5, 2026' }
  ]);

  const filteredUsers = usersList.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDeleteUser = (id) => {
    setUsersList(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              ADMINISTRATOR CONSOLE
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mt-1">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
            SaaS Platform Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            System overview, user management, PDF storage metrics, AI token consumption, and subscriptions.
          </p>
        </div>
      </div>

      {/* 4 Admin Stat Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total SaaS Users</span>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">12,480</div>
          <div className="text-[11px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% this month
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">PDF Storage Used</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1.84 TB</div>
          <div className="text-[11px] text-purple-400 font-semibold mt-1">
            254,000+ total files
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">AI Tokens Consumed</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">14.8M</div>
          <div className="text-[11px] text-cyan-400 font-semibold mt-1">
            GPT-4o & Gemini 1.5 Pro
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Monthly ARR</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">$84,200</div>
          <div className="text-[11px] text-emerald-500 font-semibold mt-1">
            Pro & Campus Tier ARR
          </div>
        </div>

      </div>

      {/* Admin Tab Navigation */}
      <div className="glass-panel p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'pdfs', label: 'PDF Documents', icon: FileText },
          { id: 'analytics', label: 'AI Usage Metrics', icon: Cpu },
          { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
          { id: 'feedback', label: 'Feedback & Tickets', icon: MessageSquare },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`
                px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2
                ${isActive 
                  ? 'bg-amber-500 text-white shadow-lg' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: User Management Table */}
      {activeAdminTab === 'users' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Platform Registered Users ({usersList.length})</h3>
            
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search user name or email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="glass-input w-full pl-9 py-1.5 text-xs"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-900/80 text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">User Name</th>
                  <th className="p-3.5">Email Address</th>
                  <th className="p-3.5">University</th>
                  <th className="p-3.5">Subscription</th>
                  <th className="p-3.5">Tokens Used</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{u.name}</td>
                    <td className="p-3.5 text-slate-400 font-mono">{u.email}</td>
                    <td className="p-3.5">{u.university}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${u.plan === 'Pro Student' ? 'bg-brand-500/20 text-brand-400' : u.plan === 'Campus Tier' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-400'}`}>
                        {u.plan}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-cyan-400">{u.tokens}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${u.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button 
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Tab 2: PDF Storage & Parsing */}
      {activeAdminTab === 'pdfs' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 animate-fade-in">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">System PDF Documents Log</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-900/80 text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Document Name</th>
                  <th className="p-3.5">Uploaded By</th>
                  <th className="p-3.5">File Size</th>
                  <th className="p-3.5">Page Count</th>
                  <th className="p-3.5">AI Tokens Spent</th>
                  <th className="p-3.5 rounded-r-xl">Upload Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {pdfList.map(pdf => (
                  <tr key={pdf.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{pdf.name}</td>
                    <td className="p-3.5">{pdf.user}</td>
                    <td className="p-3.5 font-mono">{pdf.size}</td>
                    <td className="p-3.5 font-mono">{pdf.pages} pages</td>
                    <td className="p-3.5 font-mono text-cyan-400">{pdf.tokensUsed}</td>
                    <td className="p-3.5 text-slate-400">{pdf.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: AI Usage Metrics */}
      {activeAdminTab === 'analytics' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6 animate-fade-in">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI Token Consumption & Latency Breakdown</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-brand-400 font-bold">OpenAI GPT-4o Model Endpoint</span>
              <div className="text-2xl font-extrabold text-white">9.8 Million Tokens</div>
              <p className="text-xs text-slate-400">Average response latency: 280ms • 99.98% Uptime</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold">Google Gemini 1.5 Pro Endpoint</span>
              <div className="text-2xl font-extrabold text-white">5.0 Million Tokens</div>
              <p className="text-xs text-slate-400">Average response latency: 190ms • 100% Uptime</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Feedback Tickets */}
      {activeAdminTab === 'feedback' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 animate-fade-in">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">User Feedback & Support Tickets</h3>

          <div className="space-y-3">
            {tickets.map(tk => (
              <div key={tk.id} className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 mr-2">
                    {tk.category}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{tk.subject}</span>
                  <p className="text-xs text-slate-400 mt-1">Submitted by {tk.user} on {tk.date}</p>
                </div>

                <span className={`px-2.5 py-1 rounded-full font-mono text-xs font-bold ${tk.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {tk.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
