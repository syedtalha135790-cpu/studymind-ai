<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
        'document_id',
        'title',
        'subject',
        'difficulty',
        'questions_count',
        'last_score',
        'questions'
    ];

    protected $casts = [
        'questions' => 'array'
    ];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }
}
