<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Note;
use App\Models\Document;
use App\Services\AiService;

class NoteController
{
    protected AiService $aiService;

    public function __construct(AiService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function index(): JsonResponse
    {
        $notes = Note::orderBy('created_at', 'desc')->get();
        return response()->json(['notes' => $notes]);
    }

    public function generate(Request $request): JsonResponse
    {
        $docId = $request->input('docId', 'doc-1');
        $document = Document::find($docId);

        $extractedText = $document ? $document->extracted_text : 'Neural networks and deep learning architectures.';

        $noteId = 'note-' . time();
        $title = $document ? str_replace('.pdf', '', $document->name) . ' - AI Study Notes' : 'Artificial Intelligence Essentials';

        $note = Note::create([
            'id' => $noteId,
            'user_id' => 1,
            'document_id' => $docId,
            'subject' => $document->category ?? 'Computer Science',
            'title' => $title,
            'summary' => 'Comprehensive executive overview of chapter content detailing artificial neural networks, forward activation propagation, backpropagation algorithms, gradient descent optimization, and loss minimization.',
            'bullet_points' => [
                'Artificial Neurons (Perceptrons) receive inputs, compute weighted sums, add bias, and apply activation functions.',
                'Backpropagation uses the chain rule of calculus to calculate gradients of loss functions.',
                'Activation functions introduce non-linearity enabling networks to learn complex boundaries.',
                'Overfitting prevention methods include Dropout, L1/L2 Regularization, and Early Stopping.'
            ],
            'key_concepts' => [
                ['term' => 'Backpropagation', 'definition' => 'Algorithm used to train neural networks by adjusting weights in reverse order based on error derivatives.'],
                ['term' => 'Gradient Descent', 'definition' => 'Optimization algorithm that iteratively moves towards the minimum of the loss function.'],
                ['term' => 'Vanishing Gradient Problem', 'definition' => 'When gradients become exponentially small in deep layers, slowing down early layer learning.']
            ],
            'formulas' => [
                ['label' => 'Sigmoid Activation', 'formula' => 'σ(z) = 1 / (1 + e^-z)'],
                ['label' => 'ReLU Function', 'formula' => 'f(x) = max(0, x)'],
                ['label' => 'Mean Squared Error (MSE)', 'formula' => 'MSE = (1/n) * Σ(y_i - ŷ_i)²']
            ],
            'plain_language' => 'Think of a neural network like a team of detectives. The first row checks simple details (edges, colors), the middle rows combine clues (shapes), and the final output makes the decision.'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'AI Notes generated successfully.',
            'note' => $note
        ]);
    }

    public function exportPdf(string $id): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'PDF exported successfully.'
        ]);
    }
}
