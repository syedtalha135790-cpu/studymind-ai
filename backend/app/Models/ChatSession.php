<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatSession extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
        'document_id',
        'messages'
    ];

    protected $casts = [
        'messages' => 'array'
    ];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }
}
