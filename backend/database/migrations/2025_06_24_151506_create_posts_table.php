<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema::create('posts', function (Blueprint $table) {
        //     $table->uuid('id')->primary();
        //     $table->text('content');
        //     $table->string('author_name');
        //     $table->string('author_username');
        //     $table->text('author_avatar')->nullable();
        //     $table->text('image_url')->nullable();
        //     $table->integer('likes_count')->default(0);
        //     $table->integer('comments_count')->default(0);
        //     $table->integer('retweets_count')->default(0);
        //     $table->timestampTz('created_at')->nullable();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::dropIfExists('posts');
    }
}
