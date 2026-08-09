<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chat_sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->unsignedBigInteger('user_id')->default(1);
            $table->string('document_id');
            $table->json('messages');
            $table->timestamps();
        });

        Schema::create('study_plans', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->unsignedBigInteger('user_id')->default(1);
            $table->string('exam_title');
            $table->string('target_date');
            $table->string('subject');
            $table->string('skill_level')->default('Intermediate');
            $table->integer('daily_minutes')->default(90);
            $table->integer('progress_percent')->default(0);
            $table->json('milestones');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chat_sessions');
        Schema::dropIfExists('study_plans');
    }
};
