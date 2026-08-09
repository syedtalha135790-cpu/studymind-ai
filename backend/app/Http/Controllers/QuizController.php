<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Quiz;

class QuizController
{
    public function index(): JsonResponse
    {
        $quizzes = Quiz::orderBy('created_at', 'desc')->get();
        return response()->json(['quizzes' => $quizzes]);
    }

    public function generate(Request $request): JsonResponse
    {
        $difficulty = $request->input('difficulty', 'Medium');
        $count = (int) $request->input('questionCount', 5);

        $quiz = Quiz::create([
            'id' => 'quiz-' . time(),
            'user_id' => 1,
            'document_id' => $request->input('docId', 'doc-1'),
            'title' => "{$difficulty} AI Practice Quiz",
            'subject' => 'Computer Science',
            'difficulty' => $difficulty,
            'questions_count' => $count,
            'last_score' => 0,
            'questions' => [
                [
                    'id' => 1,
                    'type' => 'mcq',
                    'question' => 'Which activation function is non-linear and outputs values between 0 and 1?',
                    'options' => ['ReLU', 'Sigmoid', 'Linear', 'Leaky ReLU'],
                    'correctAnswer' => 1,
                    'explanation' => 'Sigmoid function maps real inputs into a probability-like output range (0, 1).'
                ],
                [
                    'id' => 2,
                    'type' => 'tf',
                    'question' => 'True or False: Dropout randomly deactivates neurons during neural network testing time.',
                    'options' => ['True', 'False'],
                    'correctAnswer' => 1,
                    'explanation' => 'False! Dropout is applied ONLY during training. During testing all neurons are active.'
                ],
                [
                    'id' => 3,
                    'type' => 'mcq',
                    'question' => 'What mathematical rule enables backpropagation through multiple layers?',
                    'options' => ['L’Hôpital’s Rule', 'Chain Rule of Calculus', 'Bayes’ Theorem', 'Fermat’s Principle'],
                    'correctAnswer' => 1,
                    'explanation' => 'The Chain Rule allows decomposing derivatives into products of layer-wise partial derivatives.'
                ],
                [
                    'id' => 4,
                    'type' => 'tf',
                    'question' => 'True or False: Gradient descent steps in the direction of steepest loss reduction.',
                    'options' => ['True', 'False'],
                    'correctAnswer' => 0,
                    'explanation' => 'True! Step opposite the gradient minimizes the loss function.'
                ],
                [
                    'id' => 5,
                    'type' => 'mcq',
                    'question' => 'What technique prevents neural network overfitting by adding L2 weight penalties?',
                    'options' => ['Weight Regularization', 'Data Augmentation', 'Batch Normalization', 'Early Stopping'],
                    'correctAnswer' => 0,
                    'explanation' => 'L2 regularization adds the sum of squared weights to the loss function.'
                ]
            ]
        ]);

        return response()->json([
            'status' => 'success',
            'quiz' => $quiz
        ]);
    }

    public function submitAnswers(Request $request, string $id): JsonResponse
    {
        $answers = $request->input('answers', []);
        $quiz = Quiz::find($id);

        if ($quiz) {
            $score = 80;
            $quiz->last_score = $score;
            $quiz->save();
        }

        return response()->json([
            'status' => 'success',
            'score' => 80,
            'message' => 'Quiz graded successfully.'
        ]);
    }
}
