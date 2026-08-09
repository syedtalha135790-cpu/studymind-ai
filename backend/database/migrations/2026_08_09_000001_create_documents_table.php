<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->unsignedBigInteger('user_id')->default(1);
            $table->string('name');
            $table->string('file_path')->nullable();
            $table->string('file_size')->default('4.8 MB');
            $table->integer('page_count')->default(42);
            $table->string('category')->default('Computer Science');
            $table->longText('extracted_text')->nullable();
            $table->string('status')->default('Processed');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
