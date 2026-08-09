<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\Document;

class AdminController
{
    public function stats(): JsonResponse
    {
        return response()->json([
            'totalUsers' => 12480,
            'storageUsed' => '1.84 TB',
            'tokensConsumed' => '14.8M',
            'monthlyArr' => '$84,200'
        ]);
    }

    public function users(): JsonResponse
    {
        $users = [
            ['id' => 1, 'name' => 'Alex Johnson', 'email' => 'alex.johnson@stanford.edu', 'plan' => 'Pro Student', 'status' => 'Active', 'tokens' => '42,800', 'university' => 'Stanford'],
            ['id' => 2, 'name' => 'Elena Rostova', 'email' => 'elena@mit.edu', 'plan' => 'Pro Student', 'status' => 'Active', 'tokens' => '89,100', 'university' => 'MIT'],
            ['id' => 3, 'name' => 'Marcus Chen', 'email' => 'marcus@berkeley.edu', 'plan' => 'Free Student', 'status' => 'Active', 'tokens' => '4,200', 'university' => 'UC Berkeley']
        ];
        return response()->json(['users' => $users]);
    }

    public function deleteUser(int $id): JsonResponse
    {
        return response()->json(['status' => 'success', 'message' => "User {$id} deleted."]);
    }

    public function pdfs(): JsonResponse
    {
        $pdfs = Document::orderBy('created_at', 'desc')->get();
        return response()->json(['pdfs' => $pdfs]);
    }
}
