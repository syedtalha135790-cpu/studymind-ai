<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\FlashcardController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\PdfChatController;
use App\Http\Controllers\RoadmapController;
use App\Http\Controllers\HomeworkController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| StudyMind AI - Laravel 13 REST API Routes
|--------------------------------------------------------------------------
*/

// Auth Public Routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// User Profile
Route::get('/user', [AuthController::class, 'userProfile']);
Route::put('/user/profile', [AuthController::class, 'updateProfile']);
Route::post('/auth/logout', [AuthController::class, 'logout']);

// PDF Documents
Route::get('/documents', [PdfController::class, 'index']);
Route::post('/documents/upload', [PdfController::class, 'upload']);
Route::get('/documents/{id}', [PdfController::class, 'show']);
Route::delete('/documents/{id}', [PdfController::class, 'destroy']);

// AI Notes Generator
Route::get('/notes', [NoteController::class, 'index']);
Route::post('/notes/generate', [NoteController::class, 'generate']);
Route::get('/notes/export/{id}', [NoteController::class, 'exportPdf']);

// AI Flashcards
Route::get('/flashcards', [FlashcardController::class, 'index']);
Route::post('/flashcards', [FlashcardController::class, 'store']);
Route::put('/flashcards/{id}/learned', [FlashcardController::class, 'toggleLearned']);
Route::put('/flashcards/{id}/favorite', [FlashcardController::class, 'toggleFavorite']);

// AI Quiz Generator
Route::get('/quizzes', [QuizController::class, 'index']);
Route::post('/quizzes/generate', [QuizController::class, 'generate']);
Route::post('/quizzes/{id}/submit', [QuizController::class, 'submitAnswers']);

// Chat with PDF (RAG Search)
Route::get('/chat/{docId}', [PdfChatController::class, 'getMessages']);
Route::post('/chat/{docId}/ask', [PdfChatController::class, 'askQuestion']);

// Exam Preparation Roadmap
Route::get('/roadmap', [RoadmapController::class, 'index']);
Route::post('/roadmap/generate', [RoadmapController::class, 'generate']);

// Homework Solver
Route::post('/homework/solve', [HomeworkController::class, 'solve']);

// Progress Analytics
Route::get('/progress', [ProgressController::class, 'index']);

// Admin Console API
Route::get('/admin/stats', [AdminController::class, 'stats']);
Route::get('/admin/users', [AdminController::class, 'users']);
Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
Route::get('/admin/pdfs', [AdminController::class, 'pdfs']);
