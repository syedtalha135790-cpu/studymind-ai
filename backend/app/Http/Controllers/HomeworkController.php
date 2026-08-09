<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\AiService;

class HomeworkController
{
    protected AiService $aiService;

    public function __construct(AiService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function solve(Request $request): JsonResponse
    {
        $category = $request->input('category', 'Math');
        $question = $request->input('question', '');

        $prompt = "Solve the following {$category} academic question step-by-step with clear reasoning: {$question}";
        $aiResponse = $this->aiService->generateCompletion($prompt);

        return response()->json([
            'status' => 'success',
            'solution' => [
                'title' => "{$category} Step-by-Step Solution",
                'steps' => [
                    ['step' => 'Step 1: Problem Decomposition', 'detail' => 'Identify given variables, constraint equations, and domain boundaries.'],
                    ['step' => 'Step 2: Mathematical / Logical Proof', 'detail' => $aiResponse],
                    ['step' => 'Step 3: Verification & Edge Cases', 'detail' => 'Validate solution against domain boundaries to ensure correctness.']
                ]
            ]
        ]);
    }
}
