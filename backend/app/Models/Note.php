<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
        'document_id',
        'subject',
        'title',
        'summary',
        'bullet_points',
        'key_concepts',
        'formulas',
        'plain_language'
    ];

    protected $casts = [
        'bullet_points' => 'array',
        'key_concepts' => 'array',
        'formulas' => 'array'
    ];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }
}
