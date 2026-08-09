<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudyPlan extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
        'exam_title',
        'target_date',
        'subject',
        'skill_level',
        'daily_minutes',
        'progress_percent',
        'milestones'
    ];

    protected $casts = [
        'milestones' => 'array'
    ];
}
