<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\StudyPlan;

class RoadmapController
{
    public function index(): JsonResponse
    {
        $roadmaps = StudyPlan::orderBy('created_at', 'desc')->get();
        return response()->json(['roadmaps' => $roadmaps]);
    }

    public function generate(Request $request): JsonResponse
    {
        $plan = StudyPlan::create([
            'id' => 'rm-' . time(),
            'user_id' => 1,
            'exam_title' => $request->input('examTitle', 'Final Exam Revision'),
            'target_date' => $request->input('examDate', '2026-09-25'),
            'subject' => $request->input('subject', 'Organic Chemistry'),
            'skill_level' => $request->input('skillLevel', 'Intermediate'),
            'daily_minutes' => (int) $request->input('dailyMinutes', 90),
            'progress_percent' => 15,
            'milestones' => [
                ['week' => 'Week 1', 'title' => 'Aromaticity & Electrophilic Substitution', 'status' => 'in-progress', 'date' => 'Aug 10 - Aug 16'],
                ['week' => 'Week 2', 'title' => 'Nucleophilic Aromatic & Organometallics', 'status' => 'upcoming', 'date' => 'Aug 17 - Aug 23'],
                ['week' => 'Week 3', 'title' => 'Aldehydes, Ketones & Carboxylic Acids', 'status' => 'upcoming', 'date' => 'Aug 24 - Aug 30'],
                ['week' => 'Week 4', 'title' => 'Synthesis Routes & Spectroscopic Analysis', 'status' => 'upcoming', 'date' => 'Sep 1 - Sep 10'],
                ['week' => 'Week 5', 'title' => 'Full Practice Exams & Revision Mock Tests', 'status' => 'upcoming', 'date' => 'Sep 11 - Sep 24']
            ]
        ]);

        return response()->json([
            'status' => 'success',
            'roadmap' => $plan
        ]);
    }
}
