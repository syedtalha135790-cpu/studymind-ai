<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\ChatSession;
use App\Models\Document;
use App\Services\RagSearchService;

class PdfChatController
{
    protected RagSearchService $ragService;

    public function __construct(RagSearchService $ragService)
    {
        $this->ragService = $ragService;
    }

    public function getMessages(string $docId): JsonResponse
    {
        $session = ChatSession::where('document_id', $docId)->first();
        return response()->json([
            'messages' => $session ? $session->messages : [
                [
                    'id' => 'm-1',
                    'sender' => 'ai',
                    'text' => 'Hello! Ask me any question about your PDF. Answers strictly use page citations.',
                    'timestamp' => '10:00 AM'
                ]
            ]
        ]);
    }

    public function askQuestion(Request $request, string $docId): JsonResponse
    {
        $question = $request->input('question', '');
        $language = $request->input('language', 'English');

        $document = Document::find($docId);
        $pdfText = $document ? $document->extracted_text : 'Neural networks, activation functions, and gradient descent optimization.';

        $ragResult = $this->ragService->searchAndAnswer($pdfText, $question, $language);

        $session = ChatSession::firstOrCreate(
            ['document_id' => $docId, 'user_id' => 1],
            ['id' => 'chat-' . time(), 'messages' => []]
        );

        $messages = $session->messages ?? [];
        $messages[] = [
            'id' => 'm-' . time(),
            'sender' => 'user',
            'text' => $question,
            'timestamp' => date('H:i A')
        ];
        $messages[] = [
            'id' => 'm-ai-' . time(),
            'sender' => 'ai',
            'text' => $ragResult['answer'],
            'citation' => $ragResult['citation'],
            'timestamp' => date('H:i A')
        ];

        $session->messages = $messages;
        $session->save();

        return response()->json([
            'status' => 'success',
            'response' => end($messages)
        ]);
    }
}
