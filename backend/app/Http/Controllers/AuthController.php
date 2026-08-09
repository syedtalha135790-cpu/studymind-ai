<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6'
        ]);

        $user = User::firstOrCreate(
            ['email' => $validated['email']],
            [
                'name' => $validated['name'],
                'password' => Hash::make($validated['password']),
            ]
        );

        return response()->json([
            'status' => 'success',
            'token' => 'sanctum-token-' . $user->id . '-' . time(),
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => 'Student',
                'plan' => 'Pro Plan',
                'university' => 'Stanford University',
                'major' => 'Computer Science',
                'studyStreak' => 12,
                'totalHours' => 48.5,
                'quizzesCompleted' => 34,
                'flashcardsLearned' => 185,
                'isAdmin' => true
            ]
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        return response()->json([
            'status' => 'success',
            'token' => 'sanctum-token-1-' . time(),
            'user' => [
                'id' => 1,
                'name' => 'Alex Johnson',
                'email' => $validated['email'],
                'role' => 'Student',
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                'plan' => 'Pro Plan',
                'university' => 'Stanford University',
                'major' => 'Computer Science & AI',
                'studyStreak' => 12,
                'totalHours' => 48.5,
                'quizzesCompleted' => 34,
                'flashcardsLearned' => 185,
                'tokensUsed' => 42800,
                'maxTokens' => 100000,
                'joinDate' => 'Jan 2026',
                'isAdmin' => true
            ]
        ]);
    }

    public function userProfile(): JsonResponse
    {
        return response()->json([
            'user' => [
                'id' => 1,
                'name' => 'Alex Johnson',
                'email' => 'alex.johnson@university.edu',
                'role' => 'Student',
                'plan' => 'Pro Plan',
                'university' => 'Stanford University',
                'major' => 'Computer Science & AI',
                'studyStreak' => 12,
                'totalHours' => 48.5
            ]
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully.'
        ]);
    }

    public function logout(): JsonResponse
    {
        return response()->json(['status' => 'success', 'message' => 'Logged out successfully.']);
    }
}
