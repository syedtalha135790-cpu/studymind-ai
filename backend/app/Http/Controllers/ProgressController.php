<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Document;
use App\Models\Quiz;
use App\Models\Flashcard;

class ProgressController
{
    public function index(): JsonResponse
    {
        $docsCount = Document::count();
        $quizzesCount = Quiz::count();
        $flashcardsLearned = Flashcard::where('learned', true)->count();

        return response()->json([
            'stats' => [
                'studyStreak' => 12,
                'totalHours' => 48.5,
                'documentsCount' => $docsCount,
                'quizzesCompleted' => $quizzesCount,
                'flashcardsLearned' => $flashcardsLearned,
                'avgQuizScore' => 92.4,
                'weakTopics' => [
                    ['topic' => 'Backpropagation Gradient Calculus', 'subject' => 'Computer Science', 'accuracy' => '45%'],
                    ['topic' => 'Electrophilic Aromatic Mechanisms', 'subject' => 'Chemistry', 'accuracy' => '52%']
                ]
            ]
        ]);
    }
}
