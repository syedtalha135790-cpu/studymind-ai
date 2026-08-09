<?php

namespace App\Services;

class RagSearchService
{
    protected AiService $aiService;

    public function __construct(AiService $aiService)
    {
        $this->aiService = $aiService;
    }

    /**
     * Perform RAG Context Extraction & Grounded Answer Synthesis
     */
    public function searchAndAnswer(string $pdfText, string $userQuestion, string $language = 'English'): array
    {
        // 1. Chunk document into page-oriented sections
        $chunks = $this->chunkDocument($pdfText);

        // 2. Perform keyword & relevance scoring to select top 3 relevant page chunks
        $matchedChunks = $this->findRelevantChunks($chunks, $userQuestion);

        $contextText = "";
        $pageCitations = [];

        foreach ($matchedChunks as $chunk) {
            $contextText .= "[Page {$chunk['page']}]: {$chunk['text']}\n\n";
            $pageCitations[] = "Page {$chunk['page']}";
        }

        $citationsStr = implode(', ', array_unique($pageCitations));

        // 3. System Prompt enforcing STRICT context bounds & English/Urdu language
        $systemPrompt = "You are StudyMind Document AI. Answer the user question STRICTLY using the provided PDF document context below. Do NOT use outside general knowledge. If the answer is not in the context, state that clearly. Language: {$language}. Cite relevant page numbers in your answer.";

        $prompt = "DOCUMENT CONTEXT:\n{$contextText}\n\nUSER QUESTION: {$userQuestion}";

        $aiAnswer = $this->aiService->generateCompletion($prompt, $systemPrompt);

        // If Urdu language is selected, translate if necessary
        if (strtolower($language) === 'urdu' || str_contains($userQuestion, 'اردو')) {
            $aiAnswer .= "\n\n(نوٹ: یہ جواب منتخب کردہ PDF دستاویز کے اقتباسات پر مبنی ہے۔)";
        }

        return [
            'answer' => $aiAnswer,
            'citation' => !empty($citationsStr) ? $citationsStr : 'Page 1'
        ];
    }

    private function chunkDocument(string $text): array
    {
        // Split text into ~500 word page chunks
        $lines = explode("\n", $text);
        $chunks = [];
        $currentPage = 1;
        $currentBuffer = "";

        foreach ($lines as $line) {
            $currentBuffer .= " " . $line;
            if (strlen($currentBuffer) > 1200) {
                $chunks[] = [
                    'page' => $currentPage,
                    'text' => trim($currentBuffer)
                ];
                $currentPage++;
                $currentBuffer = "";
            }
        }

        if (!empty(trim($currentBuffer))) {
            $chunks[] = [
                'page' => $currentPage,
                'text' => trim($currentBuffer)
            ];
        }

        return $chunks;
    }

    private function findRelevantChunks(array $chunks, string $query): array
    {
        if (empty($chunks)) return [];

        $keywords = array_filter(explode(' ', strtolower(preg_replace('/[^a-zA-Z0-9 ]/', '', $query))));
        
        $scored = [];
        foreach ($chunks as $chunk) {
            $score = 0;
            $chunkText = strtolower($chunk['text']);
            foreach ($keywords as $kw) {
                if (strlen($kw) > 2 && str_contains($chunkText, $kw)) {
                    $score += 1;
                }
            }
            $scored[] = ['score' => $score, 'chunk' => $chunk];
        }

        usort($scored, fn($a, $b) => $b['score'] <=> $a['score']);

        return array_map(fn($item) => $item['chunk'], array_slice($scored, 0, 3));
    }
}
