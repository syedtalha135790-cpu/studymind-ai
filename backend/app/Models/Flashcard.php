<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flashcard extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
        'document_id',
        'subject',
        'question',
        'answer',
        'category',
        'learned',
        'is_favorite'
    ];

    protected $casts = [
        'learned' => 'boolean',
        'is_favorite' => 'boolean'
    ];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }
}
