import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudyProvider } from './context/StudyContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SmartSearchModal from './components/SmartSearchModal';

// Pages
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Auth from './pages/Auth';

import Dashboard from './pages/Dashboard';
import UploadPDF from './pages/UploadPDF';
import AINotes from './pages/AINotes';
import Flashcards from './pages/Flashcards';
import QuizGenerator from './pages/QuizGenerator';
import ChatWithPDF from './pages/ChatWithPDF';
import Roadmap from './pages/Roadmap';
import HomeworkAssistant from './pages/HomeworkAssistant';
import ProgressTracker from './pages/ProgressTracker';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState('home'); // default view
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const isDashboardView = [
    'dashboard', 
    'upload-pdf', 
    'ai-notes', 
    'flashcards', 
    'quiz-generator', 
    'chat-pdf', 
    'roadmap', 
    'homework-assistant', 
    'progress-tracker', 
    'profile', 
    'settings', 
    'admin'
  ].includes(activeTab);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'features':
        return <Features setActiveTab={setActiveTab} />;
      case 'pricing':
        return <Pricing setActiveTab={setActiveTab} />;
      case 'contact':
        return <Contact setActiveTab={setActiveTab} />;
      case 'login':
        return <Auth isRegisterInitial={false} setActiveTab={setActiveTab} />;
      case 'register':
        return <Auth isRegisterInitial={true} setActiveTab={setActiveTab} />;

      // Dashboard Tools
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'upload-pdf':
        return <UploadPDF setActiveTab={setActiveTab} />;
      case 'ai-notes':
        return <AINotes setActiveTab={setActiveTab} />;
      case 'flashcards':
        return <Flashcards setActiveTab={setActiveTab} />;
      case 'quiz-generator':
        return <QuizGenerator setActiveTab={setActiveTab} />;
      case 'chat-pdf':
        return <ChatWithPDF setActiveTab={setActiveTab} />;
      case 'roadmap':
        return <Roadmap setActiveTab={setActiveTab} />;
      case 'homework-assistant':
        return <HomeworkAssistant setActiveTab={setActiveTab} />;
      case 'progress-tracker':
        return <ProgressTracker setActiveTab={setActiveTab} />;
      case 'profile':
        return <Profile setActiveTab={setActiveTab} />;
      case 'settings':
        return <Settings setActiveTab={setActiveTab} />;
      case 'admin':
        return <AdminPanel setActiveTab={setActiveTab} />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-500 selection:text-white transition-colors duration-300">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} 
      />

      {/* Global Smart Search Modal (Ctrl+K) */}
      <SmartSearchModal setActiveTab={setActiveTab} />

      {/* Main Content Layout */}
      {isDashboardView ? (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-8">
          
          {/* Dashboard Collapsible Sidebar */}
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            mobileOpen={mobileSidebarOpen}
            closeMobileSidebar={() => setMobileSidebarOpen(false)}
          />

          {/* Main Dashboard Module Content */}
          <main className="flex-1 min-w-0">
            {renderActivePage()}
          </main>

        </div>
      ) : (
        /* Full-Width Marketing & Auth Views */
        <main className="flex-1">
          {renderActivePage()}
        </main>
      )}

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StudyProvider>
          <MainAppContent />
        </StudyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
