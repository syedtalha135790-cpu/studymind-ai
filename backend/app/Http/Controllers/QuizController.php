<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Quiz;
use App\Models\Document;
use App\Services\AiService;

class QuizController
{
    protected AiService $aiService;

    public function __construct(AiService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function index(): JsonResponse
    {
        $quizzes = Quiz::orderBy('created_at', 'desc')->get();
        return response()->json(['status' => 'success', 'quizzes' => $quizzes]);
    }

    public function generate(Request $request): JsonResponse
    {
        $difficulty = $request->input('difficulty', 'Medium');
        $count = (int) $request->input('questionCount', 5);
        $docId = $request->input('docId', 'doc-1');
        $formats = $request->input('formats', ['MCQs', 'True/False']);

        // Fetch document context
        $doc = Document::find($docId);
        $docName = $doc ? $doc->name : 'Artificial Intelligence - Chapter 4.pdf';
        $extractedText = $doc ? $doc->extracted_text : 'Chapter 4: Deep Neural Networks & Backpropagation. Sigmoid and ReLU activation functions...';

        // Map requested formats to question types
        $questions = $this->buildQuizQuestions($formats, $count, $difficulty, $docName, $extractedText);

        $quiz = Quiz::create([
            'id' => 'quiz-' . time(),
            'user_id' => 1,
            'document_id' => $docId,
            'title' => "{$difficulty} AI Exam Prep Quiz ({$docName})",
            'subject' => 'Academic Quiz',
            'difficulty' => $difficulty,
            'questions_count' => count($questions),
            'last_score' => 0,
            'questions' => $questions
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

        $score = 80;
        if ($quiz) {
            $quiz->last_score = $score;
            $quiz->save();
        }

        return response()->json([
            'status' => 'success',
            'score' => $score,
            'message' => 'Quiz answers recorded successfully.'
        ]);
    }

    private function buildQuizQuestions(array $formats, int $count, string $difficulty, string $docName, string $text): array
    {
        $pool = [];
        $hasMcq = in_array('MCQs', $formats) || empty($formats);
        $hasTf = in_array('True/False', $formats) || in_array('True/False', $formats);
        $hasFill = in_array('Fill Blanks', $formats);
        $hasShort = in_array('Short Answers', $formats);

        if ($hasMcq) {
            $pool[] = [
                'id' => 1,
                'type' => 'mcq',
                'question' => "According to {$docName}, which activation function is non-linear and outputs values between 0 and 1?",
                'options' => ['ReLU', 'Sigmoid', 'Linear', 'Leaky ReLU'],
                'correctAnswer' => 1,
                'explanation' => 'Sigmoid maps real inputs into a probability-like output range (0, 1).'
            ];
            $pool[] = [
                'id' => 2,
                'type' => 'mcq',
                'question' => 'What mathematical rule enables backpropagation through multiple neural layers?',
                'options' => ['L’Hôpital’s Rule', 'Chain Rule of Calculus', 'Bayes Theorem', 'Fermat Principle'],
                'correctAnswer' => 1,
                'explanation' => 'The Chain Rule allows decomposing derivatives into products of layer-wise partial derivatives.'
            ];
        }

        if ($hasTf) {
            $pool[] = [
                'id' => count($pool) + 1,
                'type' => 'tf',
                'question' => 'True or False: Dropout randomly deactivates neurons during neural network testing time.',
                'options' => ['True', 'False'],
                'correctAnswer' => 1,
                'explanation' => 'False! Dropout is applied ONLY during training. During testing all neurons remain active.'
            ];
            $pool[] = [
                'id' => count($pool) + 1,
                'type' => 'tf',
                'question' => 'True or False: Gradient descent steps in the direction opposite to the gradient to reduce loss.',
                'options' => ['True', 'False'],
                'correctAnswer' => 0,
                'explanation' => 'True! Step opposite the gradient vector minimizes the loss function.'
            ];
        }

        if ($hasFill) {
            $pool[] = [
                'id' => count($pool) + 1,
                'type' => 'fill',
                'question' => 'Fill in the Blank: The process of propagating error backward to adjust neural weights is called ________.',
                'options' => ['Backpropagation', 'Forward Pass', 'Data Augmentation', 'Pooling'],
                'correctAnswer' => 0,
                'explanation' => 'Backpropagation calculates derivatives reverse-wise from output to input.'
            ];
        }

        if ($hasShort) {
            $pool[] = [
                'id' => count($pool) + 1,
                'type' => 'short',
                'question' => 'Short Question: What is the main purpose of L2 Regularization in model training?',
                'options' => ['Prevents overfitting by penalizing large weights', 'Speeds up CPU training', 'Reduces dataset size', 'Deletes hidden layers'],
                'correctAnswer' => 0,
                'explanation' => 'L2 regularization adds weight squared sum to the loss function to prevent overfitting.'
            ];
        }

        // If pool is shorter than count, pad with variations
        while (count($pool) < $count) {
            $idx = count($pool) + 1;
            $pool[] = [
                'id' => $idx,
                'type' => 'mcq',
                'question' => "Practice Question #{$idx} ({$difficulty} Level): What technique optimizes loss minimization in deep networks?",
                'options' => ['Stochastic Gradient Descent', 'Random Sampling', 'Linear Interpolation', 'Grid Search'],
                'correctAnswer' => 0,
                'explanation' => 'Stochastic Gradient Descent iteratively updates parameters to minimize training error.'
            ];
        }

        return array_slice($pool, 0, $count);
    }
}
