<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->unsignedBigInteger('user_id')->default(1);
            $table->string('document_id')->nullable();
            $table->string('title');
            $table->string('subject')->default('Computer Science');
            $table->string('difficulty')->default('Medium');
            $table->integer('questions_count')->default(5);
            $table->integer('last_score')->default(0);
            $table->json('questions');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
