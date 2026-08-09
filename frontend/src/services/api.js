// StudyMind AI - REST API Client Service

const API_BASE_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('studymind_token') || 'demo-sanctum-token-xyz';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  };
};

// Generic Fetch Wrapper with Error Handling & Fallback
async function apiRequest(endpoint, method = 'GET', data = null, isFormData = false) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = isFormData ? {
    'Authorization': `Bearer ${localStorage.getItem('studymind_token') || 'demo-sanctum-token-xyz'}`
  } : getAuthHeaders();

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = isFormData ? data : JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.warn(`API Request to ${endpoint} failed, utilizing local fallback engine:`, err.message);
    return null; // Return null so callers can seamlessly fall back to client AI engine
  }
}

// 1. Auth API
export const authApi = {
  login: (email, password) => apiRequest('/auth/login', 'POST', { email, password }),
  register: (userData) => apiRequest('/auth/register', 'POST', userData),
  logout: () => apiRequest('/auth/logout', 'POST'),
  getProfile: () => apiRequest('/user'),
  updateProfile: (profileData) => apiRequest('/user/profile', 'PUT', profileData)
};

// 2. PDF API
export const pdfApi = {
  uploadPdf: (formData) => apiRequest('/documents/upload', 'POST', formData, true),
  getPdfs: () => apiRequest('/documents'),
  getPdfById: (id) => apiRequest(`/documents/${id}`),
  deletePdf: (id) => apiRequest(`/documents/${id}`, 'DELETE'),
  downloadPdf: (id) => `${API_BASE_URL}/documents/${id}/download`
};

// 3. AI Notes API
export const notesApi = {
  getNotes: () => apiRequest('/notes'),
  generateNotes: (docId) => apiRequest('/notes/generate', 'POST', { docId }),
  updateNote: (id, noteData) => apiRequest(`/notes/${id}`, 'PUT', noteData),
  exportNotesPdf: (id) => apiRequest(`/notes/export/${id}`)
};

// 4. AI Flashcards API
export const flashcardsApi = {
  getFlashcards: () => apiRequest('/flashcards'),
  generateFlashcards: (docId) => apiRequest('/flashcards/generate', 'POST', { docId }),
  createFlashcard: (cardData) => apiRequest('/flashcards', 'POST', cardData),
  toggleLearned: (id) => apiRequest(`/flashcards/${id}/learned`, 'PUT'),
  toggleFavorite: (id) => apiRequest(`/flashcards/${id}/favorite`, 'PUT')
};

// 5. AI Quiz API
export const quizApi = {
  getQuizzes: () => apiRequest('/quizzes'),
  generateQuiz: (quizParams) => apiRequest('/quizzes/generate', 'POST', quizParams),
  submitAnswers: (quizId, answers) => apiRequest(`/quizzes/${quizId}/submit`, 'POST', { answers })
};

// 6. Chat with PDF API (RAG Search)
export const chatApi = {
  getChatMessages: (docId) => apiRequest(`/chat/${docId}`),
  askQuestion: (docId, question, language = 'English') => apiRequest(`/chat/${docId}/ask`, 'POST', { question, language })
};

// 7. Exam Roadmap API
export const roadmapApi = {
  getRoadmaps: () => apiRequest('/roadmap'),
  generateRoadmap: (params) => apiRequest('/roadmap/generate', 'POST', params),
  updateTaskStatus: (roadmapId, milestoneIndex, status) => apiRequest(`/roadmap/${roadmapId}/task`, 'PUT', { milestoneIndex, status })
};

// 8. Homework Solver API
export const homeworkApi = {
  solveQuestion: (category, question) => apiRequest('/homework/solve', 'POST', { category, question })
};

// 9. Progress Analytics API
export const progressApi = {
  getProgressStats: () => apiRequest('/progress')
};

// 10. Admin API
export const adminApi = {
  getStats: () => apiRequest('/admin/stats'),
  getUsers: () => apiRequest('/admin/users'),
  deleteUser: (id) => apiRequest(`/admin/users/${id}`, 'DELETE')
};
