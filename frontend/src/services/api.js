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
    const jsonRes = await response.json();
    return { data: jsonRes };
  } catch (err) {
    console.warn(`API Request to ${endpoint} failed, utilizing client fallback engine:`, err.message);
    return { data: null, error: err.message };
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
export const authAPI = authApi;

// 2. PDF API
export const pdfApi = {
  upload: (formData) => apiRequest('/documents/upload', 'POST', formData, true),
  getPdfs: () => apiRequest('/documents'),
  getPdfById: (id) => apiRequest(`/documents/${id}`),
  deletePdf: (id) => apiRequest(`/documents/${id}`, 'DELETE'),
  downloadPdf: (id) => `${API_BASE_URL}/documents/${id}/download`
};
export const pdfAPI = pdfApi;

// 3. AI Notes API
export const notesApi = {
  getNotes: () => apiRequest('/notes'),
  generate: (params) => apiRequest('/notes/generate', 'POST', params),
  updateNote: (id, noteData) => apiRequest(`/notes/${id}`, 'PUT', noteData),
  exportNotesPdf: (id) => apiRequest(`/notes/export/${id}`)
};
export const notesAPI = notesApi;

// 4. AI Flashcards API
export const flashcardsApi = {
  getFlashcards: () => apiRequest('/flashcards'),
  generate: (params) => apiRequest('/flashcards/generate', 'POST', params),
  store: (cardData) => apiRequest('/flashcards', 'POST', cardData),
  toggleLearned: (id) => apiRequest(`/flashcards/${id}/learned`, 'PUT'),
  toggleFavorite: (id) => apiRequest(`/flashcards/${id}/favorite`, 'PUT')
};
export const flashcardsAPI = flashcardsApi;

// 5. AI Quiz API
export const quizApi = {
  getQuizzes: () => apiRequest('/quizzes'),
  generate: (quizParams) => apiRequest('/quizzes/generate', 'POST', quizParams),
  submitAnswers: (quizId, answers) => apiRequest(`/quizzes/${quizId}/submit`, 'POST', { answers })
};
export const quizAPI = quizApi;

// 6. Chat with PDF API (RAG Search)
export const chatApi = {
  getChatMessages: (docId) => apiRequest(`/chat/${docId}`),
  askQuestion: (docId, payload) => apiRequest(`/chat/${docId}/ask`, 'POST', payload)
};
export const pdfChatAPI = chatApi;

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
