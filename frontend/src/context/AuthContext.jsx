import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    role: 'Student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    plan: 'Pro Plan',
    studyStreak: 12,
    totalHours: 48.5,
    quizzesCompleted: 34,
    flashcardsLearned: 185,
    tokensUsed: 42800,
    maxTokens: 100000,
    university: 'Stanford University',
    major: 'Computer Science & AI',
    joinDate: 'Jan 2026',
    isAdmin: true // Allow switching to Admin Panel view seamlessly
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (email, password) => {
    setUser({
      id: 1,
      name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()) || 'Student User',
      email: email,
      role: 'Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      plan: 'Pro Plan',
      studyStreak: 12,
      totalHours: 48.5,
      quizzesCompleted: 34,
      flashcardsLearned: 185,
      tokensUsed: 42800,
      maxTokens: 100000,
      university: 'Stanford University',
      major: 'Computer Science',
      joinDate: 'Aug 2026',
      isAdmin: true
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateUserProfile = (newDetails) => {
    setUser(prev => ({ ...prev, ...newDetails }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUserProfile, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
