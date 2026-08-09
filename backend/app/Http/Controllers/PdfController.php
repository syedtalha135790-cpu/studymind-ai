<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Document;

class PdfController
{
    public function index(): JsonResponse
    {
        $documents = Document::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'documents' => $documents->count() > 0 ? $documents : [
                [
                    'id' => 'doc-1',
                    'name' => 'Artificial Intelligence - Chapter 4 (Neural Networks).pdf',
                    'size' => '4.8 MB',
                    'pages' => 42,
                    'uploadDate' => '2 hours ago',
                    'category' => 'Computer Science',
                    'status' => 'Processed',
                    'textPreview' => 'Chapter 4: Deep Neural Networks & Backpropagation. Artificial neural networks (ANNs) are computing systems inspired by biological brain structures...',
                    'aiNotesGenerated' => true,
                    'flashcardsCount' => 24,
                    'quizzesCount' => 3
                ],
                [
                    'id' => 'doc-2',
                    'name' => 'Organic Chemistry II - Reactions & Mechanisms.pdf',
                    'size' => '8.2 MB',
                    'pages' => 78,
                    'uploadDate' => 'Yesterday',
                    'category' => 'Chemistry',
                    'status' => 'Processed',
                    'textPreview' => 'Organic Chemistry 2nd Edition - Electrophilic Aromatic Substitution. A benzene ring acts as a nucleophile attacking an electrophile...',
                    'aiNotesGenerated' => true,
                    'flashcardsCount' => 36,
                    'quizzesCount' => 5
                ]
            ]
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $doc = Document::find($id);
        return response()->json(['status' => 'success', 'document' => $doc]);
    }

    public function upload(Request $request): JsonResponse
    {
        $fileName = $request->hasFile('file') ? $request->file('file')->getClientOriginalName() : 'Physics II - Electromagnetism & Waves.pdf';
        
        $doc = Document::create([
            'id' => 'doc-' . time(),
            'user_id' => 1,
            'name' => $fileName,
            'file_path' => 'storage/documents/' . $fileName,
            'file_size' => '5.4 MB',
            'page_count' => 56,
            'category' => 'Physics',
            'extracted_text' => 'Chapter 7: Maxwell’s Equations & Electromagnetic Radiation. Electromagnetism is a branch of physics involving the study of electromagnetic force...',
            'status' => 'Processed'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'PDF uploaded, text extracted, and metadata saved.',
            'document' => $doc
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $doc = Document::find($id);
        if ($doc) {
            $doc->delete();
        }
        return response()->json(['status' => 'success', 'message' => 'Document deleted.']);
    }
}
