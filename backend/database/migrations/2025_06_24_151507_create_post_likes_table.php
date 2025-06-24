<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostLikesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema::create('post_likes', function (Blueprint $table) {
        //     $table->uuid('id')->primary();
        //     $table->uuid('post_id');
        //     $table->string('user_id');
        //     $table->timestampTz('created_at')->nullable();

        //     $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::dropIfExists('post_likes');
    }
}
