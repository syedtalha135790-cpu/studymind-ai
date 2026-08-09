import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  pdfApi, 
  notesApi, 
  flashcardsApi, 
  quizApi, 
  chatApi, 
  roadmapApi, 
  progressApi 
} from '../services/api';

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  // Documents state
  const [documents, setDocuments] = useState([
    {
      id: 'doc-1',
      name: 'Artificial Intelligence - Chapter 4 (Neural Networks).pdf',
      size: '4.8 MB',
      pages: 42,
      uploadDate: '2 hours ago',
      category: 'Computer Science',
      status: 'Processed',
      textPreview: `Chapter 4: Deep Neural Networks & Backpropagation. Artificial neural networks (ANNs) are computing systems inspired by biological brain structures. ANNs consist of connected nodes called artificial neurons...`,
      aiNotesGenerated: true,
      flashcardsCount: 24,
      quizzesCount: 3
    },
    {
      id: 'doc-2',
      name: 'Organic Chemistry II - Reactions & Mechanisms.pdf',
      size: '8.2 MB',
      pages: 78,
      uploadDate: 'Yesterday',
      category: 'Chemistry',
      status: 'Processed',
      textPreview: `Organic Chemistry 2nd Edition - Electrophilic Aromatic Substitution. A benzene ring acts as a nucleophile attacking an electrophile to form an arenium ion intermediate...`,
      aiNotesGenerated: true,
      flashcardsCount: 36,
      quizzesCount: 5
    }
  ]);

  // Notes state
  const [notes, setNotes] = useState([
    {
      id: 'note-1',
      docId: 'doc-1',
      docName: 'Artificial Intelligence - Chapter 4 (Neural Networks)',
      subject: 'Computer Science',
      title: 'Neural Networks & Deep Learning Essentials',
      date: 'Aug 8, 2026',
      summary: 'Comprehensive overview of artificial neural network architecture, forward propagation, activation functions (ReLU, Softmax, Sigmoid), gradient descent, and loss minimization techniques.',
      bulletPoints: [
        'Artificial Neurons (Perceptrons) receive inputs, compute weighted sums, add bias, and apply activation functions.',
        'Backpropagation uses the chain rule of calculus to calculate gradients of loss function relative to each weight.',
        'Activation Functions introduce non-linearity enabling networks to learn complex decision boundaries.',
        'Overfitting prevention methods include Dropout, L1/L2 Regularization, and Early Stopping.'
      ],
      keyConcepts: [
        { term: 'Backpropagation', definition: 'Algorithm used to train neural networks by adjusting weights in reverse order based on error derivatives.' },
        { term: 'Gradient Descent', definition: 'Optimization algorithm that iteratively moves towards the minimum of the loss function.' },
        { term: 'Vanishing Gradient Problem', definition: 'When gradients become exponentially small in deep layers, slowing down or stopping early layer learning.' }
      ],
      formulas: [
        { label: 'Sigmoid Activation', formula: 'σ(z) = 1 / (1 + e^-z)' },
        { label: 'ReLU Function', formula: 'f(x) = max(0, x)' },
        { label: 'Mean Squared Error (MSE)', formula: 'MSE = (1/n) * Σ(y_i - ŷ_i)²' }
      ],
      plainLanguage: 'Think of a neural network like a team of detectives. The first row checks simple details (edges, colors), the middle rows combine clues (shapes), and the final output makes the final decision.'
    }
  ]);

  // Flashcards state
  const [flashcards, setFlashcards] = useState([
    {
      id: 'fc-1',
      docId: 'doc-1',
      subject: 'Computer Science',
      question: 'What is the main role of Backpropagation in neural network training?',
      answer: 'It calculates the gradient of the loss function with respect to each weight using the chain rule, allowing optimizer algorithms to update weights efficiently.',
      category: 'Deep Learning',
      learned: false,
      isFavorite: true
    },
    {
      id: 'fc-2',
      docId: 'doc-1',
      subject: 'Computer Science',
      question: 'Why is ReLU preferred over Sigmoid in hidden layers of deep networks?',
      answer: 'ReLU mitigates the vanishing gradient problem for positive inputs and allows faster derivative calculation (max(0,x)), leading to faster convergence during training.',
      category: 'Activation Functions',
      learned: true,
      isFavorite: false
    }
  ]);

  // Quizzes state
  const [quizzes, setQuizzes] = useState([
    {
      id: 'quiz-1',
      title: 'Neural Networks & Deep Learning Mastery Quiz',
      subject: 'Computer Science',
      docName: 'Artificial Intelligence - Chapter 4',
      difficulty: 'Medium',
      questionsCount: 5,
      lastScore: 80,
      completedDate: 'Aug 7, 2026',
      questions: [
        {
          id: 1,
          type: 'mcq',
          question: 'Which activation function is non-linear and outputs values between 0 and 1?',
          options: ['ReLU', 'Sigmoid', 'Linear', 'Leaky ReLU'],
          correctAnswer: 1,
          explanation: 'Sigmoid function σ(z) = 1 / (1 + e^-z) maps real inputs into a probability-like output range between 0 and 1.'
        },
        {
          id: 2,
          type: 'tf',
          question: 'True or False: Dropout randomly deactivates neurons during testing time.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False! Dropout is applied ONLY during training to prevent co-adaptation. During testing/inference, all neurons are active.'
        }
      ]
    }
  ]);

  // Chat sessions state
  const [pdfChats, setPdfChats] = useState([]);
  
  // Roadmaps state
  const [roadmaps, setRoadmaps] = useState([
    {
      id: 'rm-1',
      examTitle: 'Final Exam - Deep Learning & Computer Vision',
      targetDate: '2026-09-15',
      subject: 'Computer Science',
      skillLevel: 'Intermediate',
      dailyGoalMinutes: 90,
      progressPercent: 45,
      milestones: [
        { week: 'Week 1', title: 'Perceptrons & Multi-Layer Neural Nets', status: 'completed', date: 'Aug 1 - Aug 7' },
        { week: 'Week 2', title: 'Backpropagation & Optimization Algorithms', status: 'in-progress', date: 'Aug 8 - Aug 14' }
      ]
    }
  ]);

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync state with Live REST APIs on mount
  useEffect(() => {
    async function loadApiData() {
      const docsRes = await pdfApi.getPdfs();
      if (docsRes?.documents) setDocuments(docsRes.documents);

      const notesRes = await notesApi.getNotes();
      if (notesRes?.notes && notesRes.notes.length > 0) setNotes(notesRes.notes);

      const cardsRes = await flashcardsApi.getFlashcards();
      if (cardsRes?.flashcards && cardsRes.flashcards.length > 0) setFlashcards(cardsRes.flashcards);

      const quizRes = await quizApi.getQuizzes();
      if (quizRes?.quizzes && quizRes.quizzes.length > 0) setQuizzes(quizRes.quizzes);

      const rmRes = await roadmapApi.getRoadmaps();
      if (rmRes?.roadmaps && rmRes.roadmaps.length > 0) setRoadmaps(rmRes.roadmaps);
    }
    loadApiData();
  }, []);

  // Handlers connected to REST API
  const addDocument = async (newDoc) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  const addNote = async (newNote) => {
    setNotes(prev => [newNote, ...prev]);
  };

  const addFlashcard = async (newFc) => {
    setFlashcards(prev => [newFc, ...prev]);
    await flashcardsApi.createFlashcard(newFc);
  };

  const toggleFlashcardLearned = async (id) => {
    setFlashcards(prev => prev.map(fc => fc.id === id ? { ...fc, learned: !fc.learned } : fc));
    await flashcardsApi.toggleLearned(id);
  };

  const toggleFlashcardFavorite = async (id) => {
    setFlashcards(prev => prev.map(fc => fc.id === id ? { ...fc, isFavorite: !fc.isFavorite } : fc));
    await flashcardsApi.toggleFavorite(id);
  };

  const addQuiz = async (newQuiz) => {
    setQuizzes(prev => [newQuiz, ...prev]);
  };

  return (
    <StudyContext.Provider value={{
      documents, setDocuments, addDocument,
      notes, setNotes, addNote,
      flashcards, setFlashcards, addFlashcard, toggleFlashcardLearned, toggleFlashcardFavorite,
      quizzes, setQuizzes, addQuiz,
      pdfChats, setPdfChats,
      roadmaps, setRoadmaps,
      isSearchOpen, setIsSearchOpen
    }}>
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => useContext(StudyContext);
