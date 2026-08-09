<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Flashcard;

class FlashcardController
{
    public function index(): JsonResponse
    {
        $flashcards = Flashcard::orderBy('created_at', 'desc')->get();
        return response()->json(['flashcards' => $flashcards]);
    }

    public function store(Request $request): JsonResponse
    {
        $card = Flashcard::create([
            'id' => 'fc-' . time(),
            'user_id' => 1,
            'document_id' => $request->input('docId', 'doc-1'),
            'subject' => $request->input('subject', 'Computer Science'),
            'question' => $request->input('question'),
            'answer' => $request->input('answer'),
            'category' => $request->input('category', 'General'),
            'learned' => false,
            'is_favorite' => false
        ]);

        return response()->json([
            'status' => 'success',
            'flashcard' => $card
        ]);
    }

    public function toggleLearned(string $id): JsonResponse
    {
        $card = Flashcard::find($id);
        if ($card) {
            $card->learned = !$card->learned;
            $card->save();
        }
        return response()->json(['status' => 'success', 'card' => $card]);
    }

    public function toggleFavorite(string $id): JsonResponse
    {
        $card = Flashcard::find($id);
        if ($card) {
            $card->is_favorite = !$card->is_favorite;
            $card->save();
        }
        return response()->json(['status' => 'success', 'card' => $card]);
    }
}
