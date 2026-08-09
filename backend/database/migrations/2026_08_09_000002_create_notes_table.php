<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->unsignedBigInteger('user_id')->default(1);
            $table->string('document_id');
            $table->string('subject')->default('Computer Science');
            $table->string('title');
            $table->text('summary');
            $table->json('bullet_points');
            $table->json('key_concepts');
            $table->json('formulas');
            $table->text('plain_language');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
